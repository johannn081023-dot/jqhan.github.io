'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

const RARITY_COLORS = {
  common:    '#C9CDD2',
  rare:      '#8CA4FF',
  legendary: '#D4A84F',
  mythic:    '#FFB7C5',
}

export function ShrineJournal() {
  const { journalOpen, toggleJournal, achievements, journalEntries } = useShrineStore()

  const unlocked = achievements.filter((a) => a.unlocked)
  const locked   = achievements.filter((a) => !a.unlocked && !a.secret)

  return (
    <AnimatePresence>
      {journalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-overlay"
            style={{ background: 'rgba(5,3,10,0.7)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleJournal}
          />

          {/* Journal panel */}
          <motion.div
            className="fixed right-0 top-0 h-full z-overlay flex flex-col"
            style={{
              width: 'min(480px, 95vw)',
              background: 'rgba(11,6,21,0.96)',
              borderLeft: '1px solid rgba(212,168,79,0.12)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <div>
                <h2
                  className="text-xl mb-0.5"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#D4A84F' }}
                >
                  Shrine Journal
                </h2>
                <p
                  className="text-xs"
                  style={{ color: '#4A3F5C', fontFamily: 'var(--font-japanese)' }}
                >
                  神社日記 — {unlocked.length} seals broken
                </p>
              </div>
              <button
                onClick={toggleJournal}
                className="text-silver-dim hover:text-silver-bright transition-colors"
                data-hoverable
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6">

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-silver-dim">Seals Broken</span>
                  <span className="text-xs" style={{ color: '#D4A84F' }}>
                    {unlocked.length} / {achievements.length}
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, #D4A84F, #F6B94A)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              {/* Unlocked achievements */}
              {unlocked.length > 0 && (
                <div className="mb-8">
                  <p className="text-2xs tracking-widest uppercase text-silver-dim/60 mb-4">
                    Broken Seals
                  </p>
                  <div className="flex flex-col gap-3">
                    {unlocked.map((a, i) => (
                      <motion.div
                        key={a.id}
                        className="flex items-center gap-4 p-3 rounded-sm"
                        style={{
                          background: 'rgba(18,10,36,0.6)',
                          border: `1px solid ${RARITY_COLORS[a.rarity]}22`,
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            border: `1px solid ${RARITY_COLORS[a.rarity]}44`,
                            background: `${RARITY_COLORS[a.rarity]}0A`,
                          }}
                        >
                          <span className="text-lg">{a.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-silver-bright truncate">{a.name}</p>
                            <span
                              className="text-2xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                              style={{
                                border: `1px solid ${RARITY_COLORS[a.rarity]}33`,
                                color: RARITY_COLORS[a.rarity],
                              }}
                            >
                              {a.rarity}
                            </span>
                          </div>
                          <p className="text-2xs text-silver-dim/60 truncate">{a.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked achievements */}
              {locked.length > 0 && (
                <div className="mb-8">
                  <p className="text-2xs tracking-widest uppercase text-silver-dim/40 mb-4">
                    Sealed
                  </p>
                  <div className="flex flex-col gap-2">
                    {locked.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-4 p-3 rounded-sm opacity-40"
                        style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <span className="text-lg grayscale opacity-40">{a.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-silver-dim">{a.name}</p>
                          <p className="text-2xs text-silver-dim/40">{a.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Secret hint */}
              <div className="text-center py-6">
                <div className="line-gold mb-4" />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: '#4A3F5C', fontFamily: 'var(--font-japanese)' }}
                >
                  {achievements.filter((a) => a.secret && !a.unlocked).length} secret seals remain.
                  <br />
                  <span className="italic">好奇心を持て。</span>
                </p>
              </div>

              {/* Journal log */}
              {journalEntries.length > 0 && (
                <div>
                  <p className="text-2xs tracking-widest uppercase text-silver-dim/40 mb-4">
                    Discovery Log
                  </p>
                  <div className="flex flex-col gap-2">
                    {journalEntries.slice(0, 20).map((entry, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-2xs"
                        style={{ color: '#4A3F5C' }}
                      >
                        <span className="flex-shrink-0 mt-0.5">—</span>
                        <span className="leading-relaxed">{entry.name}</span>
                        <span className="flex-shrink-0 ml-auto text-silver-dim/20">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
