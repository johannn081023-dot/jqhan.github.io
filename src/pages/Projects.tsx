import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { projects } from '../data'

const filters = ['All', 'AI', 'Python', 'SQL', 'Data', 'Business']

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.tags.includes(activeFilter))
  }, [activeFilter])

  return (
    <PageTransition>
      <main className="page">
        <section className="container-xl pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <p className="section-label mb-3">Selected Work</p>
            <h1
              className="font-display font-800 text-white mb-5"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              Systems with receipts.
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
              A focused set of projects and work systems across AI reasoning, data pipelines, dashboards, operations, and customer analytics.
            </p>
          </motion.div>
        </section>

        <section className="container-xl pb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveFilter(tag)}
                className={`min-h-10 rounded-lg border px-4 py-2 font-mono text-xs transition-all duration-200 ${
                  activeFilter === tag
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-text-secondary hover:border-border-bright hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section ref={ref} className="container-xl pb-24">
          <AnimatePresence mode="popLayout">
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4" layout>
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.42, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                  className="group card gradient-border relative flex min-h-[30rem] flex-col overflow-hidden p-6 md:p-8"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-44 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at top right, ${project.accent}22, transparent 64%)` }}
                    aria-hidden="true"
                  />

                  <div className="relative mb-7 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-lg border font-display text-sm font-800"
                        style={{ borderColor: `${project.accent}45`, background: `${project.accent}12`, color: project.accent }}
                      >
                        {project.code}
                      </div>
                      <div>
                        <p className="section-label mb-1">{project.kicker}</p>
                        <p className="font-mono text-2xs text-text-muted">{project.year}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-muted transition-all hover:border-border-bright hover:text-white"
                        >
                          <Github size={15} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 text-accent transition-all hover:bg-accent/10"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h2 className="relative font-display font-800 text-2xl text-white mb-4 leading-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="relative text-text-secondary text-sm md:text-base leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="relative mt-7 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-lg bg-border">
                      {project.metrics.map((metric) => (
                        <div key={metric} className="bg-primary/90 p-3">
                          <p className="font-mono text-2xs uppercase tracking-widest text-text-muted">{metric}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.lesson && (
                    <div className="relative mt-5 rounded-lg border border-border bg-surface-2 p-4">
                      <p className="font-mono text-2xs text-text-muted mb-2">Operating lesson</p>
                      <p className="text-sm leading-relaxed text-text-secondary">{project.lesson}</p>
                    </div>
                  )}

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="absolute bottom-6 right-6 text-text-muted opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                  />
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </PageTransition>
  )
}
