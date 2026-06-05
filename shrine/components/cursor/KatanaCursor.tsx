'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

// Petal particle for click burst
interface ClickPetal {
  id: number
  x: number
  y: number
  angle: number
  speed: number
  size: number
  color: string
}

const PETAL_COLORS = ['#FFB7C5', '#FFC8D6', '#FFE4EB', '#FF8FAB', '#D4A84F']

let petalCounter = 0

export function KatanaCursor() {
  const { cursorState, setCursorState, incrementSliceCount } = useShrineStore()

  const cursorRef = useRef<HTMLDivElement>(null)
  const bladeRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Smoothed cursor position — blade is precise, outer ring is springy
  const springX = useSpring(rawX, { stiffness: 800, damping: 50 })
  const springY = useSpring(rawY, { stiffness: 800, damping: 50 })

  const trailX = useSpring(rawX, { stiffness: 150, damping: 25 })
  const trailY = useSpring(rawY, { stiffness: 150, damping: 25 })

  const [slashActive, setSlashActive] = useState(false)
  const [petals, setPetals] = useState<ClickPetal[]>([])
  const [angle, setAngle] = useState(0)

  const lastPos = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })

  // Track mouse position and velocity
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e

    // Compute velocity for angle
    velocityRef.current = {
      x: clientX - lastPos.current.x,
      y: clientY - lastPos.current.y,
    }
    lastPos.current = { x: clientX, y: clientY }

    rawX.set(clientX)
    rawY.set(clientY)

    // Compute blade angle from velocity
    if (Math.abs(velocityRef.current.x) > 1 || Math.abs(velocityRef.current.y) > 1) {
      const deg = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI) + 45
      setAngle(deg)
    }
  }, [rawX, rawY])

  // Click — katana slash + petal burst
  const handleClick = useCallback((e: MouseEvent) => {
    setSlashActive(true)
    incrementSliceCount()

    // Spawn petal burst
    const newPetals: ClickPetal[] = Array.from({ length: 8 }, (_, i) => ({
      id: petalCounter++,
      x: e.clientX,
      y: e.clientY,
      angle: (i / 8) * 360 + Math.random() * 20,
      speed: 60 + Math.random() * 80,
      size: 4 + Math.random() * 6,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }))

    setPetals((prev) => [...prev, ...newPetals])

    setTimeout(() => {
      setSlashActive(false)
      setPetals((prev) => prev.filter((p) => !newPetals.find((np) => np.id === p.id)))
    }, 600)
  }, [incrementSliceCount])

  // Hover state detection via event delegation
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.dataset.hoverable
    ) {
      setCursorState('hover')
    } else if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable
    ) {
      setCursorState('text')
    } else {
      setCursorState('idle')
    }
  }, [setCursorState])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick)
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [handleMouseMove, handleClick, handleMouseOver])

  const isHovering = cursorState === 'hover'
  const isText = cursorState === 'text'

  return (
    <>
      {/* Outer trail ring */}
      <motion.div
        ref={trailRef}
        className="fixed pointer-events-none z-cursor"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-silver-katana/20"
          animate={{
            width: isHovering ? 48 : isText ? 2 : 32,
            height: isHovering ? 48 : isText ? 24 : 32,
            borderColor: isHovering
              ? 'rgba(212, 168, 79, 0.4)'
              : 'rgba(245, 247, 250, 0.15)',
            borderRadius: isText ? '2px' : '9999px',
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Core blade cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-cursor"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Blade SVG */}
        <motion.div
          ref={bladeRef}
          animate={{
            rotate: isHovering ? angle - 20 : angle,
            scale: isHovering ? 1.3 : slashActive ? 0.7 : 1,
          }}
          transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Blade outline */}
            <motion.path
              d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
              stroke={isHovering ? '#D4A84F' : '#F5F7FA'}
              strokeWidth={isHovering ? '1.5' : '1'}
              fill="none"
              animate={{
                opacity: slashActive ? 0.3 : 1,
                filter: isHovering
                  ? 'drop-shadow(0 0 4px rgba(212,168,79,0.8))'
                  : 'drop-shadow(0 0 2px rgba(245,247,250,0.4))',
              }}
              transition={{ duration: 0.15 }}
            />
            {/* Center dot */}
            <motion.circle
              cx="12"
              cy="12"
              r="1.5"
              fill={isHovering ? '#D4A84F' : '#F5F7FA'}
              animate={{ opacity: slashActive ? 0 : 1 }}
            />
          </svg>
        </motion.div>

        {/* Slash streak */}
        <AnimatePresence>
          {slashActive && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scaleX: 0, rotate: angle - 90 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="absolute h-px"
                style={{
                  width: '80px',
                  left: '-40px',
                  background:
                    'linear-gradient(to right, transparent, rgba(245,247,250,0.9), transparent)',
                  filter: 'blur(0.5px)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click petal burst */}
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="fixed pointer-events-none z-cursor rounded-full"
            style={{
              left: petal.x,
              top: petal.y,
              width: petal.size,
              height: petal.size,
              background: petal.color,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
            animate={{
              x: Math.cos((petal.angle * Math.PI) / 180) * petal.speed,
              y: Math.sin((petal.angle * Math.PI) / 180) * petal.speed,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ))}
      </AnimatePresence>

      {/* Hover glow pulse */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-cursor rounded-full"
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
              width: 64,
              height: 64,
              background: 'radial-gradient(circle, rgba(212,168,79,0.12) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
