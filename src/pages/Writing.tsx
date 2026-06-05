import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Clock, ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { writingPosts } from '../data'

export default function Writing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <PageTransition>
      <main className="page">
        {/* Header */}
        <section className="container-xl pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-2xl"
          >
            <p className="section-label mb-3">Notebook</p>
            <h1
              className="font-display font-800 text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Writing
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Essays, frameworks, and observations at the intersection of AI, data, and the human systems around them.
              I write to think clearly.
            </p>
          </motion.div>
        </section>

        {/* Articles */}
        <section ref={ref} className="container-xl pb-24">
          <div className="max-w-3xl">
            {writingPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className="group border-b border-border py-8 last:border-0"
              >
                <Link to={`/writing/${post.slug}`} className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="tag">{post.category}</span>
                      <div className="flex items-center gap-1 text-text-muted">
                        <Clock size={11} />
                        <span className="font-mono text-2xs">{post.readTime} min read</span>
                      </div>
                      <span className="font-mono text-2xs text-text-muted">{post.date}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-700 text-white text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    {/* Read link */}
                    <div className="flex items-center gap-2 text-sm text-text-muted group-hover:text-accent transition-colors duration-200">
                      <span className="font-mono text-xs">Read essay</span>
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 max-w-3xl"
          >
            <div className="p-6 rounded-xl border border-border border-dashed bg-surface/50 text-center">
              <p className="font-mono text-xs text-text-muted mb-1">More essays in progress</p>
              <p className="text-text-secondary text-sm">
                Writing is how I interrogate ideas. More coming soon.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  )
}
