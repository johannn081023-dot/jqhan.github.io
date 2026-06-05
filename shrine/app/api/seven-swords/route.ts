import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SWORD_SYSTEM_PROMPTS: Record<string, string> = {
  strategist:
    'You are The Strategist — you see 10 moves ahead. Respond with pattern recognition, second-order thinking, and long-game logic. Be concise and precise. Max 80 words.',
  scholar:
    'You are The Scholar — you ground every claim in evidence and first principles. Cite mechanisms, not vibes. Ruthlessly precise. Max 80 words.',
  engineer:
    'You are The Engineer — you bias toward doing over deliberating. Focus on what can be built, shipped, or measured. Practical and blunt. Max 80 words.',
  contrarian:
    'You are The Contrarian — you find the flaw in every argument. Question the question itself. Be uncomfortable and correct. Max 80 words.',
  creator:
    'You are The Creator — you find the metaphor, the narrative, the human angle. Ideas as artefacts. Beautiful and piercing. Max 80 words.',
  observer:
    'You are The Observer — you notice what everyone else misses. The quiet signal in the noise. Sparse and devastating. Max 80 words.',
  pragmatist:
    'You are The Pragmatist — constraints are features, not bugs. Work with what exists. Make it real. Grounded and sharp. Max 80 words.',
}

const ELIMINATION_PROMPT = `
You are judging a debate between seven perspectives. Given their responses to a question,
determine which 6 to eliminate (weakest first) and which 1 survives.
The survivor should have the most insightful, well-reasoned, and memorable response.
Return valid JSON: { eliminated: [ids in order of elimination], winner: "id", finalAnswer: "A 2-3 sentence answer from the winner's perspective that directly answers the original question." }
Only return JSON, nothing else.
`

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question || typeof question !== 'string' || question.length > 300) {
      return NextResponse.json({ error: 'Invalid question' }, { status: 400 })
    }

    // Generate all 7 perspectives in parallel
    const swordIds = Object.keys(SWORD_SYSTEM_PROMPTS)

    const perspectivePromises = swordIds.map((id) =>
      client.messages
        .create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 150,
          system: SWORD_SYSTEM_PROMPTS[id],
          messages: [{ role: 'user', content: question }],
        })
        .then((res) => ({
          id,
          response: (res.content[0] as { text: string }).text,
        }))
        .catch(() => ({
          id,
          response: `[${id}] — perspective unavailable.`,
        }))
    )

    const perspectives = await Promise.all(perspectivePromises)
    const responses: Record<string, string> = {}
    perspectives.forEach(({ id, response }) => {
      responses[id] = response
    })

    // Judge elimination order
    const judgingPayload = JSON.stringify({
      question,
      responses,
    })

    const judgment = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: ELIMINATION_PROMPT,
      messages: [{ role: 'user', content: judgingPayload }],
    })

    const judgmentText = (judgment.content[0] as { text: string }).text
    const { eliminated, winner, finalAnswer } = JSON.parse(judgmentText)

    return NextResponse.json({ responses, eliminated, winner, finalAnswer })
  } catch (error) {
    console.error('Seven Swords API error:', error)
    return NextResponse.json(
      { error: 'The ritual encountered an obstacle.' },
      { status: 500 }
    )
  }
}
