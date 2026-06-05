import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const springConfig = { damping: 25, stiffness: 300 }
  const ringConfig = { damping: 20, stiffness: 150 }

  const dotX = useSpring(cursorX, springConfig)
  const dotY = useSpring(cursorY, springConfig)
  const ringX = useSpring(cursorX, ringConfig)
  const ringY = useSpring(cursorY, ringConfig)

  const isMobile = useRef(window.innerWidth <= 768)

  useEffect(() => {
    if (isMobile.current) return
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    const onHoverStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovering(true)
      }
    }

    const onHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onHoverStart)
    document.addEventListener('mouseout', onHoverEnd)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onHoverStart)
      document.removeEventListener('mouseout', onHoverEnd)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [cursorX, cursorY, isVisible])

  if (isMobile.current) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 1.8 : isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-9 h-9 rounded-full border border-white/20 transition-colors duration-200"
          style={{
            borderColor: isHovering ? 'rgba(255, 184, 0, 0.6)' : 'rgba(255,255,255,0.2)',
          }}
        />
      </motion.div>
    </>
  )
}
