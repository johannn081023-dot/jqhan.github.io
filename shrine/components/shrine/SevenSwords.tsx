'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'
import { KatanaEnter } from '@/components/transitions/PageTransition'
import type { Sword, SwordPersona } from '@/lib/types/shrine'

// ─── SWORD PERSONAS ───────────────────────────────────────────────────────────
const SWORDS: Sword[] = [
  {
    id: 'strategist',
    name: 'The Strategist',
    title: 'Reads the board 10 moves ahead',
    titleJP: '戦略家',
    description: 'Sees patterns, maps consequences, never loses sight of the end goal.',
    color: '#8CA4FF',
    glowColor: 'rgba(140,164,255,0.5)',
    icon: '♟',
    eliminated: false,
  },
  {
    id: 'scholar',
    name: 'The Scholar',
    title: 'Knows what the books don\'t say',
    titleJP: '学者',
    description: 'Grounds every claim in evidence. First principles, ruthless precision.',
    color: '#7FD6B2',
    glowColor: 'rgba(127,214,178,0.5)',
    icon: '📜',
    eliminated: false,
  },
  {
    id: 'engineer',
    name: 'The Engineer',
    title: 'Ships, then theorizes',
    titleJP: '技術者',
    description: 'Asks "how" before "why." Bias toward doing, not deliberating.',
    color: '#F5F7FA',
    glowColor: 'rgba(245,247,250,0.4)',
    icon: '⚙',
    eliminated: false,
  },
  {
    id: 'contrarian',
    name: 'The Contrarian',
    title: 'Comfortable being wrong about being wrong',
    titleJP: '反論者',
    description: 'Questions every assumption. Finds the flaw in the flawless.',
    color: '#B33A3A',
    glowColor: 'rgba(179,58,58,0.5)',
    icon: '⚡',
    eliminated: false,
  },
  {
    id: 'creator',
    name: 'The Creator',
    title: 'Builds worlds from nothing',
    titleJP: '創造者',
    description: 'Finds beauty in the unsaid. Ideas as artefacts, not just arguments.',
    color: '#FFB7C5',
    glowColor: 'rgba(255,183,197,0.5)',
    icon: '✦',
    eliminated: false,
  },
  {
    id: 'observer',
    name: 'The Observer',
    title: 'Sees what everyone else misses',
    titleJP: '観察者',
    description: 'Silent, precise, unsparing. Watches the room while others talk.',
    color: '#D4A84F',
    glowColor: 'rgba(212,168,79,0.5)',
    icon: '👁',
    eliminated: false,
  },
  {
    id: 'pragmatist',
    name: 'The Pragmatist',
    title: 'Makes the most of what exists',
    titleJP: '現実主義者',
    description: 'Constraints are features. Works with reality, not against it.',
    color: '#F6B94A',
    glowColor: 'rgba(246,185,74,0.5)',
    icon: '⚖',
    eliminated: false,
  },
]

type RitualState =
  | 'idle'
  | 'summoning'
  | 'generating'
  | 'debating'
  | 'eliminating'
  | 'complete'

export function SevenSwords() {
  const { unlockAchievement, markPageVisited } = useShrineStore()

  const [question, setQuestion] = useState('')
  const [ritual, setRitual] = useState<RitualState>('idle')
  const [swords, setSwords] = useState<Sword[]>(SWORDS.map((s) => ({ ...s })))
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [eliminated, setEliminated] = useState<string[]>([])
  const [winner, setWinner] = useState<Sword | null>(null)
  const [finalAnswer, setFinalAnswer] = useState('')
  const [activeRound, setActiveRound] = useState(0)
  const [summoned, setSummoned] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { markPageVisited('seven-swords') }, [markPageVisited])

  const startRitual = useCallback(async () => {
    if (!question.trim() || ritual !== 'idle') return

    setRitual('summoning')
    setSwords(SWORDS.map((s) => ({ ...s, eliminated: false })))
    setResponses({})
    setEliminated([])
    setWinner(null)
    setFinalAnswer('')

    // Summoning delay
    await delay(800)
    setSummoned(true)
    setRitual('generating')
    await delay(600)

    // Call API
    try {
      const response = await fetch('/api/seven-swords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()

      // Set responses for all swords
      setResponses(data.responses)
      setRitual('debating')

      // Elimination rounds — stagger them
      for (let round = 0; round < data.eliminated.length; round++) {
        setActiveRound(round + 1)
        await delay(1200)
        setEliminated((prev) => [...prev, data.eliminated[round]])
        setSwords((prev) =>
          prev.map((s) =>
            s.id === data.eliminated[round]
              ? { ...s, eliminated: true, eliminationRound: round + 1 }
              : s
          )
        )
      }

      setRitual('eliminating')
      await delay(1200)

      // Reveal winner
      const winnerSword = swords.find((s) => s.id === data.winner)!
      setWinner(winnerSword)
      setFinalAnswer(data.finalAnswer)
      setRitual('complete')
      unlockAchievement('seventh-sword')
    } catch (err) {
      // Fallback simulation if API fails
      await simulateDebate()
    }
  }, [question, ritual, swords, unlockAchievement])

  // Simulation fallback
  const simulateDebate = useCallback(async () => {
    const allIds = SWORDS.map((s) => s.id)
    const shuffled = [...allIds].sort(() => Math.random() - 0.5)
    const toEliminate = shuffled.slice(0, 6)
    const winId = shuffled[6]

    const mockResponses: Record<string, string> = {}
    SWORDS.forEach((sword) => {
      mockResponses[sword.id] = `[${sword.name}] Considering "${question}" from the perspective of ${sword.description}`
    })
    setResponses(mockResponses)
    setRitual('debating')

    for (let i = 0; i < toEliminate.length; i++) {
      setActiveRound(i + 1)
      await delay(1000)
      setEliminated((prev) => [...prev, toEliminate[i]])
      setSwords((prev) =>
        prev.map((s) =>
          s.id === toEliminate[i] ? { ...s, eliminated: true, eliminationRound: i + 1 } : s
        )
      )
    }

    setRitual('eliminating')
    await delay(1200)
    const winnerSword = SWORDS.find((s) => s.id === winId)!
    setWinner(winnerSword)
    setFinalAnswer(
      `The ${winnerSword.name} stands alone. "${question}" — the answer that survived the debate is this: truth doesn't need consensus, it needs to outlast every challenge.`
    )
    setRitual('complete')
    unlockAchievement('seventh-sword')
  }, [question, unlockAchievement])

  const resetRitual = () => {
    setRitual('idle')
    setQuestion('')
    setSummoned(false)
    setSwords(SWORDS.map((s) => ({ ...s })))
    setResponses({})
    setEliminated([])
    setWinner(null)
    setFinalAnswer('')
    setActiveRound(0)
  }

  return (
    <KatanaEnter>
      <div className="min-h-screen bg-shrine-abyss pt-24 pb-16 px-6 relative overflow-hidden">

        {/* Background atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(140,164,255,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="shrine-container max-w-5xl">

          {/* Page header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: '#D4A84F', fontFamily: 'var(--font-japanese)' }}
            >
              七本の刀
            </p>
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                background: 'linear-gradient(135deg, #F5F7FA 0%, #D7DBE0 50%, #8CA4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Seven Swords
            </h1>
            <div className="line-gold w-32 mx-auto mb-6" />
            <p className="text-silver-dim max-w-lg mx-auto text-sm leading-relaxed">
              Ask a question. Seven perspectives emerge. They debate, they clash.
              Only the strongest answer survives the ritual.
            </p>
          </motion.div>

          {/* Question input */}
          <AnimatePresence>
            {ritual === 'idle' && (
              <motion.div
                className="max-w-2xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="relative rounded-sm overflow-hidden"
                  style={{ border: '1px solid rgba(212,168,79,0.2)' }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startRitual()}
                    placeholder="Ask the shrine anything…"
                    maxLength={200}
                    className="w-full bg-transparent px-6 py-5 text-silver-bright placeholder:text-silver-dim/40 outline-none text-base"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  />
                  <button
                    onClick={startRitual}
                    disabled={!question.trim()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-2 rounded-sm transition-all duration-300 disabled:opacity-30"
                    style={{
                      border: '1px solid rgba(212,168,79,0.4)',
                      background: 'rgba(18,10,36,0.8)',
                      color: '#D4A84F',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                    }}
                    data-hoverable
                  >
                    SUMMON ⚔
                  </button>
                </div>

                {/* Example questions */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {EXAMPLE_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuestion(q)}
                      className="text-2xs px-3 py-1.5 rounded-full transition-colors duration-200"
                      style={{
                        border: '1px solid rgba(140,164,255,0.15)',
                        color: '#8CA4FF',
                        background: 'rgba(140,164,255,0.05)',
                      }}
                      data-hoverable
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swords arena */}
          <AnimatePresence>
            {summoned && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Active question display */}
                <div className="text-center mb-12">
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: '#8A8E94' }}
                  >
                    The Question
                  </p>
                  <p
                    className="text-xl md:text-2xl"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      color: '#D7DBE0',
                    }}
                  >
                    "{question}"
                  </p>
                </div>

                {/* Sword cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
                  {swords.map((sword, i) => (
                    <SwordCard
                      key={sword.id}
                      sword={sword}
                      response={responses[sword.id]}
                      ritual={ritual}
                      delay={i * 0.08}
                      isWinner={winner?.id === sword.id && ritual === 'complete'}
                    />
                  ))}
                </div>

                {/* Ritual status */}
                <div className="text-center mb-8">
                  <RitualStatus ritual={ritual} activeRound={activeRound} eliminatedCount={eliminated.length} />
                </div>

                {/* Final answer */}
                <AnimatePresence>
                  {ritual === 'complete' && winner && (
                    <FinalVerdict
                      winner={winner}
                      finalAnswer={finalAnswer}
                      onReset={resetRitual}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </KatanaEnter>
  )
}

// ─── SWORD CARD ───────────────────────────────────────────────────────────────
interface SwordCardProps {
  sword: Sword
  response?: string
  ritual: RitualState
  delay: number
  isWinner: boolean
}

function SwordCard({ sword, response, ritual, delay, isWinner }: SwordCardProps) {
  return (
    <motion.div
      className={`relative p-5 rounded-sm overflow-hidden transition-all duration-700 ${
        sword.eliminated ? 'opacity-40' : 'opacity-100'
      }`}
      style={{
        border: isWinner
          ? `1px solid ${sword.color}`
          : sword.eliminated
          ? '1px solid rgba(255,255,255,0.04)'
          : '1px solid rgba(255,255,255,0.08)',
        background: sword.eliminated
          ? 'rgba(5,3,10,0.6)'
          : isWinner
          ? `rgba(5,3,10,0.8)`
          : 'rgba(18,10,36,0.5)',
        boxShadow: isWinner ? `0 0 40px ${sword.glowColor}, 0 0 80px ${sword.glowColor.replace('0.5', '0.15')}` : 'none',
        transform: sword.eliminated ? 'rotate(3deg) translateY(8px)' : 'none',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: sword.eliminated ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Eliminated indicator — sword planted in ground */}
      {sword.eliminated && (
        <motion.div
          className="absolute top-2 right-2 text-crimson text-xs"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
        >
          ✕
        </motion.div>
      )}

      {/* Winner glow */}
      {isWinner && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${sword.glowColor.replace('0.5', '0.12')} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Icon + Name */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl mt-0.5">{sword.icon}</span>
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: sword.eliminated ? '#4A3F5C' : sword.color }}
          >
            {sword.name}
          </p>
          <p
            className="text-2xs"
            style={{ color: '#4A3F5C', fontFamily: 'var(--font-japanese)' }}
          >
            {sword.titleJP}
          </p>
        </div>
      </div>

      {/* Response or loading */}
      <div className="min-h-[60px]">
        {response ? (
          <p className="text-xs leading-relaxed text-silver-dim line-clamp-4">
            {response}
          </p>
        ) : ritual === 'generating' ? (
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: sword.color }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-silver-dim/40 italic">{sword.description}</p>
        )}
      </div>

      {/* Elimination round badge */}
      {sword.eliminated && sword.eliminationRound && (
        <p className="text-2xs mt-2" style={{ color: '#4A3F5C' }}>
          Eliminated — Round {sword.eliminationRound}
        </p>
      )}
    </motion.div>
  )
}

// ─── RITUAL STATUS ────────────────────────────────────────────────────────────
function RitualStatus({ ritual, activeRound, eliminatedCount }: {
  ritual: RitualState
  activeRound: number
  eliminatedCount: number
}) {
  const messages: Record<RitualState, string> = {
    idle: '',
    summoning: '⚔ The swords are being summoned...',
    generating: '✦ Perspectives converging...',
    debating: `Round ${activeRound} — The weaker arguments are falling`,
    eliminating: '⛩ The last blade stands...',
    complete: '',
  }

  return (
    <AnimatePresence>
      {ritual !== 'idle' && ritual !== 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-moonlight"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <p className="text-xs tracking-wider text-silver-dim">
            {messages[ritual]}
          </p>
          <span className="text-xs text-silver-dim/40">
            {eliminatedCount}/6 eliminated
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── FINAL VERDICT ────────────────────────────────────────────────────────────
function FinalVerdict({ winner, finalAnswer, onReset }: {
  winner: Sword
  finalAnswer: string
  onReset: () => void
}) {
  return (
    <motion.div
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Winner badge */}
      <div className="mb-8">
        <span className="text-4xl">{winner.icon}</span>
        <p
          className="text-xs tracking-[0.3em] uppercase mt-3 mb-1"
          style={{ color: winner.color }}
        >
          The Surviving Sword
        </p>
        <h2
          className="text-3xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: winner.color,
            textShadow: `0 0 30px ${winner.glowColor}`,
          }}
        >
          {winner.name}
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: '#8A8E94', fontFamily: 'var(--font-japanese)' }}
        >
          {winner.titleJP}
        </p>
      </div>

      <div className="line-gold w-32 mx-auto mb-8" />

      {/* Final answer */}
      <div
        className="px-8 py-6 rounded-sm mb-10 text-left"
        style={{
          background: 'rgba(18,10,36,0.7)',
          border: `1px solid ${winner.color}22`,
          borderLeft: `2px solid ${winner.color}`,
        }}
      >
        <p className="text-silver-bright leading-relaxed text-sm md:text-base" style={{ fontFamily: 'var(--font-sans)' }}>
          {finalAnswer}
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-300"
        style={{
          border: '1px solid rgba(212,168,79,0.2)',
          color: '#D4A84F',
          background: 'transparent',
        }}
        data-hoverable
      >
        Ask Another Question
      </button>
    </motion.div>
  )
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const EXAMPLE_QUESTIONS = [
  'Is AGI inevitable?',
  'Should you optimize for growth or depth?',
  'What makes a great engineer?',
  'Is open source a public good?',
]
