import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Writing from './pages/Writing'
import Article from './pages/Article'
import AILab from './pages/AILab'
import Contact from './pages/Contact'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Article />} />
          <Route path="/lab" element={<AILab />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      {/* Noise overlay — film grain */}
      <div className="noise-overlay" aria-hidden="true" />
      {/* Custom cursor — desktop only */}
      <CustomCursor />
      <AppRoutes />
    </HashRouter>
  )
}
