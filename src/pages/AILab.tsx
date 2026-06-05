import { useState, useRef, ReactNode } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Send, Zap, X, Trophy, Brain, BarChart2, Sword, Globe, RefreshCw } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

// ─── Types ───────────────────────────────────────────────────
type AgentStatus = 'idle' | 'thinking' | 'active' | 'eliminated' | 'winner'

interface Agent {
  id: string
  name: string
  archetype: string
  icon: ReactNode
  color: string
  confidence: number
  argument: string
  status: AgentStatus
  eliminationReason?: string
}

type Phase = 'idle' | 'initializing' | 'deliberating' | 'scoring' | 'eliminating' | 'synthesis' | 'complete'

// ─── Agent definitions ───────────────────────────────────────
const AGENT_TEMPLATES = [
  {
    id: 'empiricist',
    name: 'Dr. Data',
    archetype: 'Empiricist',
    icon: <BarChart2 size={16} />,
    color: '#60A5FA',
  },
  {
    id: 'systems',
    name: 'Sys.Core',
    archetype: 'Systems Thinker',
    icon: <Brain size={16} />,
    color: '#A78BFA',
  },
  {
    id: 'strategist',
    name: 'Strategist',
    archetype: 'Pragmatist',
    icon: <Trophy size={16} />,
    color: '#34D399',
  },
  {
    id: 'contrarian',
    name: 'Contrarian',
    archetype: 'Devil\'s Advocate',
    icon: <Sword size={16} />,
    color: '#F87171',
  },
  {
    id: 'synthesis',
    name: 'Nexus',
    archetype: 'Cross-Domain',
    icon: <Globe size={16} />,
    color: '#FFB800',
  },
]

// ─── Pre-built responses by archetype ────────────────────────
const RESPONSES: Record<string, Record<string, { argument: string; confidence: number }>> = {
  'What makes an AI system truly intelligent?': {
    empiricist: {
      argument: 'Intelligence is operationally defined by measurable performance on diverse, out-of-distribution benchmarks. A system that generalises beyond its training distribution with statistical consistency — not just pattern matching — earns the label. Benchmark: does it surprise its creators?',
      confidence: 82,
    },
    systems: {
      argument: 'True intelligence requires recursive self-modelling — a system must represent its own limitations and update them. Without metacognition, it\'s optimisation, not intelligence. The architecture matters as much as the output.',
      confidence: 76,
    },
    strategist: {
      argument: 'Intelligence in practice means solving real problems in the real world — with incomplete information, under time pressure, with human stakeholders involved. Anything that can\'t operate in that messy environment isn\'t intelligent; it\'s a lab specimen.',
      confidence: 79,
    },
    contrarian: {
      argument: 'We can\'t define intelligence. Hundreds of years of philosophy failed to. Every definition we propose is circular or culturally biased. The more rigorous question is: "useful for what?" Intelligence is a marketing term.',
      confidence: 54,
    },
    synthesis: {
      argument: 'Intelligence is a relational property — it exists between a system and a context. A system is intelligent relative to the problems it faces and the humans it works with. This reconciles the empirical, architectural, and practical perspectives: intelligence is adaptive coherence.',
      confidence: 88,
    },
  },
  'How do data pipelines fail at scale?': {
    empiricist: {
      argument: 'Empirically, the top three failure modes are: schema drift (upstream changes break downstream consumers), silent data quality degradation (bad data that doesn\'t throw errors), and O(n²) join operations that weren\'t tested at production volume.',
      confidence: 91,
    },
    systems: {
      argument: 'Pipelines fail because they\'re designed as linear flows but reality is non-linear. The system has no feedback loops — errors propagate silently downstream. The fix is observability-first architecture: instrument before you scale.',
      confidence: 85,
    },
    strategist: {
      argument: 'Pipelines fail because organisations scale data volume before scaling data governance. You need human agreements — SLAs, ownership, contracts between teams — before you need more compute. The failure is organisational, not technical.',
      confidence: 78,
    },
    contrarian: {
      argument: 'The real question is why teams still build brittle batch pipelines as if production data will stay polite. The architecture is often the failure. Every pipeline designed without contracts, monitoring, and event awareness becomes a liability.',
      confidence: 63,
    },
    synthesis: {
      argument: 'Pipeline failure is a signal that complexity outpaced comprehension. Scale reveals the gap between how engineers think the system works and how it actually works. The solution is: treat your pipeline like a product — with users, contracts, and observability.',
      confidence: 87,
    },
  },
  'Is ML engineering closer to science or engineering?': {
    empiricist: {
      argument: 'It\'s science in hypothesis-formation (experiment design, statistical inference) and engineering in deployment. But the interesting work happens in the liminal space — the reproducibility crisis in ML shows we\'re not doing either rigorously enough.',
      confidence: 83,
    },
    systems: {
      argument: 'ML engineering is systems design with probabilistic guarantees — that\'s engineering. Science requires controlled environments; ML in production requires managing chaotic, uncontrolled distributions. The engineering framing is more honest.',
      confidence: 79,
    },
    strategist: {
      argument: 'Calling it "science" is a status move that justifies long timelines and uncertain outputs. Calling it "engineering" sets delivery expectations. Pragmatically, it\'s engineering — you\'re building products, not publishing papers.',
      confidence: 73,
    },
    contrarian: {
      argument: 'Neither. It\'s craft — more like architecture or cooking than either science or engineering. Intuition, taste, and experience matter as much as methodology. The false binary is the problem.',
      confidence: 68,
    },
    synthesis: {
      argument: 'The framing reveals your context. In research: science. In production: engineering. In startups: craft. The most valuable ML engineers are fluent in all three registers — they know when to run an experiment, when to ship, and when to trust intuition.',
      confidence: 90,
    },
  },
}

const SUGGESTED_QUESTIONS = [
  'What makes an AI system truly intelligent?',
  'How do data pipelines fail at scale?',
  'Is ML engineering closer to science or engineering?',
]

function hashQuestion(question: string, salt: string) {
  return [...`${question}:${salt}`].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 997, 17)
}

function customResponse(question: string, agentId: string) {
  const trimmed = question.trim().replace(/\s+/g, ' ')
  const base = 66 + (hashQuestion(trimmed, agentId) % 23)

  const responses: Record<string, string> = {
    empiricist: `I would start by making "${trimmed}" measurable. What evidence would change our mind, which signals are noisy, and where can we compare outcomes instead of opinions? Without an observable test, the question stays philosophical.`,
    systems: `The useful move is to map "${trimmed}" as a system: inputs, incentives, feedback loops, failure modes, and the humans affected by each decision. The answer depends on where pressure accumulates.`,
    strategist: `For "${trimmed}", the best answer is the one that survives constraints: time, cost, trust, implementation risk, and stakeholder tolerance. A clever idea that cannot ship is just expensive decoration.`,
    contrarian: `The framing of "${trimmed}" may already be hiding the real issue. I would challenge the assumption that this is the right question, then look for the missing alternative no one wants to model.`,
    synthesis: `The strongest answer to "${trimmed}" will combine evidence, architecture, and practical consequence. Treat it as a decision system: define the signal, stress-test the assumptions, and keep the human context visible.`,
  }

  return {
    argument: responses[agentId],
    confidence: agentId === 'synthesis' ? Math.min(92, base + 4) : base,
  }
}

// ─── Thinking dots ───────────────────────────────────────────
function ThinkingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-text-muted inline-block"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  )
}

// ─── Agent Card ──────────────────────────────────────────────
function AgentCard({ agent, phaseIndex }: { agent: Agent; phaseIndex: number }) {
  const isElim = agent.status === 'eliminated'
  const isWinner = agent.status === 'winner'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: isElim ? 0.3 : 1,
        y: 0,
        scale: isElim ? 0.97 : isWinner ? 1.01 : 1,
        filter: isElim ? 'grayscale(100%)' : 'none',
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: phaseIndex * 0.08 }}
      className={`relative p-4 rounded-xl border overflow-hidden transition-colors
        ${isWinner
          ? 'border-accent/50 bg-accent/5'
          : isElim
          ? 'border-border bg-surface'
          : 'border-border-bright bg-surface-2 hover:border-accent/20'
        }`}
    >
      {/* Eliminated overlay */}
      {isElim && (
        <div className="absolute top-2 right-2">
          <X size={14} className="text-red-500/60" />
        </div>
      )}
      {/* Winner crown */}
      {isWinner && (
        <div className="absolute top-2 right-2">
          <Trophy size={14} className="text-accent" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${agent.color}18`, border: `1px solid ${agent.color}30`, color: agent.color }}
        >
          {agent.icon}
        </div>
        <div className="min-w-0">
          <div className="font-display font-700 text-white text-sm">{agent.name}</div>
          <div className="font-mono text-2xs text-text-muted">{agent.archetype}</div>
        </div>
        {agent.status === 'thinking' && (
          <div className="ml-auto"><ThinkingDots /></div>
        )}
        {(agent.status === 'active' || agent.status === 'winner') && (
          <div className="ml-auto font-mono text-sm font-700" style={{ color: agent.color }}>
            {agent.confidence}
          </div>
        )}
      </div>

      {/* Confidence bar */}
      {(agent.status === 'active' || agent.status === 'winner') && (
        <div className="w-full h-[2px] bg-border rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${agent.confidence}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: agent.color }}
          />
        </div>
      )}

      {/* Argument */}
      {agent.argument && (
        <p className={`text-xs leading-relaxed ${isElim ? 'text-text-muted' : 'text-text-secondary'}`}>
          "{agent.argument}"
        </p>
      )}

      {/* Elimination reason */}
      {isElim && agent.eliminationReason && (
        <p className="text-2xs font-mono text-red-500/50 mt-2 italic">{agent.eliminationReason}</p>
      )}
    </motion.div>
  )
}

// ─── Synthesis Card ──────────────────────────────────────────
function SynthesisCard({ question, agents }: { question: string; agents: Agent[] }) {
  const winner = agents.find((a) => a.status === 'winner')
  const survivors = agents.filter((a) => a.status !== 'eliminated')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-2xl border border-accent/30 bg-accent/5 p-6 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 400px 200px at 50% 0%, rgba(255,184,0,0.06), transparent)' }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-accent" />
          <span className="font-mono text-xs text-accent uppercase tracking-widest">Consensus Reached</span>
        </div>

        <h3 className="font-display font-700 text-white text-lg mb-1">
          On: <span className="text-accent">"{question}"</span>
        </h3>
        <p className="font-mono text-2xs text-text-muted mb-4">
          {survivors.length}/{agents.length} agents contributed · Winner: {winner?.name}
        </p>

        <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 mb-4">
          <p className="text-white text-sm leading-relaxed">
            {winner?.argument}
          </p>
        </div>

        {/* Surviving agents */}
        <div className="flex flex-wrap gap-2">
          {survivors.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full border text-2xs font-mono"
              style={{ borderColor: `${a.color}30`, background: `${a.color}10`, color: a.color }}
            >
              {a.name} · {a.confidence}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Lab Page ───────────────────────────────────────────
export default function AILab() {
  const [question, setQuestion] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [agents, setAgents] = useState<Agent[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [synthesisVisible, setSynthesisVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true })

  const buildAgents = (q: string): Agent[] => {
    const responses = RESPONSES[q] ?? {}
    return AGENT_TEMPLATES.map((tmpl) => ({
      ...tmpl,
      confidence: responses[tmpl.id]?.confidence ?? customResponse(q, tmpl.id).confidence,
      argument: responses[tmpl.id]?.argument ?? customResponse(q, tmpl.id).argument,
      status: 'idle' as AgentStatus,
    }))
  }

  const runSimulation = async (q: string) => {
    if (!q.trim()) return

    setCurrentQuestion(q)
    setSynthesisVisible(false)
    setPhase('initializing')

    const builtAgents = buildAgents(q)
    setAgents(builtAgents.map((a) => ({ ...a, status: 'idle' })))

    // Phase 1: introduce agents one by one
    await delay(400)
    setPhase('deliberating')

    for (let i = 0; i < builtAgents.length; i++) {
      await delay(300)
      setAgents((prev) =>
        prev.map((a, idx) => (idx === i ? { ...a, status: 'thinking' } : a))
      )
    }

    // Phase 2: reveal arguments
    await delay(1800)
    setPhase('scoring')
    setAgents(builtAgents.map((a) => ({ ...a, status: 'active' })))

    // Phase 3: eliminate low scorers
    await delay(2200)
    setPhase('eliminating')

    const sorted = [...builtAgents].sort((a, b) => b.confidence - a.confidence)
    const threshold = sorted[2].confidence // eliminate bottom 2
    const eliminationReasons: Record<string, string> = {
      contrarian: 'Confidence score too low — insufficient constructive framing.',
      strategist: 'Overlap with higher-confidence pragmatic arguments detected.',
      empiricist: 'Superseded by more complete empirical analysis.',
      systems: 'Architectural argument absorbed into synthesis.',
    }

    setAgents(
      builtAgents.map((a) => ({
        ...a,
        status: a.confidence < threshold ? 'eliminated' : 'active',
        eliminationReason: a.confidence < threshold ? (eliminationReasons[a.id] ?? 'Low confidence score.') : undefined,
      }))
    )

    // Phase 4: find winner and synthesise
    await delay(1500)
    setPhase('synthesis')

    const winner = builtAgents.reduce((best, a) => (a.confidence > best.confidence ? a : best))
    setAgents((prev) =>
      prev.map((a) => (a.id === winner.id ? { ...a, status: 'winner' } : a))
    )

    await delay(600)
    setSynthesisVisible(true)
    setPhase('complete')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phase !== 'idle' && phase !== 'complete') return
    runSimulation(question)
  }

  const reset = () => {
    setPhase('idle')
    setAgents([])
    setSynthesisVisible(false)
    setQuestion('')
    setCurrentQuestion('')
    inputRef.current?.focus()
  }

  const phaseLabel: Record<Phase, string> = {
    idle: 'Ready',
    initializing: 'Initializing agents...',
    deliberating: 'Agents deliberating...',
    scoring: 'Scoring arguments...',
    eliminating: 'Eliminating weak positions...',
    synthesis: 'Synthesizing consensus...',
    complete: 'Consensus reached.',
  }

  return (
    <PageTransition>
      <main className="page">
        {/* Header */}
        <section className="container-xl pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6">
              <span className="font-mono text-2xs text-accent uppercase tracking-widest">Experimental</span>
            </div>
            <h1
              className="font-display font-800 text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Evolutionary<br />
              <span className="text-accent">Consensus Engine</span>
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Ask a question. Five AI agents each bring a distinct perspective — empiricist, systems thinker, pragmatist, contrarian, and synthesiser.
              They debate, get scored, and the weakest positions are eliminated. The strongest argument survives.
            </p>
          </motion.div>
        </section>

        {/* Engine */}
        <section className="container-xl pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Main panel */}
            <div className="flex flex-col gap-4">
              {/* Input */}
              <div className="card p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} className="text-accent" />
                    <span className="font-mono text-2xs text-accent uppercase tracking-widest">Query</span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask a question to the engine..."
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-surface-3 text-white placeholder-text-muted font-sans text-sm focus:border-accent/40 focus:outline-none transition-colors"
                      disabled={phase !== 'idle' && phase !== 'complete'}
                    />
                    <button
                      type="submit"
                      disabled={!question.trim() || (phase !== 'idle' && phase !== 'complete')}
                      aria-label="Run consensus simulation"
                      className="px-4 py-3 rounded-xl border border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                    </button>
                  </div>

                  {/* Suggestions */}
                  {phase === 'idle' && (
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setQuestion(q)}
                          className="text-2xs font-mono text-text-muted hover:text-accent border border-border hover:border-accent/30 rounded-full px-3 py-1.5 transition-all"
                        >
                          {q.length > 40 ? q.slice(0, 40) + '…' : q}
                        </button>
                      ))}
                    </div>
                  )}
                </form>
              </div>

              {/* Phase status */}
              {phase !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between px-4 py-2 rounded-xl border border-border bg-surface"
                >
                  <div className="flex items-center gap-2">
                    {phase !== 'complete' && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    {phase === 'complete' && <div className="w-2 h-2 rounded-full bg-green-400" />}
                    <span className="font-mono text-xs text-text-secondary">{phaseLabel[phase]}</span>
                  </div>
                  {phase === 'complete' && (
                    <button
                      onClick={reset}
                      aria-label="Reset consensus simulation"
                      className="flex items-center gap-1.5 font-mono text-2xs text-text-muted hover:text-white transition-colors"
                    >
                      <RefreshCw size={11} /> Reset
                    </button>
                  )}
                </motion.div>
              )}

              {/* Agent grid */}
              <AnimatePresence mode="popLayout">
                {agents.length > 0 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {agents.map((agent, i) => (
                      <AgentCard key={agent.id} agent={agent} phaseIndex={i} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Synthesis */}
              <AnimatePresence>
                {synthesisVisible && (
                  <SynthesisCard question={currentQuestion} agents={agents} />
                )}
              </AnimatePresence>

              {/* Idle placeholder */}
              {phase === 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-2xl border border-border bg-surface flex items-center justify-center mb-4">
                    <Brain size={20} className="text-text-muted" />
                  </div>
                  <p className="font-display font-700 text-white mb-1">Engine standing by</p>
                  <p className="text-text-muted text-sm">Enter a question above to begin the debate.</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar: Protocol */}
            <div ref={infoRef} className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="card p-5"
              >
                <p className="section-label mb-4">Protocol</p>
                <ol className="flex flex-col gap-4">
                  {[
                    {
                      step: '01',
                      title: 'Agents Initialise',
                      desc: 'Five agents with distinct reasoning archetypes activate — each bringing a different lens.',
                    },
                    {
                      step: '02',
                      title: 'Independent Deliberation',
                      desc: 'Each agent reasons from its own epistemic framework, producing independent arguments.',
                    },
                    {
                      step: '03',
                      title: 'Scoring',
                      desc: 'Arguments are evaluated on clarity, depth, and constructiveness. Confidence scores revealed.',
                    },
                    {
                      step: '04',
                      title: 'Elimination Round',
                      desc: 'Bottom-scoring agents are eliminated. Weak positions don\'t survive.',
                    },
                    {
                      step: '05',
                      title: 'Synthesis',
                      desc: 'The strongest surviving argument becomes the final synthesis.',
                    },
                  ].map((s, i) => (
                    <motion.li
                      key={s.step}
                      initial={{ opacity: 0, x: 8 }}
                      animate={infoInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex gap-3"
                    >
                      <span className="font-mono text-xs text-accent shrink-0 mt-0.5">{s.step}</span>
                      <div>
                        <div className="font-display font-700 text-white text-sm mb-0.5">{s.title}</div>
                        <div className="text-text-secondary text-xs leading-relaxed">{s.desc}</div>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>

              {/* Agents legend */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card p-5"
              >
                <p className="section-label mb-4">Agents</p>
                <div className="flex flex-col gap-3">
                  {AGENT_TEMPLATES.map((a) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs"
                        style={{ background: `${a.color}18`, border: `1px solid ${a.color}30`, color: a.color }}
                      >
                        {a.icon}
                      </div>
                      <div>
                        <div className="font-display font-700 text-white text-sm">{a.name}</div>
                        <div className="font-mono text-2xs text-text-muted">{a.archetype}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Context note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={infoInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl border border-dashed border-border"
              >
                <p className="font-mono text-2xs text-text-muted leading-relaxed">
                  The Evolutionary Consensus Engine is a conceptual project exploring how competitive argument selection can improve reasoning quality. In production, each agent would invoke a real LLM endpoint with custom system prompts.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
