import type { Metadata, Viewport } from 'next'
import {
  Inter,
  Cormorant_Garamond,
  JetBrains_Mono,
  Noto_Serif_JP,
  Shippori_Mincho,
} from 'next/font/google'
import './globals.css'
import { ShrineProviders } from '@/components/providers/ShrineProviders'
import { KatanaCursor } from '@/components/cursor/KatanaCursor'
import { SakuraSystem } from '@/components/sakura/SakuraSystem'
import { PageTransition } from '@/components/transitions/PageTransition'
import { ShrineNav } from '@/components/nav/ShrineNav'
import { AchievementToast } from '@/components/achievements/AchievementToast'
import { ShrineJournal } from '@/components/achievements/ShrineJournal'
import { EasterEggSystem } from '@/components/easter-eggs/EasterEggSystem'

// ─── FONTS ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-noto-jp',
  display: 'swap',
  preload: false,
})

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-shippori',
  display: 'swap',
  preload: false,
})

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://johnpaulgiftson.com'),

  title: {
    default: 'The Shrine — John Paul Giftson',
    template: '%s | The Shrine',
  },
  description:
    'A digital shrine dedicated to curiosity, engineering, storytelling, and systems thinking. Built by John Paul Giftson — AI & ML Engineering student, data systems architect, and creative technologist.',

  keywords: [
    'John Paul Giftson',
    'AI Engineering',
    'Machine Learning',
    'Data Science',
    'University of Manitoba',
    'Software Engineering',
    'Systems Thinking',
    'Creative Technology',
    'Portfolio',
    'Digital Shrine',
  ],

  authors: [{ name: 'John Paul Giftson', url: 'https://johnpaulgiftson.com' }],
  creator: 'John Paul Giftson',
  publisher: 'John Paul Giftson',

  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://johnpaulgiftson.com',
    siteName: 'The Shrine',
    title: 'The Shrine — John Paul Giftson',
    description:
      'A digital shrine dedicated to curiosity, engineering, storytelling, and systems thinking.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Shrine — John Paul Giftson',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'The Shrine — John Paul Giftson',
    description:
      'A digital shrine dedicated to curiosity, engineering, storytelling, and systems thinking.',
    images: ['/og-image.png'],
    creator: '@johnpaulgiftson',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },

  manifest: '/manifest.json',

  alternates: {
    canonical: 'https://johnpaulgiftson.com',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0615',
  colorScheme: 'dark',
}

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'John Paul Giftson',
  url: 'https://johnpaulgiftson.com',
  description:
    'AI & Machine Learning Engineering student at the University of Manitoba. Building data systems, BI dashboards, Python pipelines, and experiments in agentic reasoning.',
  sameAs: [
    'https://github.com/johannn081023-dot',
    'https://www.linkedin.com/in/johnpaulgiftson',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Python',
    'SQL',
    'Business Intelligence',
    'Systems Thinking',
    'Creative Technology',
  ],
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Manitoba',
  },
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} ${notoSerifJP.variable} ${shipporiMincho.variable} lenis lenis-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-shrine-abyss text-silver overflow-x-hidden">
        <ShrineProviders>
          {/* Global ambient elements */}
          <SakuraSystem />
          <KatanaCursor />
          <PageTransition />

          {/* Navigation */}
          <ShrineNav />

          {/* Main content */}
          <main id="shrine-main" className="relative z-10">
            {children}
          </main>

          {/* Achievements & Easter Eggs */}
          <AchievementToast />
          <ShrineJournal />
          <EasterEggSystem />
        </ShrineProviders>
      </body>
    </html>
  )
}
