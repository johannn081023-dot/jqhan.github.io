'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

// The katana slice overlay — covers the entire screen with an elegant blade transition
export function PageTransition() {
  const pathname = usePathname()
  const { setTransitionState } = useShrineStore()
  const prevPathRef = useRef(pathname)

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      setTransitionState('enter')
      setTimeout(() => setTransitionState('complete'), 900)
    }
  }, [pathname, setTransitionState])

  return (
    <AnimatePresence mode="wait">
      <SliceTransition key={pathname} />
    </AnimatePresence>
  )
}

function SliceTransition({ key: _key }: { key: string }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-transition"
      aria-hidden="true"
    >
      {/* Left blade panel */}
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{ background: 'linear-gradient(to right, #05030A, #120A24)', width: '50%' }}
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        {/* Gold edge on the cut */}
        <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
      </motion.div>

      {/* Right blade panel */}
      <motion.div
        className="absolute inset-y-0 right-0"
        style={{ background: 'linear-gradient(to left, #05030A, #120A24)', width: '50%' }}
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        {/* Gold edge on the cut */}
        <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
      </motion.div>

      {/* Blade gleam line — slices horizontally at the moment of cut */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: '50%',
          height: '2px',
          background: 'linear-gradient(to right, transparent 0%, rgba(245,247,250,0.8) 50%, transparent 100%)',
          transform: 'translateY(-50%)',
          filter: 'blur(0.5px)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.6, times: [0, 0.2, 0.6, 1], ease: 'easeInOut' }}
      />

      {/* Sakura petals drift through the cut */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${15 + i * 14}%`,
            top: '48%',
            width: 6 + Math.random() * 4,
            height: 6 + Math.random() * 4,
            background: ['#FFB7C5', '#FFC8D6', '#D4A84F', '#FFE4EB', '#8CA4FF', '#FFB7C5'][i],
          }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: [0, -(40 + i * 10), (80 + i * 15)],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
            rotate: [0, 180 + i * 30, 360],
          }}
          transition={{
            duration: 0.8,
            delay: 0.05 + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </motion.div>
  )
}

// ─── KATANA ENTRANCE WRAPPER ──────────────────────────────────────────────────
// Wrap page content to animate in after the slice
export function KatanaEnter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
