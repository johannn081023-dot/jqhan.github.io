'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useShrineStore } from '@/lib/store/shrine-store'
import { KatanaEnter } from '@/components/transitions/PageTransition'

// Placeholder scroll entries — replace with real MDX content
const PLACEHOLDER_SCROLLS = [
  {
    slug: 'on-curiosity',
    title: 'On Curiosity as Infrastructure',
    titleJP: '好奇心について',
    description:
      'Why the engineers who ask "why" consistently outbuild those who only ask "how." Curiosity isn\'t a personality trait — it\'s a system.',
    publishedAt: '2025-01-15',
    tags: ['Engineering', 'Philosophy', 'Systems Thinking'],
    readingTime: 6,
    featured: true,
  },
  {
    slug: 'seven-swords-origin',
    title: 'How I Built the Seven Swords',
    titleJP: '七刀の起源',
    description:
      'The design and engineering decisions behind the Seven Swords AI ritual — from prompt architecture to elimination logic to cinematic presentation.',
    publishedAt: '2025-02-08',
    tags: ['AI', 'Engineering', 'Design'],
    readingTime: 9,
    featured: true,
  },
  {
    slug: 'data-storytelling',
    title: 'The Gap Between Data and Truth',
    titleJP: 'データと真実の間',
    description:
      'Most dashboards lie — not through inaccuracy, but through lack of context. On building intelligence systems that actually communicate.',
    publishedAt: '2025-03-02',
    tags: ['Data Science', 'BI', 'Storytelling'],
    readingTime: 5,
    featured: false,
  },
]

const SCROLL_COLORS = ['#D4A84F', '#8CA4FF', '#7FD6B2', '#FFB7C5', '#F6B94A']

export function TheScrolls() {
  const { markPageVisited } = useShrineStore()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => { markPageVisited('scrolls') }, [markPageVisited])

  const allTags = Array.from(new Set(PLACEHOLDER_SCROLLS.flatMap((s) => s.tags)))
  const filtered = activeTag
    ? PLACEHOLDER_SCROLLS.filter((s) => s.tags.includes(activeTag))
    : PLACEHOLDER_SCROLLS

  return (
    <KatanaEnter>
      <div className="min-h-screen bg-shrine-abyss pt-24 pb-24 relative overflow-hidden">

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 20% 40%, rgba(212,168,79,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="shrine-container max-w-3xl">

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
              巻物の間
            </p>
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                background: 'linear-gradient(135deg, #F5F7FA 0%, #D4A84F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Scrolls
            </h1>
            <div className="line-gold w-32 mx-auto mb-6" />
            <p className="text-silver-dim max-w-md mx-auto text-sm">
              Ancient manuscripts on engineering, AI, systems thinking, and the internet.
              Reading should feel like unrolling something sacred.
            </p>
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setActiveTag(null)}
              className="text-2xs tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                border: !activeTag ? '1px solid rgba(212,168,79,0.4)' : '1px solid rgba(255,255,255,0.06)',
                color: !activeTag ? '#D4A84F' : '#8A8E94',
                background: !activeTag ? 'rgba(212,168,79,0.06)' : 'transparent',
              }}
              data-hoverable
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className="text-2xs tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  border: activeTag === tag ? '1px solid rgba(140,164,255,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  color: activeTag === tag ? '#8CA4FF' : '#8A8E94',
                  background: activeTag === tag ? 'rgba(140,164,255,0.06)' : 'transparent',
                }}
                data-hoverable
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Scroll list */}
          <div className="flex flex-col gap-6">
            {filtered.map((scroll, i) => (
              <motion.article
                key={scroll.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  href={`/scrolls/${scroll.slug}`}
                  className="group block p-6 rounded-sm transition-all duration-400"
                  style={{
                    border: `1px solid ${scroll.featured ? SCROLL_COLORS[i % 5] + '22' : 'rgba(255,255,255,0.04)'}`,
                    background: 'rgba(18,10,36,0.4)',
                  }}
                  data-hoverable
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-sm pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${SCROLL_COLORS[i % 5]}08 0%, transparent 60%)`,
                    }}
                  />

                  <div className="flex items-start justify-between gap-4 mb-3 relative">
                    <div>
                      {scroll.featured && (
                        <span
                          className="text-2xs tracking-widest uppercase mb-2 block"
                          style={{ color: SCROLL_COLORS[i % 5] }}
                        >
                          Featured
                        </span>
                      )}
                      <h2
                        className="text-xl md:text-2xl transition-colors duration-300 group-hover:text-silver-katana"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#C9CDD2' }}
                      >
                        {scroll.title}
                      </h2>
                      {scroll.titleJP && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: '#4A3F5C', fontFamily: 'var(--font-japanese)' }}
                        >
                          {scroll.titleJP}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2"
                      style={{ color: SCROLL_COLORS[i % 5] }}
                    >
                      →
                    </span>
                  </div>

                  <p className="text-sm text-silver-dim leading-relaxed mb-4 relative">
                    {scroll.description}
                  </p>

                  <div className="flex items-center gap-4 text-2xs relative" style={{ color: '#4A3F5C' }}>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>
                      {new Date(scroll.publishedAt).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>·</span>
                    <span>{scroll.readingTime} min read</span>
                    <span>·</span>
                    <div className="flex gap-2">
                      {scroll.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{ color: SCROLL_COLORS[i % 5] + '80' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Writing teaser */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="line-gold mb-8" />
            <p
              className="text-sm italic"
              style={{ color: '#4A3F5C', fontFamily: 'var(--font-display)' }}
            >
              &ldquo;More scrolls are being written. Return when the next moon rises.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </KatanaEnter>
  )
}
