'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useShrineStore } from '@/lib/store/shrine-store'
import { KatanaEnter } from '@/components/transitions/PageTransition'

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    labelJP: 'コード',
    href: 'https://github.com/johannn081023-dot',
    icon: '⌨',
    description: 'Read the source code of my thinking.',
    color: '#C9CDD2',
  },
  {
    label: 'LinkedIn',
    labelJP: '繋がり',
    href: 'https://www.linkedin.com/in/johnpaulgiftson',
    icon: '🤝',
    description: 'For professional conversations.',
    color: '#8CA4FF',
  },
  {
    label: 'Email',
    labelJP: '手紙',
    href: 'mailto:johnpaul081023@gmail.com',
    icon: '📜',
    description: 'For everything worth writing long-form.',
    color: '#D4A84F',
  },
  {
    label: 'Business',
    labelJP: '事業',
    href: 'mailto:snowawaysolutionsltd@gmail.com',
    icon: '🏮',
    description: 'Snowaway Solutions — services and partnerships.',
    color: '#7FD6B2',
  },
]

const FINAL_WORDS = [
  'The shrine does not end here.',
  'It continues wherever curiosity goes.',
  'Thank you for walking the path.',
]

export function TheExit() {
  const { markPageVisited, achievements } = useShrineStore()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => { markPageVisited('exit') }, [markPageVisited])

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const allUnlocked = achievements.every((a) => a.unlocked || a.secret)

  return (
    <KatanaEnter>
      <div className="min-h-screen bg-shrine-abyss pt-24 pb-24 flex flex-col items-center justify-center relative overflow-hidden">

        {/* Background atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(179,58,58,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="shrine-container max-w-2xl text-center">

          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: '#B33A3A', fontFamily: 'var(--font-japanese)' }}
            >
              出口
            </p>
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                background: 'linear-gradient(135deg, #F5F7FA 0%, #D7DBE0 60%, #B33A3A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Exit
            </h1>
            <div
              className="w-32 h-px mx-auto mb-6"
              style={{ background: 'linear-gradient(to right, transparent, #B33A3A, transparent)' }}
            />
          </motion.div>

          {/* Final words */}
          <div className="mb-16">
            {FINAL_WORDS.map((line, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-2xl mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: '#C9CDD2',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Contact links */}
          <motion.div
            className="flex flex-col gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase text-silver-dim/40 mb-4"
            >
              Find me beyond the gate
            </p>
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-4 rounded-sm text-left transition-all duration-400"
                style={{
                  border: `1px solid ${link.color}22`,
                  background: 'rgba(18,10,36,0.4)',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12 }}
                whileHover={{ borderColor: link.color + '44', background: `${link.color}08` }}
                data-hoverable
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-sm font-medium"
                      style={{ color: link.color }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: '#4A3F5C', fontFamily: 'var(--font-japanese)' }}
                    >
                      {link.labelJP}
                    </span>
                  </div>
                  <p className="text-xs text-silver-dim/60">{link.description}</p>
                </div>
                <span
                  className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2"
                  style={{ color: link.color }}
                >
                  →
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Achievement progress */}
          <motion.div
            className="mb-12 p-5 rounded-sm"
            style={{ border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(18,10,36,0.3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <p className="text-xs tracking-wider text-silver-dim/40 mb-3">Your Journey</p>
            <p
              className="text-3xl font-light mb-2"
              style={{ fontFamily: 'var(--font-display)', color: '#D4A84F' }}
            >
              {unlockedCount}
              <span className="text-xl text-silver-dim/30">/{achievements.length}</span>
            </p>
            <p className="text-xs text-silver-dim/40">shrine seals broken</p>
            {allUnlocked && (
              <motion.p
                className="mt-3 text-sm italic"
                style={{ color: '#FFB7C5', fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                You have found everything. The Inner Sanctum awaits.
              </motion.p>
            )}
          </motion.div>

          {/* Back to gate */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <Link
              href="/"
              className="text-xs tracking-widest uppercase text-silver-dim/40 hover:text-silver-dim transition-colors duration-300"
              data-hoverable
            >
              ← Return to the Gate
            </Link>
          </motion.div>

          {/* Signature */}
          <motion.p
            className="mt-12 text-xs"
            style={{ color: '#2A1F3A', fontFamily: 'var(--font-japanese)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            — John Paul Giftson · 神社を訪れてくれてありがとう
          </motion.p>
        </div>
      </div>
    </KatanaEnter>
  )
}
