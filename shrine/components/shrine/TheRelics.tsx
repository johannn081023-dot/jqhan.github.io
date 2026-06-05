'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'
import { KatanaEnter } from '@/components/transitions/PageTransition'
import type { Relic } from '@/lib/types/shrine'

// ─── RELICS DATA ─────────────────────────────────────────────────────────────
// Fill in your actual projects here — these are scaffolded examples
const RELICS: Relic[] = [
  {
    id: 'snowaway',
    title: 'Snowaway Solutions',
    subtitle: 'Snow removal · Landscaping · Auto detailing',
    era: '2024 — Present',
    type: 'artifact',
    status: 'legendary',
    description:
      'A Winnipeg service business I own and operate: snow removal, lawn care, landscaping, and auto detailing. Built from zero — clients, scheduling, billing, and the 6 AM winter starts.',
    longDescription:
      'Snowaway Solutions started as a bet on myself. Winnipeg winters are long — someone has to move the snow. I built a client base through direct outreach, learned CRM systems out of necessity, and expanded into landscaping and auto detailing. Running a service business is a systems engineering problem: how do you deliver consistent quality at scale with a small team? Every operational pain point became a process improvement. Running data pipelines in the day, running routes in the morning.',
    tags: ['Entrepreneurship', 'Operations', 'CRM', 'Systems'],
    techStack: ['CRM Software', 'Route Optimization', 'Social Media Marketing', 'Scheduling Systems'],
    githubUrl: undefined,
    liveUrl: undefined,
    lessons: [
      'Consistency is a competitive moat — show up when others don\'t.',
      'Every business problem is a data problem once you look hard enough.',
    ],
    failures: ['Underpriced the first season. Learned that value isn\'t determined by cost — it\'s determined by the alternative.'],
    futureDirections: ['Automate scheduling with a custom dispatch tool.'],
    color: '#D4A84F',
    featured: true,
  },
  {
    id: 'bi-pipeline-engine',
    title: 'BI Pipeline Engine',
    subtitle: 'From raw SQL to executive-ready dashboards',
    era: '2025–2026',
    type: 'artifact',
    status: 'legendary',
    description:
      'ETL pipelines and Power BI dashboards built across internships at Bison Software and Solara Remote Data Delivery. Turning operational data into actionable decisions.',
    longDescription:
      'Across two internships, built end-to-end data infrastructure: relational database management and query optimization at Bison Software, Python ETL pipelines for data extraction and transformation, and automated Power BI dashboards tracking KPIs for Solara\'s remote delivery operations. The core realization: most reporting failures are pipeline failures in disguise. Fix the data model, fix the insight.',
    tags: ['SQL', 'Power BI', 'Python', 'ETL', 'BI'],
    techStack: ['SQL', 'Python', 'Power BI', 'Pandas', 'Excel', 'ETL'],
    githubUrl: undefined,
    lessons: [
      'A dashboard is only as trustworthy as the pipeline feeding it.',
      'KPI design is a product decision, not a technical one.',
    ],
    failures: ['First dashboard refresh cycle was manual — automated it after one too many Sunday calls.'],
    futureDirections: ['Build a self-service reporting layer so stakeholders own their queries.'],
    color: '#7FD6B2',
    featured: true,
  },
  {
    id: 'shrine',
    title: 'The Shrine',
    subtitle: 'This very website — a digital world',
    era: '2025',
    type: 'crystal',
    status: 'legendary',
    description:
      'A premium digital experience combining Japanese shrine aesthetics, agentic AI, and cinematic motion design. Built to be featured on Awwwards.',
    longDescription:
      'The Shrine is not a portfolio — it is a world. Built with Next.js 15, Framer Motion, GSAP, and custom canvas particle systems. Features the Seven Swords AI ritual powered by the Claude API, a dynamic season system, a full achievement engine, and Easter eggs that reward curiosity.',
    tags: ['Creative Technology', 'Motion Design', 'AI', 'Web'],
    techStack: ['Next.js 15', 'TypeScript', 'Framer Motion', 'GSAP', 'TailwindCSS', 'Claude API'],
    githubUrl: 'https://github.com/johannn081023-dot',
    liveUrl: 'https://johnpaulgiftson.com',
    lessons: [
      'The best interfaces feel inevitable — every decision erased.',
      'Constraints create atmosphere.',
    ],
    failures: ['Over-engineered the particle system twice before getting it right.'],
    futureDirections: ['Three.js environment for The Inner Sanctum.'],
    color: '#8CA4FF',
    featured: true,
  },
  {
    id: 'food-delivery-clone',
    title: 'Food Delivery App Clone',
    subtitle: 'OOP architecture in pure Python',
    era: '2024',
    type: 'scroll',
    status: 'discovered',
    description:
      'A complete food delivery system modeled in Python — restaurants, menus, orders, and delivery tracking built from scratch to showcase object-oriented design.',
    longDescription:
      'Built as a deliberate OOP exercise. Designed a full class hierarchy: Restaurant, Menu, MenuItem, Customer, Order, and DeliveryDriver. Each entity encapsulates its own state and behavior. The goal was not the clone — it was proving I understood composition, inheritance, and encapsulation well enough to model a real-world system entirely from first principles.',
    tags: ['Python', 'OOP', 'System Design'],
    techStack: ['Python 3', 'OOP', 'Data Classes', 'CLI Interface'],
    githubUrl: 'https://github.com/johannn081023-dot',
    lessons: [
      'OOP is not about syntax — it is about modeling the real world accurately.',
      'Good class design is just empathy with the data.',
    ],
    failures: ['Over-inherited in V1 — refactored to favor composition over inheritance.'],
    futureDirections: ['Add a REST API layer with FastAPI.'],
    color: '#FFB7C5',
    featured: false,
  },
  {
    id: 'agentic-pipeline',
    title: 'Agentic Reasoning Pipeline',
    subtitle: 'LLMs that act, not just respond',
    era: '2024',
    type: 'rune',
    status: 'discovered',
    description:
      'An experimental framework for chaining LLM calls with tool use and memory — the early prototype for what would become the Seven Swords.',
    longDescription:
      'Explored structured multi-agent reasoning before it became mainstream. Built a pipeline where multiple LLM personas debate, vote, and synthesize answers. The foundation for the Seven Swords ritual — and proof that the most interesting AI systems are the ones that disagree with themselves.',
    tags: ['AI', 'LLM', 'Python', 'Research'],
    techStack: ['Python', 'Anthropic API', 'Pydantic', 'AsyncIO'],
    githubUrl: 'https://github.com/johannn081023-dot',
    lessons: ['Prompt engineering is just programming with natural language.'],
    failures: ['The voting system produced echo chambers without adversarial prompting.'],
    futureDirections: ['Add retrieval-augmented memory to each persona.'],
    color: '#B33A3A',
    featured: true,
  },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export function TheRelics() {
  const { markPageVisited } = useShrineStore()
  const [activeRelic, setActiveRelic] = useState<Relic | null>(null)
  const [filter, setFilter] = useState<'all' | 'legendary' | 'discovered'>('all')

  useEffect(() => { markPageVisited('relics') }, [markPageVisited])

  const filtered = filter === 'all' ? RELICS : RELICS.filter((r) => r.status === filter)

  return (
    <KatanaEnter>
      <div className="min-h-screen bg-shrine-abyss pt-24 pb-24 relative overflow-hidden">

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(127,214,178,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="shrine-container max-w-5xl">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: '#D4A84F', fontFamily: 'var(--font-japanese)' }}
            >
              遺物の間
            </p>
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                background: 'linear-gradient(135deg, #F5F7FA 0%, #7FD6B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Relics
            </h1>
            <div className="line-gold w-32 mx-auto mb-6" />
            <p className="text-silver-dim max-w-md mx-auto text-sm">
              Legendary artifacts recovered from previous journeys.
              Each one a sealed scroll. Hover to crack the seal.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="flex gap-3 justify-center mb-12">
            {(['all', 'legendary', 'discovered'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300"
                style={{
                  border: filter === f ? '1px solid rgba(212,168,79,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  color: filter === f ? '#D4A84F' : '#8A8E94',
                  background: filter === f ? 'rgba(212,168,79,0.06)' : 'transparent',
                }}
                data-hoverable
              >
                {f}
              </button>
            ))}
          </div>

          {/* Relic grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((relic, i) => (
                <RelicScroll
                  key={relic.id}
                  relic={relic}
                  index={i}
                  onOpen={() => setActiveRelic(relic)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Relic detail modal */}
        <AnimatePresence>
          {activeRelic && (
            <RelicModal relic={activeRelic} onClose={() => setActiveRelic(null)} />
          )}
        </AnimatePresence>
      </div>
    </KatanaEnter>
  )
}

// ─── RELIC SCROLL CARD ────────────────────────────────────────────────────────
function RelicScroll({ relic, index, onOpen }: { relic: Relic; index: number; onOpen: () => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [cracked, setCracked] = useState(false)

  const STATUS_ICONS = { sealed: '🔒', discovered: '⚗', legendary: '⭐' }
  const TYPE_ICONS = { artifact: '🏺', scroll: '📜', rune: '🔮', crystal: '💎', blade: '⚔' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <button
        className="group w-full text-left relative overflow-hidden rounded-sm transition-all duration-500"
        style={{
          border: `1px solid ${cracked ? relic.color : 'rgba(255,255,255,0.06)'}`,
          background: 'rgba(18,10,36,0.5)',
          boxShadow: cracked ? `0 0 30px ${relic.color}22` : 'none',
        }}
        onMouseEnter={() => setCracked(true)}
        onMouseLeave={() => setCracked(false)}
        onClick={onOpen}
        data-hoverable
      >
        {/* Sealed overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${relic.color}08 100%)`,
            opacity: cracked ? 1 : 0,
          }}
        />

        <div className="p-6">
          {/* Status + type */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl">{TYPE_ICONS[relic.type]}</span>
            <div className="flex items-center gap-2">
              <span
                className="text-2xs tracking-wider uppercase px-2 py-0.5 rounded-sm"
                style={{
                  border: `1px solid ${relic.color}33`,
                  color: relic.color,
                  background: `${relic.color}0A`,
                }}
              >
                {relic.status}
              </span>
              <span>{STATUS_ICONS[relic.status]}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg mb-1 transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: cracked ? '#D7DBE0' : '#A8ACB2',
            }}
          >
            {relic.title}
          </h3>
          <p className="text-xs text-silver-dim/60 mb-3">{relic.subtitle}</p>

          <p className="text-sm text-silver-dim leading-relaxed mb-4 line-clamp-2">
            {relic.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {relic.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-2xs px-2 py-0.5 rounded-sm"
                style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#8A8E94' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Era */}
          <p
            className="text-2xs mt-4"
            style={{ color: '#4A3F5C', fontFamily: 'var(--font-mono)' }}
          >
            {relic.era}
          </p>
        </div>

        {/* Crack reveal hint */}
        <div
          className="absolute bottom-0 inset-x-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${relic.color}66, transparent)`,
            opacity: cracked ? 1 : 0,
          }}
        />
      </button>
    </motion.div>
  )
}

// ─── RELIC MODAL ─────────────────────────────────────────────────────────────
function RelicModal({ relic, onClose }: { relic: Relic; onClose: () => void }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-overlay"
        style={{ background: 'rgba(5,3,10,0.7)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-8 bottom-8 z-overlay overflow-y-auto no-scrollbar"
        style={{
          width: 'min(640px, 100%)',
          background: 'rgba(11,6,21,0.96)',
          border: `1px solid ${relic.color}33`,
          borderRadius: '2px',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 0 60px ${relic.color}22`,
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="p-8">
          {/* Close */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-1"
                style={{ color: relic.color }}
              >
                {relic.status} relic
              </p>
              <h2
                className="text-3xl"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#D7DBE0' }}
              >
                {relic.title}
              </h2>
              <p className="text-sm text-silver-dim/60 mt-1">{relic.era}</p>
            </div>
            <button onClick={onClose} className="text-silver-dim hover:text-silver-bright" data-hoverable>
              ✕
            </button>
          </div>

          <div className="line-gold mb-6" />

          <p className="text-sm leading-relaxed text-silver mb-6">{relic.longDescription}</p>

          {/* Tech stack */}
          <div className="mb-6">
            <p className="text-2xs tracking-widest uppercase text-silver-dim/40 mb-3">Forged With</p>
            <div className="flex flex-wrap gap-2">
              {relic.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-sm"
                  style={{
                    border: `1px solid ${relic.color}22`,
                    color: relic.color,
                    background: `${relic.color}0A`,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div className="mb-6">
            <p className="text-2xs tracking-widest uppercase text-silver-dim/40 mb-3">Lessons Learned</p>
            {relic.lessons.map((l, i) => (
              <p key={i} className="text-sm text-silver-dim leading-relaxed mb-2">
                <span style={{ color: '#D4A84F' }}>— </span>{l}
              </p>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-8">
            {relic.githubUrl && (
              <a
                href={relic.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wider px-4 py-2 rounded-sm transition-all duration-300"
                style={{
                  border: '1px solid rgba(212,168,79,0.2)',
                  color: '#D4A84F',
                  background: 'transparent',
                }}
                data-hoverable
              >
                GitHub ↗
              </a>
            )}
            {relic.liveUrl && (
              <a
                href={relic.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wider px-4 py-2 rounded-sm transition-all duration-300"
                style={{
                  border: `1px solid ${relic.color}44`,
                  color: relic.color,
                  background: `${relic.color}0A`,
                }}
                data-hoverable
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
