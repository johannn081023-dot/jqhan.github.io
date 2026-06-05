import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Share2 } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { writingPosts } from '../data'

export default function Article() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)
  const post = useMemo(() => writingPosts.find((item) => item.slug === slug), [slug])

  if (!post) return <Navigate to="/writing" replace />

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: post.title, text: post.excerpt, url })
      return
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <PageTransition>
      <main className="page">
        <article className="container-xl pt-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <Link to="/writing" className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors">
              <ArrowLeft size={14} />
              Back to writing
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="tag">{post.category}</span>
              <span className="font-mono text-2xs text-text-muted">{post.readTime} min read</span>
              <span className="font-mono text-2xs text-text-muted">{post.date}</span>
            </div>

            <h1
              className="font-display font-800 text-white mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.7rem)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              {post.title}
            </h1>

            <p className="text-xl leading-relaxed text-text-secondary mb-8">{post.excerpt}</p>

            <button type="button" onClick={share} className="btn-ghost mb-12">
              {copied ? <Check size={15} className="text-accent" /> : <Share2 size={15} />}
              {copied ? 'Copied link' : 'Share'}
            </button>

            <div className="prose-shell">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </article>
      </main>
    </PageTransition>
  )
}
