import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Writing', path: '/writing' },
  { label: 'AI Lab', path: '/lab', accent: true },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(31,31,31,0.8)' : '1px solid transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      >
        <nav className="container-xl h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              className="relative w-8 h-8 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 border border-border-bright rounded-lg flex items-center justify-center bg-surface group-hover:border-accent/40 transition-colors duration-300">
                <span className="font-display font-800 text-xs text-white leading-none">JPG</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            </motion.div>
            <div className="hidden md:block">
              <span className="font-display font-700 text-sm text-white">John Paul Giftson</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 font-sans text-sm transition-colors duration-200 rounded-lg
                      ${link.accent
                        ? 'text-accent hover:text-accent border border-accent/20 hover:border-accent/40 hover:bg-accent/5'
                        : isActive
                        ? 'text-white'
                        : 'text-text-secondary hover:text-white'
                      }`}
                  >
                    {isActive && !link.accent && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-surface-3 border border-border"
                        layoutId="nav-active"
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] bg-primary/95 backdrop-blur-xl flex flex-col pt-20 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-2 mt-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center py-4 border-b border-border font-display text-2xl font-600 transition-colors
                      ${link.accent ? 'text-accent' : 'text-white hover:text-accent'}`}
                  >
                    <span className="font-mono text-text-muted text-sm mr-4">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto mb-12">
              <p className="section-label mb-3">Status</p>
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="font-mono text-xs text-text-secondary">Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
