import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Lost in the Shrine',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: '#0B0615' }}>
      <p
        className="text-8xl mb-4 select-none"
        style={{ fontFamily: 'var(--font-japanese)', color: '#2A1F3A' }}
      >
        迷
      </p>
      <h1
        className="text-4xl md:text-5xl mb-3"
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#D7DBE0' }}
      >
        Lost in the Shrine
      </h1>
      <p className="text-sm text-silver-dim/60 mb-10 max-w-sm">
        This path does not exist — or perhaps it has not been forged yet.
        The shrine has many hidden routes.
      </p>
      <Link
        href="/"
        className="text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-300"
        style={{
          border: '1px solid rgba(212,168,79,0.2)',
          color: '#D4A84F',
        }}
        data-hoverable
      >
        Return to the Gate →
      </Link>
    </div>
  )
}
