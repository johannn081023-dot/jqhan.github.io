'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'
import { KatanaEnter } from '@/components/transitions/PageTransition'

const PILGRIMAGE: {
  year: string
  kanji: string
  title: string
  subtitle: string
  type: 'campfire' | 'temple' | 'marker' | 'lantern' | 'summit'
  description: string
  obsessions: string[]
  color: string
}[] = [
  {
    year: '2020',
    kanji: '始',
    title: 'The First Step',
    subtitle: 'Python and the spark that changed everything',
    type: 'campfire',
    description:
      'Discovered that code is not just syntax — it is thought made executable. First Python scripts. First "it works" moment at 2 AM. The obsession that would define everything that followed.',
    obsessions: ['Python', 'Logic puzzles', 'Automation', 'The "why" behind every system'],
    color: '#F6B94A',
  },
  {
    year: '2021–22',
    kanji: '練',
    title: 'The Self-Made Curriculum',
    subtitle: 'Data, statistics, and building before university',
    type: 'marker',
    description:
      'Before the degree, there was deliberate self-study. SQL, statistics, and data structures. Learning what formal education would later confirm: the fundamentals are not the obstacle — they are the shortcut.',
    obsessions: ['SQL', 'Statistics', 'Data structures', 'Reverse-engineering every system I used'],
    color: '#8CA4FF',
  },
  {
    year: '2023',
    kanji: '門',
    title: 'The Scholar\'s Gate',
    subtitle: 'University of Manitoba · AI & ML Engineering · EPH Apparel',
    type: 'temple',
    description:
      'Enrolled in the BSc AI & Machine Learning Engineering program at the University of Manitoba. Simultaneously joined EPH Apparel as a Marketing & Sales Associate — first professional role, learning that data-driven decisions are not limited to tech companies.',
    obsessions: ['ML fundamentals', 'Linear algebra', 'CRM strategy', 'Being the youngest in every room'],
    color: '#D4A84F',
  },
  {
    year: '2024',
    kanji: '術',
    title: 'The Field Strategist',
    subtitle: 'Telus Communications — Senior Marketing Consultant',
    type: 'marker',
    description:
      'As a Senior Marketing Consultant at Telus, enterprise-scale decisions lived and died by their data. Customer analytics, usage pattern analysis, campaign optimization across a national brand. Discovered that engineering thinking is a competitive advantage in any business role.',
    obsessions: ['Customer data analysis', 'Campaign measurement', 'Translating numbers into decisions'],
    color: '#7FD6B2',
  },
  {
    year: '2025',
    kanji: '構',
    title: 'The Builder\'s Year',
    subtitle: 'Bison Software · SCR Renovations · Snowaway Solutions',
    type: 'lantern',
    description:
      'The year everything compounded. Interned at Bison Software managing relational databases and building Python ETL pipelines. Deployed software systems at SCR Renovations. Founded and operated Snowaway Solutions — snow removal, landscaping, and auto detailing. Data engineering and entrepreneurship, in parallel.',
    obsessions: ['SQL & relational databases', 'ETL pipeline design', 'End-to-end business ownership', 'Efficiency as survival'],
    color: '#B33A3A',
  },
  {
    year: '2026+',
    kanji: '知',
    title: 'The Data Strategist',
    subtitle: 'Solara Remote Data Delivery — BI & Visualization · Still building',
    type: 'summit',
    description:
      'Joined Solara Remote Data Delivery as a Data Visualization and Business Intelligence Intern. Building automated dashboards, tracking operational KPIs, and making complex remote delivery data legible to decision-makers. 3rd year of the degree. More questions than answers. More to build than time allows.',
    obsessions: ['Power BI', 'KPI architecture', 'Agentic AI systems', 'Building things that last'],
    color: '#FFB7C5',
  },
]

const PHILOSOPHIES = [
  {
    quote: 'The strongest engineer is not the one who never breaks production.',
    attribution: 'Found on a lantern',
  },
  {
    quote: 'Curiosity is not a trait. It is a practice.',
    attribution: 'Shrine wall inscription',
  },
  {
    quote: 'Systems thinking is empathy at scale.',
    attribution: 'Overheard at a campfire',
  },
  {
    quote: 'Run a business first. The engineering will make more sense.',
    attribution: 'A 6 AM winter route, Winnipeg',
  },
]

const SKILL_ARSENALS = [
  {
    category: 'Languages',
    kanji: '言語',
    skills: ['Python', 'SQL', 'Java', 'C++', 'R / RStudio'],
    color: '#D4A84F',
  },
  {
    category: 'Data & BI',
    kanji: 'データ',
    skills: ['Power BI', 'Pandas', 'ETL Pipelines', 'Dashboards', 'Relational DBs'],
    color: '#7FD6B2',
  },
  {
    category: 'AI & Systems',
    kanji: 'AI',
    skills: ['ML Fundamentals', 'LLM APIs', 'Agentic Reasoning', 'Data Modeling', 'AsyncIO'],
    color: '#8CA4FF',
  },
  {
    category: 'Business',
    kanji: '事業',
    skills: ['CRM Software', 'Content Strategy', 'Instagram / TikTok', 'B2B Sales', 'Operations'],
    color: '#FFB7C5',
  },
]

export function TheJourney() {
  const { markPageVisited } = useShrineStore()
  useEffect(() => { markPageVisited('journey') }, [markPageVisited])

  return (
    <KatanaEnter>
      <div className="min-h-screen bg-shrine-abyss pt-24 pb-24 relative overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(212,168,79,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="shrine-container max-w-3xl">

          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: '#D4A84F', fontFamily: 'var(--font-japanese)' }}
            >
              旅の記録
            </p>
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                background: 'linear-gradient(135deg, #F5F7FA 0%, #D7DBE0 60%, #D4A84F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Journey
            </h1>
            <div className="line-gold w-32 mx-auto mb-6" />
            <p className="text-silver-dim max-w-md mx-auto text-sm leading-relaxed">
              Not a résumé. A pilgrimage. Each milestone is a shrine marker
              on the path toward something worth building.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical path line */}
            <div
              className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, #D4A84F44, #D4A84F44, transparent)',
                transform: 'translateX(-50%)',
              }}
            />

            <div className="flex flex-col gap-16">
              {PILGRIMAGE.map((milestone, i) => (
                <PilgrimageMarker
                  key={milestone.year}
                  milestone={milestone}
                  index={i}
                  isRight={i % 2 === 1}
                />
              ))}
            </div>
          </div>

          {/* Philosophies */}
          <div className="mt-24">
            <div className="line-gold mb-12" />
            <p
              className="text-xs tracking-[0.4em] uppercase text-center mb-10"
              style={{ color: '#D4A84F' }}
            >
              Inscriptions Found Along the Way
            </p>

            <div className="flex flex-col gap-8">
              {PHILOSOPHIES.map((p, i) => (
                <motion.blockquote
                  key={i}
                  className="relative pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ background: 'linear-gradient(to bottom, #D4A84F, transparent)' }}
                  />
                  <p
                    className="text-lg md:text-xl italic leading-relaxed mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: '#D7DBE0' }}
                  >
                    &ldquo;{p.quote}&rdquo;
                  </p>
                  <p className="text-xs" style={{ color: '#4A3F5C' }}>
                    — {p.attribution}
                  </p>
                </motion.blockquote>
              ))}
            </div>
          </div>

          {/* Current stats */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'GPA', value: '3.4', unit: '/ 4.5', color: '#D4A84F' },
              { label: 'Tools', value: '20+', unit: 'mastered', color: '#8CA4FF' },
              { label: 'Years', value: '6+', unit: 'in code', color: '#7FD6B2' },
              { label: 'Ideas', value: '∞', unit: 'surviving', color: '#FFB7C5' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-sm"
                style={{ border: `1px solid ${stat.color}22`, background: 'rgba(18,10,36,0.4)' }}
              >
                <p
                  className="text-3xl font-light mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-2xs uppercase tracking-widest text-silver-dim/60">
                  {stat.label}
                </p>
                <p className="text-2xs text-silver-dim/40">{stat.unit}</p>
              </div>
            ))}
          </motion.div>

          {/* Skills Arsenal */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="line-gold mb-8" />
            <p
              className="text-xs tracking-[0.4em] uppercase text-center mb-10"
              style={{ color: '#D4A84F' }}
            >
              The Arsenal
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SKILL_ARSENALS.map((category, i) => (
                <motion.div
                  key={category.category}
                  className="p-5 rounded-sm"
                  style={{
                    border: `1px solid ${category.color}22`,
                    background: 'rgba(18,10,36,0.4)',
                  }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-japanese)', color: `${category.color}80` }}
                    >
                      {category.kanji}
                    </span>
                    <p
                      className="text-xs tracking-widest uppercase"
                      style={{ color: category.color }}
                    >
                      {category.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-2xs px-2 py-1 rounded-sm"
                        style={{
                          border: `1px solid ${category.color}22`,
                          color: `${category.color}CC`,
                          background: `${category.color}0A`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </KatanaEnter>
  )
}

function PilgrimageMarker({
  milestone, index, isRight,
}: {
  milestone: typeof PILGRIMAGE[0]
  index: number
  isRight: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const TYPE_ICONS = {
    campfire: '🔥',
    temple:   '⛩',
    marker:   '⚔',
    lantern:  '🏮',
    summit:   '✦',
  }

  return (
    <motion.div
      ref={ref}
      className={`relative flex gap-8 ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-start`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Marker dot on timeline */}
      <div
        className="absolute left-[28px] md:left-1/2 w-3 h-3 rounded-full border-2 z-10"
        style={{
          borderColor: milestone.color,
          background: '#0B0615',
          transform: 'translate(-50%, 12px)',
          boxShadow: `0 0 10px ${milestone.color}44`,
        }}
      />

      {/* Content card */}
      <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isRight ? 'md:text-right' : ''}`}>
        <div
          className="p-5 rounded-sm"
          style={{
            background: 'rgba(18,10,36,0.5)',
            border: `1px solid ${milestone.color}22`,
          }}
        >
          {/* Year + Type */}
          <div className={`flex items-center gap-3 mb-3 ${isRight ? 'md:justify-end' : ''}`}>
            <span className="text-xl">{TYPE_ICONS[milestone.type]}</span>
            <span
              className="text-xs tracking-widest font-mono"
              style={{ color: milestone.color }}
            >
              {milestone.year}
            </span>
            <span
              className="text-lg"
              style={{ fontFamily: 'var(--font-japanese)', color: `${milestone.color}80` }}
            >
              {milestone.kanji}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl mb-1"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#D7DBE0' }}
          >
            {milestone.title}
          </h3>
          <p className="text-xs text-silver-dim/60 mb-3">{milestone.subtitle}</p>

          {/* Description */}
          <p className="text-sm leading-relaxed text-silver-dim mb-4">{milestone.description}</p>

          {/* Obsessions */}
          <div className={`flex flex-wrap gap-2 ${isRight ? 'md:justify-end' : ''}`}>
            {milestone.obsessions.map((obs) => (
              <span
                key={obs}
                className="text-2xs px-2 py-1 rounded-sm"
                style={{
                  border: `1px solid ${milestone.color}22`,
                  color: `${milestone.color}CC`,
                  background: `${milestone.color}0A`,
                }}
              >
                {obs}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for opposite side on desktop */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  )
}
