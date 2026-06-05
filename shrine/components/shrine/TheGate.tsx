'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { useShrineStore } from '@/lib/store/shrine-store'
import { useSeason } from '@/lib/hooks/use-season'

// Rotating hero lines
const GATE_HEADLINES = [
  'Some ideas deserve to survive.',
  'Curiosity is a weapon.',
  'Most answers are generated. Mine survive.',
  'Welcome to the shrine.',
  'The strongest engineer breaks production beautifully.',
  'AI student. Data builder. Owner before the diploma.',
  'Python, SQL, and ideas that refuse to stay quiet.',
]

export function TheGate() {
  const router = useRouter()
  const { markPageVisited, incrementSliceCount } = useShrineStore()
  const { season } = useSeason()

  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [enterState, setEnterState] = useState<'idle' | 'slicing' | 'revealing' | 'done'>('idle')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [codeVisible, setCodeVisible] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const sliceRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const toriiRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springMx = useSpring(mx, { stiffness: 80, damping: 30 })
  const springMy = useSpring(my, { stiffness: 80, damping: 30 })

  // Parallax transforms for the Torii
  const toriiX = useTransform(springMx, [-0.5, 0.5], [-8, 8])
  const toriiY = useTransform(springMy, [-0.5, 0.5], [-4, 4])
  const mountainsX = useTransform(springMx, [-0.5, 0.5], [-15, 15])
  const mountainsY = useTransform(springMy, [-0.5, 0.5], [-6, 6])
  const starsX = useTransform(springMx, [-0.5, 0.5], [-4, 4])

  useEffect(() => {
    markPageVisited('gate')
  }, [markPageVisited])

  // Rotate headlines
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % GATE_HEADLINES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Mouse parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window
    mx.set((e.clientX / innerWidth - 0.5))
    my.set((e.clientY / innerHeight - 0.5))
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [mx, my])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // ─── ENTER SEQUENCE ──────────────────────────────────────────────────────
  const handleEnter = useCallback(async () => {
    if (enterState !== 'idle') return
    setEnterState('slicing')
    incrementSliceCount()

    // Phase 1: Blade slash appears (300ms)
    if (sliceRef.current) {
      gsap.fromTo(
        sliceRef.current,
        { scaleX: 0, opacity: 0, left: '-5%' },
        { scaleX: 1, opacity: 1, left: '105%', duration: 0.28, ease: 'power4.inOut' }
      )
    }

    // Phase 2: Show raw code beneath (300ms)
    setTimeout(() => {
      setCodeVisible(true)
      setEnterState('revealing')
    }, 200)

    // Phase 3: Code disappears, panels split, navigate
    setTimeout(() => {
      setCodeVisible(false)
      setEnterState('done')

      // Split panels
      if (containerRef.current) {
        const topHalf = containerRef.current.querySelector('.gate-top')
        const bottomHalf = containerRef.current.querySelector('.gate-bottom')
        if (topHalf && bottomHalf) {
          gsap.to(topHalf, { y: '-100%', duration: 0.5, ease: 'power3.inOut', delay: 0.05 })
          gsap.to(bottomHalf, { y: '100%', duration: 0.5, ease: 'power3.inOut', delay: 0.05 })
        }
      }

      setTimeout(() => router.push('/journey'), 650)
    }, 500)
  }, [enterState, incrementSliceCount, router])

  // Code text to flash (easter egg: real shrine code)
  const SHRINE_CODE = `// The Shrine — John Paul Giftson
// BSc AI & ML Engineering — University of Manitoba
// Some ideas deserve to survive.

import { python, sql, powerBI } from '@/arsenal/tools'
import { curiosity, engineering } from '@/shrine/mind'
import { storytelling, systems } from '@/shrine/craft'

export const shrine = async () => {
  const ideas = await curiosity.collect()
  const filtered = ideas.filter(
    (idea) => idea.survives === true
  )
  return filtered.map(engineering.build)
}

// "Nah, I'd Deploy." — JPG, 2:47 AM
// Domain Expansion: Merge Conflict`

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* ── SPLIT PANEL WRAPPER ── */}
      <div className="gate-top absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}>
        <GateScene
          toriiX={toriiX} toriiY={toriiY}
          mountainsX={mountainsX}
          starsX={starsX}
          headlineIndex={headlineIndex}
          onEnter={handleEnter}
          enterState={enterState}
          half="top"
        />
      </div>
      <div className="gate-bottom absolute inset-0" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}>
        <GateScene
          toriiX={toriiX} toriiY={toriiY}
          mountainsX={mountainsX}
          starsX={starsX}
          headlineIndex={headlineIndex}
          onEnter={handleEnter}
          enterState={enterState}
          half="bottom"
        />
      </div>

      {/* ── KATANA SLASH LINE ── */}
      <div
        ref={sliceRef}
        className="fixed top-1/2 -translate-y-1/2 pointer-events-none z-50"
        style={{
          width: '12%',
          height: '2px',
          background: 'linear-gradient(to right, transparent, rgba(245,247,250,0.95), rgba(212,168,79,0.8), rgba(245,247,250,0.95), transparent)',
          filter: 'blur(0.3px)',
          boxShadow: '0 0 8px rgba(245,247,250,0.6), 0 0 20px rgba(212,168,79,0.4)',
          opacity: 0,
        }}
      />

      {/* ── CODE FLASH (Easter Egg Reveal) ── */}
      <AnimatePresence>
        {codeVisible && (
          <motion.div
            ref={codeRef}
            className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <pre
              className="text-xs md:text-sm leading-relaxed max-w-lg px-8 py-6 rounded-lg"
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#7FD6B2',
                background: 'rgba(5, 3, 10, 0.9)',
                border: '1px solid rgba(127, 214, 178, 0.2)',
                boxShadow: '0 0 40px rgba(127, 214, 178, 0.1)',
              }}
            >
              {SHRINE_CODE}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── GATE SCENE (renders both halves identically — clip handles separation) ──
interface GateSceneProps {
  toriiX: any
  toriiY: any
  mountainsX: any
  starsX: any
  headlineIndex: number
  onEnter: () => void
  enterState: string
  half: 'top' | 'bottom'
}

function GateScene({
  toriiX, toriiY, mountainsX, starsX,
  headlineIndex, onEnter, enterState, half,
}: GateSceneProps) {
  return (
    <div className="absolute inset-0" style={{ background: '#0B0615' }}>

      {/* ── SKY GRADIENT ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% 0%, #1A0F30 0%, #0B0615 50%, #05030A 100%)',
        }}
      />

      {/* ── STARS ── */}
      <motion.div className="absolute inset-0" style={{ x: starsX }}>
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              background: 'white',
              opacity: star.opacity,
              animation: `shrineFlicker ${2 + star.flicker}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* ── MOON ── */}
      <motion.div
        className="absolute"
        style={{ top: '8%', right: '12%', x: starsX }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div
          className="rounded-full"
          style={{
            width: 80,
            height: 80,
            background: 'radial-gradient(circle at 35% 35%, #D7DBE0 0%, #A8ACB2 40%, #6E7480 100%)',
            boxShadow: '0 0 40px rgba(215,219,224,0.15), 0 0 80px rgba(140,164,255,0.08)',
          }}
        />
        {/* Moon glow halo */}
        <div
          className="absolute -inset-6 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(140,164,255,0.4) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── DISTANT MOUNTAINS ── */}
      <motion.div className="absolute bottom-0 inset-x-0" style={{ x: mountainsX }}>
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-auto"
          style={{ transform: 'translateY(1px)' }}
          aria-hidden="true"
        >
          {/* Back mountains — very dark */}
          <path
            d="M0,250 L80,180 L160,220 L240,140 L320,190 L400,120 L480,170 L560,100 L640,160 L720,90 L800,150 L880,80 L960,140 L1040,100 L1120,160 L1200,110 L1280,170 L1360,130 L1440,200 L1440,400 L0,400 Z"
            fill="#08051A"
          />
          {/* Mid mountains */}
          <path
            d="M0,320 L120,240 L200,280 L300,200 L400,260 L500,180 L600,240 L700,170 L800,230 L900,160 L1000,220 L1100,180 L1200,240 L1300,200 L1440,280 L1440,400 L0,400 Z"
            fill="#0D0820"
          />
          {/* Front hill silhouette */}
          <path
            d="M0,370 L200,320 L400,340 L600,300 L800,330 L1000,310 L1200,350 L1440,330 L1440,400 L0,400 Z"
            fill="#0B0615"
          />
          {/* Mist layer */}
          <path
            d="M0,330 Q180,310 360,340 Q540,370 720,330 Q900,290 1080,330 Q1260,370 1440,330 L1440,400 L0,400 Z"
            fill="rgba(140,164,255,0.04)"
          />
        </svg>
      </motion.div>

      {/* ── TORII GATE ── */}
      <motion.div
        className="absolute inset-x-0 flex items-end justify-center"
        style={{ bottom: '12%', x: toriiX, y: toriiY }}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <ToriiGateSVG />
      </motion.div>

      {/* ── STONE PATH ── */}
      <motion.div
        className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <svg
          viewBox="0 0 400 200"
          className="w-full max-w-2xl h-auto"
          style={{ transform: 'translateY(1px)' }}
          aria-hidden="true"
        >
          {STONE_PATH.map((stone, i) => (
            <ellipse
              key={i}
              cx={stone.cx}
              cy={stone.cy}
              rx={stone.rx}
              ry={stone.ry}
              fill="#120A24"
              stroke="rgba(212,168,79,0.08)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* ── LANTERNS ── */}
      <motion.div
        className="absolute inset-x-0 flex justify-center"
        style={{ bottom: '14%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <div className="relative w-full max-w-3xl">
          <Lantern style={{ position: 'absolute', left: '18%', bottom: 0 }} delay={0} />
          <Lantern style={{ position: 'absolute', right: '18%', bottom: 0 }} delay={0.3} />
          <Lantern style={{ position: 'absolute', left: '8%', bottom: -10 }} delay={0.6} size="sm" />
          <Lantern style={{ position: 'absolute', right: '8%', bottom: -10 }} delay={0.9} size="sm" />
        </div>
      </motion.div>

      {/* ── HERO CONTENT ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">

        {/* Japanese subtitle */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: '#D4A84F', fontFamily: 'var(--font-japanese)', opacity: 0.7 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          神社へようこそ
        </motion.p>

        {/* Rotating headline */}
        <div className="h-[1.2em] overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={headlineIndex}
              className="text-center text-shrine leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #F5F7FA 0%, #D7DBE0 40%, #D4A84F 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {GATE_HEADLINES[headlineIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          className="text-center max-w-md mb-12 text-base leading-relaxed"
          style={{ color: '#8A8E94', fontFamily: 'var(--font-sans)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          A digital shrine where AI engineering, data systems,
          and relentless curiosity converge.
          Built by{' '}
          <span style={{ color: '#C9CDD2' }}>John Paul Giftson</span>
          {' '}— AI & ML student, Winnipeg.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onEnter}
          disabled={enterState !== 'idle'}
          className="group relative overflow-hidden px-10 py-4 rounded-sm"
          style={{
            border: '1px solid rgba(212, 168, 79, 0.4)',
            background: 'rgba(11, 6, 21, 0.6)',
            letterSpacing: '0.25em',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-hoverable
        >
          {/* Shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(212,168,79,0.12) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />

          {/* Gold bottom edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to right, transparent, #D4A84F, transparent)',
              opacity: 0.6,
            }}
          />

          <span
            className="relative text-xs font-medium tracking-[0.3em] uppercase"
            style={{
              color: enterState === 'idle' ? '#D4A84F' : '#8A8E94',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {enterState === 'idle' && '⛩ Enter the Shrine'}
            {enterState === 'slicing' && '✦ Drawing the blade...'}
            {enterState === 'revealing' && '⚔ The gate opens...'}
            {enterState === 'done' && '→ Entering...'}
          </span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span
            className="text-2xs tracking-widest uppercase"
            style={{ color: '#4A3F5C', fontFamily: 'var(--font-sans)' }}
          >
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(212,168,79,0.4), transparent)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* ── GROUND MIST ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(11,6,21,0.8) 0%, transparent 100%)',
        }}
      />

      {/* ── VIGNETTE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(5,3,10,0.6) 100%)',
        }}
      />
    </div>
  )
}

// ─── TORII GATE SVG ───────────────────────────────────────────────────────────
function ToriiGateSVG() {
  return (
    <svg
      viewBox="0 0 520 380"
      className="w-full max-w-2xl h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 40px rgba(212,168,79,0.15))' }}
      aria-hidden="true"
    >
      {/* Outer kasagi (top beam — curved) */}
      <path
        d="M20,95 Q260,65 500,95"
        stroke="#C8922A"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(200,146,42,0.4))' }}
      />
      {/* Outer kasagi caps */}
      <rect x="8" y="86" width="32" height="18" rx="3" fill="#C8922A" />
      <rect x="480" y="86" width="32" height="18" rx="3" fill="#C8922A" />

      {/* Inner nuki (secondary beam) */}
      <line x1="75" y1="130" x2="445" y2="130" stroke="#B87A18" strokeWidth="10" strokeLinecap="round" />
      {/* Nuki connectors */}
      <rect x="68" y="125" width="14" height="14" rx="2" fill="#B87A18" />
      <rect x="438" y="125" width="14" height="14" rx="2" fill="#B87A18" />

      {/* Left pillar */}
      <rect x="80" y="98" width="24" height="282" rx="4" fill="#A8700C" />
      {/* Left pillar — shimmer/gold edge */}
      <rect x="80" y="98" width="4" height="282" rx="2" fill="#D4A84F" fillOpacity="0.4" />

      {/* Right pillar */}
      <rect x="416" y="98" width="24" height="282" rx="4" fill="#A8700C" />
      {/* Right pillar — shimmer/gold edge */}
      <rect x="436" y="98" width="4" height="282" rx="2" fill="#D4A84F" fillOpacity="0.4" />

      {/* Shimagi (shimmer on outer beams) */}
      <path
        d="M20,95 Q260,65 500,95"
        stroke="rgba(212,168,79,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Gate entrance — misty glow */}
      <ellipse cx="260" cy="260" rx="100" ry="60" fill="rgba(140,164,255,0.04)" />

      {/* Base pedestals */}
      <rect x="70" y="368" width="44" height="12" rx="2" fill="#8B6B20" fillOpacity="0.6" />
      <rect x="406" y="368" width="44" height="12" rx="2" fill="#8B6B20" fillOpacity="0.6" />

      {/* Rope (shimenawa) hanging between pillars */}
      <path
        d="M92,160 Q260,175 428,160"
        stroke="#8B6B20"
        strokeWidth="2.5"
        strokeDasharray="6,4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Gohei (zigzag paper streamers) hanging from rope */}
      <g opacity="0.4">
        <path d="M200,175 L196,185 L204,190 L196,200" stroke="#D7DBE0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M260,177 L256,187 L264,192 L256,202" stroke="#D7DBE0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M320,175 L316,185 L324,190 L316,200" stroke="#D7DBE0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// ─── LANTERN ─────────────────────────────────────────────────────────────────
interface LanternProps {
  style?: React.CSSProperties
  delay?: number
  size?: 'sm' | 'md'
}

function Lantern({ style, delay = 0, size = 'md' }: LanternProps) {
  const w = size === 'sm' ? 14 : 20
  const h = size === 'sm' ? 20 : 28
  const { discoverEasterEgg, unlockAchievement } = useShrineStore()
  const clickCount = useRef(0)

  const handleClick = () => {
    clickCount.current += 1
    if (clickCount.current >= 3) {
      discoverEasterEgg('lantern-wisdom')
      unlockAchievement('lantern-wisdom')
    }
  }

  return (
    <button
      style={{ ...style, cursor: 'none' }}
      className="flex flex-col items-center"
      onClick={handleClick}
      data-hoverable
      aria-label="Shrine lantern"
    >
      {/* String */}
      <div className="w-px bg-amber/30" style={{ height: size === 'sm' ? 20 : 30 }} />
      {/* Body */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 20 28"
        fill="none"
        style={{
          filter: `drop-shadow(0 0 ${size === 'sm' ? 6 : 12}px rgba(246,185,74,0.7))`,
          animation: `lanternGlow 2s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
        aria-hidden="true"
      >
        {/* Cap */}
        <rect x="5" y="1" width="10" height="3" rx="1" fill="#C8922A" />
        {/* Body */}
        <rect x="3" y="4" width="14" height="18" rx="4" fill="#F6B94A" fillOpacity="0.9" />
        {/* Ribs */}
        <line x1="7" y1="4" x2="7" y2="22" stroke="#C8922A" strokeWidth="0.8" opacity="0.5" />
        <line x1="10" y1="4" x2="10" y2="22" stroke="#C8922A" strokeWidth="0.8" opacity="0.5" />
        <line x1="13" y1="4" x2="13" y2="22" stroke="#C8922A" strokeWidth="0.8" opacity="0.5" />
        {/* Inner glow */}
        <rect x="5" y="6" width="10" height="14" rx="3" fill="rgba(255,255,200,0.3)" />
        {/* Bottom cap */}
        <rect x="5" y="22" width="10" height="3" rx="1" fill="#C8922A" />
        {/* Tassel */}
        <line x1="10" y1="25" x2="10" y2="28" stroke="#C8922A" strokeWidth="1" />
      </svg>
    </button>
  )
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

// Procedurally-defined stars (deterministic for SSR)
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: (((i * 137.508) % 100)),
  y: (((i * 97.321) % 60)),
  size: i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
  opacity: 0.2 + (i % 5) * 0.12,
  flicker: 1 + (i % 4) * 0.7,
  delay: (i % 8) * 0.4,
}))

const STONE_PATH = [
  { cx: 200, cy: 180, rx: 22, ry: 8 },
  { cx: 200, cy: 165, rx: 18, ry: 7 },
  { cx: 198, cy: 150, rx: 16, ry: 6 },
  { cx: 200, cy: 135, rx: 14, ry: 5 },
  { cx: 199, cy: 122, rx: 12, ry: 5 },
]
