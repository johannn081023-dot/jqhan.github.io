import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { profile } from '../../data'

const links = {
  nav: [
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Writing', to: '/writing' },
    { label: 'AI Lab', to: '/lab' },
    { label: 'Contact', to: '/contact' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/johannn081023-dot', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/johnpaulgiftson', icon: Linkedin },
    { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-20">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="w-10 h-10 border border-border-bright rounded-xl flex items-center justify-center bg-surface hover:border-accent/40 transition-colors">
                <span className="font-display font-800 text-sm text-white">JPG</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              AI & ML Engineering student building intelligent systems at the University of Manitoba.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="status-dot" />
              <span className="font-mono text-2xs text-text-muted">{profile.location} - Available</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="section-label mb-4">Navigate</p>
            <ul className="flex flex-col gap-2">
              {links.nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-text-secondary text-sm hover:text-white transition-colors hover-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="section-label mb-4">Connect</p>
            <ul className="flex flex-col gap-3">
              {links.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-text-secondary text-sm hover:text-white transition-colors group"
                  >
                    <s.icon size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                    {s.label}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="hr" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8">
          <p className="font-mono text-2xs text-text-muted">
            © {year} John Paul Giftson. Built with React, Vite & Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-2xs text-text-muted">
              {profile.school} · GPA {profile.gpa}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
