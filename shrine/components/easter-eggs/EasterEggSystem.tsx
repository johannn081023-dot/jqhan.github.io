'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

// Konami Code sequence
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function EasterEggSystem() {
  const {
    brainrotActive,
    toggleBrainrot,
    spectatorActive,
    toggleSpectator,
    unlockAchievement,
    discoverEasterEgg,
  } = useShrineStore()

  const sequenceRef = useRef<string[]>([])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const sequence = [...sequenceRef.current, e.key].slice(-KONAMI.length)
      sequenceRef.current = sequence

      // Konami Code → BRAINROT PROTOCOL
      if (sequence.join(',') === KONAMI.join(',')) {
        toggleBrainrot()
        discoverEasterEgg('konami-brainrot')
        sequenceRef.current = []
      }

      // Type "nah" anywhere → "Nah, I'd Deploy."
      const last3 = sequence.slice(-3).join('').toLowerCase()
      if (last3 === 'nah') {
        unlockAchievement('nah-id-deploy')
        discoverEasterEgg('nah-id-deploy')
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggleBrainrot, unlockAchievement, discoverEasterEgg])

  return (
    <>
      {/* BRAINROT PROTOCOL overlay */}
      <AnimatePresence>
        {brainrotActive && <BrainrotOverlay onClose={toggleBrainrot} />}
      </AnimatePresence>

      {/* Spectator mode overlay */}
      <AnimatePresence>
        {spectatorActive && <SpectatorOverlay onClose={toggleSpectator} />}
      </AnimatePresence>
    </>
  )
}

function BrainrotOverlay({ onClose }: { onClose: () => void }) {
  const messages = [
    '💀 BRAINROT PROTOCOL ACTIVATED 💀',
    'Nah, I\'d Deploy.',
    'Domain Expansion: Merge Conflict',
    'Sigma Engineer grindset unlocked',
    '10x dev detected ✓',
    'git push --force (this is fine)',
    'It works on my machine 🚢',
    'undefined is not a function (but the shrine is)',
    '// TODO: fix later (this is the shrine)',
    'The strongest engineer breaks production beautifully',
    'W rizz, no cap fr fr 🔥',
    '404: Skill issue not found',
    'Press Konami again to restore the shrine',
  ]

  return (
    <motion.div
      className="fixed inset-0 z-overlay pointer-events-auto flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#05030A' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Glitch text rain */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.p
            key={i}
            className="absolute text-xs"
            style={{
              left: `${(i * 5.2) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              fontFamily: 'var(--font-mono)',
              color: i % 3 === 0 ? '#7FD6B2' : i % 3 === 1 ? '#D4A84F' : '#FFB7C5',
            }}
            animate={{ y: ['0%', '100vh'], opacity: [1, 0] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          >
            {messages[i % messages.length]}
          </motion.p>
        ))}
      </div>

      {/* Main text */}
      <motion.div
        className="text-center z-10 px-8"
        animate={{
          filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <h1
          className="text-4xl md:text-6xl mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#7FD6B2',
            textShadow: '0 0 30px rgba(127,214,178,0.6)',
            animation: 'shrineFlicker 0.5s ease-in-out infinite',
          }}
        >
          BRAINROT PROTOCOL
        </h1>
        <p
          className="text-lg mb-8"
          style={{ fontFamily: 'var(--font-mono)', color: '#D4A84F' }}
        >
          // The shrine has been compromised
        </p>
        <p className="text-sm mb-4" style={{ color: '#FFB7C5' }}>
          &ldquo;Nah, I&apos;d Deploy.&rdquo; — JPG, 2:47 AM
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 text-xs tracking-widest uppercase mt-6"
          style={{
            border: '1px solid rgba(127,214,178,0.4)',
            color: '#7FD6B2',
            fontFamily: 'var(--font-sans)',
          }}
          data-hoverable
        >
          RESTORE THE SHRINE
        </button>
      </motion.div>
    </motion.div>
  )
}

function SpectatorOverlay({ onClose }: { onClose: () => void }) {
  const commentary = [
    'The shrine endures.',
    'Most never find this.',
    'Curiosity: the rarest skill.',
    'You have seen what others scroll past.',
    '— JPG',
  ]

  return (
    <motion.div
      className="fixed inset-0 z-overlay pointer-events-auto flex flex-col items-center justify-center"
      style={{
        background: 'rgba(5,3,10,0.92)',
        backdropFilter: 'blur(10px)',
        filter: 'grayscale(100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center px-8 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="text-2xs tracking-[0.4em] uppercase mb-8" style={{ color: '#4A3F5C' }}>
          SPECTATOR MODE
        </p>
        {commentary.map((line, i) => (
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
            transition={{ delay: 0.5 + i * 0.2 }}
          >
            {line}
          </motion.p>
        ))}
        <button
          onClick={onClose}
          className="mt-10 text-xs tracking-widest"
          style={{ color: '#4A3F5C', fontFamily: 'var(--font-sans)' }}
          data-hoverable
        >
          RETURN TO THE SHRINE
        </button>
      </motion.div>
    </motion.div>
  )
}
