'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShrineStore } from '@/lib/store/shrine-store'

const NAV_ITEMS = [
  { path: '/',             label: 'The Gate',         japanese: '門',    kanji: '門' },
  { path: '/journey',     label: 'The Journey',       japanese: '旅',    kanji: '旅' },
  { path: '/relics',      label: 'The Relics',        japanese: '遺物',  kanji: '物' },
  { path: '/scrolls',     label: 'The Scrolls',       japanese: '巻物',  kanji: '巻' },
  { path: '/seven-swords',label: 'Seven Swords',      japanese: '七刀',  kanji: '刀' },
  { path: '/exit',        label: 'The Exit',          japanese: '出口',  kanji: '出' },
]

export function ShrineNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleJournal, achievements } = useShrineStore()

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-600"
        style={{
          background: scrolled
            ? 'rgba(11, 6, 21, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(212, 168, 79, 0.08)'
            : '1px solid transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      >
        <div className="shrine-container flex items-center justify-between h-[72px]">

          {/* Logo / Shrine mark */}
          <Link href="/" className="flex items-center gap-3 group" data-hoverable>
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Torii icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer beam */}
                <rect x="2" y="6" width="24" height="2.5" rx="1" fill="#D4A84F" fillOpacity="0.9" />
                {/* Inner beam */}
                <rect x="5" y="10" width="18" height="2" rx="1" fill="#D4A84F" fillOpacity="0.7" />
                {/* Left pillar */}
                <rect x="6" y="8" width="2.5" height="18" rx="1" fill="#D4A84F" fillOpacity="0.8" />
                {/* Right pillar */}
                <rect x="19.5" y="8" width="2.5" height="18" rx="1" fill="#D4A84F" fillOpacity="0.8" />
              </svg>
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,168,79,0.25) 0%, transparent 70%)' }}
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase"
                style={{ color: '#D4A84F', fontFamily: 'var(--font-sans)' }}
              >
                The Shrine
              </span>
              <span
                className="text-xs"
                style={{ color: '#8A8E94', fontFamily: 'var(--font-japanese)' }}
              >
                神社
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Shrine navigation">
            {NAV_ITEMS.map((item, i) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative group flex flex-col items-center gap-0.5"
                  data-hoverable
                >
                  {/* Kanji above (revealed on hover) */}
                  <motion.span
                    className="text-xs absolute -top-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: '#D4A84F', fontFamily: 'var(--font-japanese)' }}
                  >
                    {item.kanji}
                  </motion.span>

                  <span
                    className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 ${
                      isActive ? 'text-silver-katana' : 'text-silver-dim hover:text-silver-bright'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active/hover underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to right, transparent, #D4A84F, transparent)'
                        : 'linear-gradient(to right, transparent, #F5F7FA, transparent)',
                    }}
                    initial={{ width: isActive ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right side: Journal button + mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Shrine Journal button */}
            <button
              onClick={toggleJournal}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 group"
              style={{
                border: '1px solid rgba(212, 168, 79, 0.2)',
                background: 'rgba(18, 10, 36, 0.6)',
              }}
              data-hoverable
              aria-label="Open shrine journal"
            >
              <span className="text-xs" style={{ fontFamily: 'var(--font-japanese)', color: '#D4A84F' }}>
                ⛩
              </span>
              {unlockedCount > 0 && (
                <span
                  className="text-2xs font-mono font-semibold"
                  style={{ color: '#D4A84F' }}
                >
                  {unlockedCount}
                </span>
              )}
              {/* Pulse on new achievement */}
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse-shrine"
                style={{
                  background: '#D4A84F',
                  display: unlockedCount > 0 ? 'block' : 'none',
                }}
              />
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              data-hoverable
            >
              <motion.span
                className="block h-px w-5 bg-silver-bright"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-5 bg-silver-bright"
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-5 bg-silver-bright"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'rgba(5, 3, 10, 0.96)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              {/* Torii mark */}
              <div
                className="text-5xl mb-4"
                style={{ fontFamily: 'var(--font-japanese)', color: '#D4A84F', opacity: 0.4 }}
              >
                ⛩
              </div>

              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.path
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.path}
                      className="flex items-center gap-4 group"
                      data-hoverable
                    >
                      <span
                        className="text-2xl w-10 text-center"
                        style={{ fontFamily: 'var(--font-japanese)', color: isActive ? '#D4A84F' : '#4A3F5C' }}
                      >
                        {item.kanji}
                      </span>
                      <div className="flex flex-col">
                        <span
                          className="text-lg font-medium tracking-wider"
                          style={{ color: isActive ? '#F5F7FA' : '#C9CDD2' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: '#8A8E94', fontFamily: 'var(--font-japanese)' }}
                        >
                          {item.japanese}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Divider */}
              <div className="line-gold w-32 mt-4" />
              <p
                className="text-xs tracking-widest text-center"
                style={{ color: '#4A3F5C', fontFamily: 'var(--font-japanese)' }}
              >
                好奇心は武器である
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
