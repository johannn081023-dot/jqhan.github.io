import type { Metadata } from 'next'
import { SevenSwords } from '@/components/shrine/SevenSwords'

export const metadata: Metadata = {
  title: 'The Seven Swords',
  description:
    'Seven sword-personas debate every question. Only the strongest perspective survives.',
}

export default function SevenSwordsPage() {
  return <SevenSwords />
}
