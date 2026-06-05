'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

interface ShrineCatProps {
  page: string
  className?: string
}

const CAT_MESSAGES = [
  'にゃ',
  '…',
  '好奇心。',
  '*stares at production deployment*',
  'Domain Expansion loading...',
  '(⁎˃ᆺ˂)',
]

export function ShrineCat({ page, className = '' }: ShrineCatProps) {
  const { markCatFound, unlockAchievement } = useShrineStore()
  const [clickCount, setClickCount] = useState(0)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount === 1) {
      markCatFound(page)
    }

    if (newCount >= 10) {
      unlockAchievement('domain-expansion')
    }

    const msg = CAT_MESSAGES[Math.floor(Math.random() * CAT_MESSAGES.length)]
    setMessage(msg)
    setShowMessage(true)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowMessage(false), 2000)
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleClick}
        className="text-2xl transition-transform duration-200 hover:scale-110"
        data-hoverable
        aria-label="Shrine cat"
        title="にゃ"
      >
        🐱
      </button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap pointer-events-none z-50"
            style={{
              transform: 'translateX(-50%)',
              background: 'rgba(18,10,36,0.95)',
              border: '1px solid rgba(212,168,79,0.2)',
              color: '#C9CDD2',
              fontFamily: clickCount > 5 ? 'var(--font-mono)' : 'var(--font-japanese)',
            }}
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
