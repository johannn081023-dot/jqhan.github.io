import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronDown, Database, GraduationCap, LineChart, Sparkles } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { profile, projects, writingPosts } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: i * 0.09 },
  }),
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animId = 0
    let time = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const spacing = window.innerWidth < 768 ? 48 : 62
      const cols = Math.ceil(window.innerWidth / spacing) + 1
      const rows = Math.ceil(window.innerHeight / spacing) + 1

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * spacing
          const py = y * spacing
          const dx = px - window.innerWidth * 0.5
          const dy = py - window.innerHeight * 0.42
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = Math.sqrt((window.innerWidth / 2) ** 2 + (window.innerHeight / 2) ** 2)
          const wave = Math.sin(dist / 120 - time) * 0.5 + 0.5
          const fade = Math.max(0, 1 - dist / maxDist)
          const opacity = wave * fade * 0.12

          ctx.beginPath()
          ctx.arc(px, py, 1.1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 184, 0, ${opacity})`
          ctx.fill()
        }
      }

      time += prefersReducedMotion ? 0 : 0.012
      animId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 520], [0, -70])
  const opacity = useTransform(scrollY, [0, 460], [1, 0])
  const lines = ['Systems that', 'learn under pressure.']

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-16">
      <GridBackground />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-primary to-transparent" />
      </div>

      <motion.div className="container-xl relative z-10" style={{ y, opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-12 lg:gap-16 items-end">
          <div>
            <motion.div
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 backdrop-blur-sm mb-8"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
            >
              <span className="status-dot" />
              <span className="font-mono text-2xs text-text-secondary tracking-widest uppercase">
                {profile.standing} / AI & ML Engineering / Winnipeg
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-800 leading-[0.94] mb-7 max-w-5xl"
              style={{ fontSize: 'clamp(2.85rem, 8.4vw, 8.4rem)' }}
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {lines.map((line, i) => (
                <motion.span key={line} className={`block ${i === 1 ? 'text-accent' : 'text-white'}`} variants={fadeUp} custom={i + 1}>
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="max-w-2xl text-lg md:text-xl text-text-secondary leading-relaxed mb-9"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
            >
              {profile.headline} I care about the quiet layer where data becomes judgement, tools become habits, and software starts shaping decisions.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:items-center"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
            >
              <Link to="/projects" className="btn-primary group justify-center">
                View selected work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/lab" className="btn-ghost group justify-center">
                Explore AI Lab
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          </div>

          <motion.aside
            className="card gradient-border p-5 md:p-6"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="section-label">Current Signal</p>
              <Sparkles size={16} className="text-accent" />
            </div>
            <div className="space-y-5">
              {[
                { icon: GraduationCap, label: 'University of Manitoba', value: `${profile.degree.replace('Bachelor of Science - ', '')}`, meta: `${profile.schoolYears} / GPA ${profile.gpa}` },
                { icon: LineChart, label: 'BI Internship', value: 'Automated dashboards for remote delivery data.', meta: 'Solara / 2026' },
                { icon: Database, label: 'Database Internship', value: 'SQL, schemas, and Python data pipelines.', meta: 'Bison Software / 2025' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-3">
                    <item.icon size={16} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-2xs uppercase tracking-widest text-text-muted">{item.label}</p>
                    <p className="mt-1 text-sm text-white leading-snug">{item.value}</p>
                    <p className="mt-1 font-mono text-2xs text-text-muted">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          className="absolute bottom-0 right-10 hidden lg:flex flex-col items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
        >
          <span className="font-mono text-2xs text-text-muted tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={14} className="text-text-muted" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const stats = [
    { value: profile.gpa, label: 'GPA' },
    { value: '2', suffix: '+', label: 'Data internships' },
    { value: '6', suffix: '+', label: 'Roles across tech and business' },
    { value: '1', label: 'Company founded' },
  ]

  return (
    <section ref={ref} className="container-xl py-16 md:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl bg-border">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-primary px-5 py-7 md:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="font-display font-800 text-4xl text-white">
              {stat.value}<span className="text-accent">{stat.suffix}</span>
            </div>
            <p className="mt-2 font-mono text-2xs uppercase tracking-widest text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function FeaturedProjects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const featured = projects.filter((project) => project.featured).slice(0, 3)

  return (
    <section ref={ref} className="container-xl section">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="section-label mb-3">Selected Work</p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-white">
              Proof, not decoration.
            </h2>
          </div>
          <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group">
            All projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              className="group card gradient-border relative flex min-h-[26rem] flex-col overflow-hidden p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="absolute inset-x-0 top-0 h-32 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse at top, ${project.accent}22, transparent 68%)` }}
                aria-hidden="true"
              />
              <div className="relative mb-8 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg border font-display text-sm font-800"
                  style={{ borderColor: `${project.accent}40`, background: `${project.accent}12`, color: project.accent }}
                >
                  {project.code}
                </div>
                <span className="font-mono text-2xs text-text-muted">{project.year}</span>
              </div>

              <p className="section-label mb-3">{project.kicker}</p>
              <h3 className="font-display font-700 text-xl text-white mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary flex-1">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs leading-relaxed text-text-muted">{project.lesson}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link to="/projects" className="btn-ghost text-sm">
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

function AboutTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="container-xl section border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="section-label mb-4">About John Paul</p>
          <h2 className="font-display font-800 text-3xl md:text-4xl text-white mb-6">
            Technical enough to build the system. Human enough to know why it matters.
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            John Paul is a third-year AI & Machine Learning Engineering student at the University of Manitoba with a Data Science foundation and hands-on experience in SQL, pipelines, BI dashboards, and software operations.
          </p>
          <p className="text-text-secondary leading-relaxed mb-8">
            The unusual part is the range: database internships, marketing analytics, technical support, and founding Snowaway Solutions. That mix gives the work a product sense that does not come from coursework alone.
          </p>
          <Link to="/about" className="btn-ghost inline-flex group">
            Read the story
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          {[
            { label: 'Programming', value: 'Python / Java / C++ / SQL' },
            { label: 'Data Systems', value: 'Relational DBs, ETL, dashboards' },
            { label: 'Business Layer', value: 'CRM, client acquisition, operations' },
            { label: 'AI Direction', value: 'Machine learning fundamentals and agentic reasoning' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="card p-5 min-h-[9rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.18 + i * 0.07 }}
            >
              <p className="section-label mb-3">{item.label}</p>
              <p className="text-white text-lg font-display font-700 leading-snug">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AILabCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="container-xl section">
      <motion.div
        className="relative overflow-hidden rounded-xl border border-border p-8 md:p-12 lg:p-16"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute inset-0 line-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,184,0,0.10),transparent_45%)]" aria-hidden="true" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5">
              <Sparkles size={13} className="text-accent" />
              <span className="font-mono text-2xs text-accent uppercase tracking-widest">Interactive flagship</span>
            </div>
            <h2 className="font-display font-800 text-3xl md:text-5xl text-white mb-5">
              Watch ideas compete for survival.
            </h2>
            <p className="max-w-2xl text-text-secondary text-lg leading-relaxed">
              The Evolutionary Consensus Engine turns reasoning into a visible system: multiple agents, separate lenses, confidence scores, eliminations, and a final synthesis.
            </p>
          </div>
          <div className="card p-5 bg-primary/70">
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">Run State</p>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            <div className="space-y-3">
              {['Question enters', 'Agents diverge', 'Scores surface', 'Weak claims drop', 'Consensus forms'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="font-mono text-2xs text-accent">0{i + 1}</span>
                  <span className="text-sm text-text-secondary">{step}</span>
                </div>
              ))}
            </div>
            <Link to="/lab" className="btn-primary mt-6 w-full justify-center group">
              Enter the lab
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function WritingPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const recent = writingPosts.slice(0, 2)

  return (
    <section ref={ref} className="container-xl section border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="section-label mb-3">Notebook</p>
            <h2 className="font-display font-800 text-3xl text-white">
              Working thoughts.
            </h2>
          </div>
          <Link to="/writing" className="hidden md:inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group">
            All writing
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-border">
          {recent.map((post, i) => (
            <motion.article
              key={post.id}
              className="group bg-primary px-5 py-6 md:px-6 md:py-7 hover:bg-surface-2 transition-colors"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link to={`/writing/${post.slug}`} className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="tag">{post.category}</span>
                    <span className="font-mono text-2xs text-text-muted">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-display font-700 text-lg text-white group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xs text-text-muted">{post.date}</span>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <Stats />
        <FeaturedProjects />
        <AboutTeaser />
        <AILabCTA />
        <WritingPreview />
      </main>
    </PageTransition>
  )
}
