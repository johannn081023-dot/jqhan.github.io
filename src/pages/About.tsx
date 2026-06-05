import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Sparkles, Zap } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { experience, profile, skillGroups } from '../data'

function SectionHeader({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="section-label mb-3">{label}</p>
      <h2 className="font-display font-800 text-3xl md:text-4xl text-white">{title}</h2>
      {copy && <p className="mt-4 text-text-secondary leading-relaxed">{copy}</p>}
    </div>
  )
}

function HeroSection() {
  return (
    <section className="container-xl pt-28 pb-16 md:pt-36 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-12 items-end"
      >
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <MapPin size={14} className="text-text-muted" />
              <span className="font-mono text-xs">{profile.location}</span>
            </div>
            <span className="h-px w-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="font-mono text-xs text-text-secondary">Available for internships and collaborations</span>
            </div>
          </div>

          <h1
            className="font-display font-800 text-white mb-6"
            style={{ fontSize: 'clamp(2.7rem, 6vw, 5.8rem)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
          >
            John Paul<br />
            <span className="text-accent">Giftson.</span>
          </h1>

          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-5">
            I am a third-year AI & Machine Learning Engineering student at the University of Manitoba with a Data Science foundation and a builder's bias toward systems that can survive real conditions.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
            My path runs through BI dashboards, relational databases, Python data pipelines, software operations, customer analytics, and a service business I founded from scratch. The pattern is simple: understand the system, make it visible, then make it work better.
          </p>
        </div>

        <div className="card gradient-border p-5 md:p-6">
          <p className="section-label mb-5">Snapshot</p>
          <div className="space-y-4">
            {[
              { icon: GraduationCap, label: 'Education', value: profile.degree, meta: `${profile.schoolYears} / ${profile.standing}` },
              { icon: Zap, label: 'Technical Core', value: 'Python, SQL, Java, C++, machine learning fundamentals', meta: 'Data pipelines and dashboards' },
              { icon: Briefcase, label: 'Operating Range', value: 'Intern, technician, consultant, founder-operator', meta: 'Tech, business, and analytics' },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-3">
                  <item.icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-2xs uppercase tracking-widest text-text-muted">{item.label}</p>
                  <p className="mt-1 text-sm text-white leading-snug">{item.value}</p>
                  <p className="mt-1 font-mono text-2xs text-text-muted">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function PhilosophySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const notes = [
    {
      title: 'Data should become decisions',
      copy: 'Dashboards, pipelines, and reports are only valuable when they change what a team can see and act on.',
    },
    {
      title: 'AI needs operational taste',
      copy: 'The interesting systems are not just clever. They are understandable, observable, and useful inside messy human workflows.',
    },
    {
      title: 'Business is systems training',
      copy: 'Running Snowaway taught scheduling, trust, cash flow, customer memory, and the cost of vague processes.',
    },
  ]

  return (
    <section ref={ref} className="container-xl section border-t border-border">
      <SectionHeader
        label="Operating Principles"
        title="The through-line is systems thinking."
        copy="Different roles, same habit: map the moving parts, find the signal, and build something sturdy enough to be used."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map((note, i) => (
          <motion.div
            key={note.title}
            className="card p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <Sparkles size={16} className="text-accent mb-5" />
            <h3 className="font-display font-700 text-white text-lg mb-3">{note.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{note.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section ref={ref} className="container-xl section border-t border-border">
      <SectionHeader
        label="Experience"
        title="Work that connects data, operations, and people."
        copy="The resume matters, but the deeper signal is range: technical systems, business intelligence, customer data, and real service operations."
      />

      <div className="relative">
        <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />

        <div className="flex flex-col gap-8">
          {experience.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.48, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
              className="relative pl-8 md:pl-10"
            >
              <div className="absolute left-0 top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border bg-surface">
                <div className={`h-2 w-2 rounded-full ${job.current ? 'bg-accent' : 'bg-border-bright'}`} />
              </div>

              <div className="card p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display font-700 text-white text-lg">{job.role}</h3>
                    <p className="text-accent text-sm font-mono">{job.company}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="font-mono text-xs text-text-muted">{job.period}</p>
                    <p className="font-mono text-2xs text-text-muted">{job.location}</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {job.tags && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {job.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="container-xl section border-t border-border">
      <SectionHeader label="Education" title="AI and ML Engineering, grounded in Data Science." />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="card gradient-border p-6 md:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-7">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                <GraduationCap size={19} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-700 text-white text-xl">{profile.school}</h3>
                <p className="text-accent font-mono text-sm">Winnipeg, Manitoba, Canada</p>
              </div>
            </div>
            <p className="text-white font-display font-600 text-lg max-w-3xl">{profile.degree}</p>
          </div>
          <div className="lg:text-right shrink-0">
            <p className="font-mono text-sm text-text-secondary">{profile.schoolYears}</p>
            <p className="font-mono text-xs text-text-muted">{profile.standing}</p>
            <div className="mt-3 inline-block rounded-lg border border-accent/20 bg-accent/5 px-3 py-1.5">
              <span className="font-mono text-sm text-accent font-700">GPA {profile.gpa}</span>
            </div>
          </div>
        </div>

        <div className="hr mb-6" />

        <div>
          <p className="section-label mb-3">Relevant Coursework</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Calculus',
              'Statistics',
              'Machine Learning Fundamentals',
              'Introduction to Python',
              'Introduction to Java & C++',
              'Data Science Foundation',
            ].map((course) => (
              <span key={course} className="tag">{course}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface-2 p-4">
          <p className="text-text-secondary text-sm leading-relaxed">
            Transitioned into AI & Machine Learning Engineering after completing the first two years with a focus on Data Science, bringing statistical and data workflow instincts into the engineering track.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="container-xl section border-t border-border">
      <SectionHeader label="Skills" title="A practical technical stack." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(skillGroups).map(([category, items], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: ci * 0.08 }}
            className="card p-6"
          >
            <p className="section-label mb-4">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.28, delay: ci * 0.08 + si * 0.03 }}
                  className="rounded-lg border border-border bg-surface-3 px-3 py-1.5 font-mono text-xs text-text-secondary transition-all hover:border-accent/30 hover:text-white"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function About() {
  return (
    <PageTransition>
      <main className="page">
        <HeroSection />
        <PhilosophySection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
      </main>
    </PageTransition>
  )
}
