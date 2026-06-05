import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return {
    title,
    description: 'A scroll from the shrine — ideas worth surviving.',
  }
}

export default async function ScrollPage({ params }: Props) {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-shrine-abyss pt-24 pb-24 flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: '#D4A84F', fontFamily: 'var(--font-japanese)' }}
        >
          巻物
        </p>

        <h1
          className="text-4xl md:text-5xl mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            background: 'linear-gradient(135deg, #F5F7FA 0%, #D4A84F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')}
        </h1>

        <div
          className="w-24 h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(to right, transparent, #D4A84F, transparent)' }}
        />

        <p
          className="text-base leading-relaxed mb-12"
          style={{ color: '#8A8E94', fontFamily: 'var(--font-sans)' }}
        >
          This scroll is still being written. Return when the next moon rises.
        </p>

        <Link
          href="/scrolls"
          className="text-xs tracking-widest uppercase transition-colors duration-300"
          style={{ color: '#4A3F5C' }}
          data-hoverable
        >
          ← Back to the Scrolls
        </Link>
      </div>
    </div>
  )
}
