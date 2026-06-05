'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

const RARITY_COLORS = {
  common:    { border: 'rgba(201,205,210,0.3)', glow: 'rgba(201,205,210,0.15)', text: '#C9CDD2', label: 'DISCOVERY' },
  rare:      { border: 'rgba(140,164,255,0.4)', glow: 'rgba(140,164,255,0.15)', text: '#8CA4FF', label: 'RARE' },
  legendary: { border: 'rgba(212,168,79,0.5)',  glow: 'rgba(212,168,79,0.15)',  text: '#D4A84F', label: 'LEGENDARY' },
  mythic:    { border: 'rgba(255,183,197,0.5)', glow: 'rgba(255,183,197,0.15)', text: '#FFB7C5', label: 'MYTHIC' },
}

export function AchievementToast() {
  const { latestAchievement, clearLatestAchievement } = useShrineStore()

  useEffect(() => {
    if (!latestAchievement) return
    const timer = setTimeout(clearLatestAchievement, 5000)
    return () => clearTimeout(timer)
  }, [latestAchievement, clearLatestAchievement])

  const colors = latestAchievement ? RARITY_COLORS[latestAchievement.rarity as keyof typeof RARITY_COLORS] : null

  return (
    <AnimatePresence>
      {latestAchievement && colors && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-achievement pointer-events-none"
          style={{ translateX: '-50%' }}
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className="flex items-center gap-4 px-6 py-4 rounded-sm"
            style={{
              background: 'rgba(5,3,10,0.92)',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow.replace('0.15', '0.06')}`,
              backdropFilter: 'blur(20px)',
              minWidth: '280px',
              maxWidth: '420px',
            }}
          >
            {/* Seal icon */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative"
              style={{
                border: `1px solid ${colors.border}`,
                background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
              }}
            >
              <span className="text-xl">{latestAchievement.icon}</span>
              {/* Crack animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${colors.text}` }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-2xs tracking-widest font-semibold"
                  style={{ color: colors.text }}
                >
                  {colors.label}
                </span>
                <span className="text-2xs text-silver-dim/40">UNLOCKED</span>
              </div>
              <p
                className="text-sm font-medium truncate"
                style={{ color: '#D7DBE0' }}
              >
                {latestAchievement.name}
              </p>
              <p
                className="text-2xs leading-relaxed mt-0.5"
                style={{ color: '#8A8E94', fontFamily: 'var(--font-japanese)' }}
              >
                {latestAchievement.nameJP}
              </p>
            </div>

            {/* Close */}
            <button
              className="flex-shrink-0 text-silver-dim/40 hover:text-silver-dim transition-colors text-xs pointer-events-auto"
              onClick={clearLatestAchievement}
              data-hoverable
            >
              ✕
            </button>
          </div>

          {/* Progress bar */}
          <motion.div
            className="h-px mt-0 rounded-full"
            style={{ transformOrigin: 'left', background: colors.text, opacity: 0.3 }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
