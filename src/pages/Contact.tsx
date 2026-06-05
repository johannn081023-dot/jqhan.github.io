import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, Send, MapPin, CheckCircle } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { profile } from '../data'

const socials = [
  { label: 'GitHub', href: 'https://github.com/johannn081023-dot', icon: Github, handle: '@johannn081023-dot' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/johnpaulgiftson', icon: Linkedin, handle: '/johnpaulgiftson' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, handle: profile.email },
  { label: 'Business', href: `mailto:${profile.businessEmail}`, icon: Mail, handle: profile.businessEmail },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, wire up to Formspree, EmailJS, or similar
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`
    setSubmitted(true)
  }

  return (
    <PageTransition>
      <main className="page">
        {/* Header */}
        <section className="container-xl pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="section-label mb-3">Reach out</p>
            <h1
              className="font-display font-800 text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Let's talk.
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Whether it's an internship, collaboration, data project, or a conversation about intelligent systems - I'm open.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="status-dot" />
              <span className="font-mono text-xs text-text-secondary">Available for opportunities · {profile.location}</span>
            </div>
          </motion.div>
        </section>

        <section ref={ref} className="container-xl pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {/* Left: form */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-8 text-center"
                >
                  <CheckCircle size={36} className="text-accent mx-auto mb-4" />
                  <h3 className="font-display font-700 text-white text-xl mb-2">Message Sent</h3>
                  <p className="text-text-secondary text-sm">Your email client should have opened. If not, email me directly at {profile.email}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="section-label block mb-2">{label}</label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-white placeholder-text-muted font-sans text-sm focus:border-accent/50 focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="section-label block mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me what's on your mind..."
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-white placeholder-text-muted font-sans text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary justify-center group">
                    Send message
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: info */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Location */}
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg border border-border bg-surface-3 flex items-center justify-center">
                    <MapPin size={14} className="text-accent" />
                  </div>
                  <p className="section-label">Location</p>
                </div>
                <p className="text-white font-display font-600">Winnipeg, Manitoba</p>
                <p className="text-text-secondary text-sm">Canada · UTC-6</p>
              </div>

              {/* Socials */}
              <div className="card p-5">
                <p className="section-label mb-4">Connect</p>
                <div className="flex flex-col gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 py-2 px-3 rounded-lg border border-transparent hover:border-border hover:bg-surface-3 transition-all duration-200"
                    >
                      <s.icon size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                      <div>
                        <div className="text-sm text-white font-600 font-display">{s.label}</div>
                        <div className="font-mono text-2xs text-text-muted">{s.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response note */}
              <div className="p-4 rounded-xl border border-dashed border-border bg-surface/40">
                <p className="font-mono text-2xs text-text-muted mb-1">Response time</p>
                <p className="text-text-secondary text-sm">I typically respond within 24–48 hours.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
