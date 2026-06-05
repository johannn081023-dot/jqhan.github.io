import type { Metadata } from 'next'
import { TheRelics } from '@/components/shrine/TheRelics'

export const metadata: Metadata = {
  title: 'The Relics',
  description: 'Legendary artifacts recovered from previous journeys. Each project is a sealed scroll.',
}

export default function RelicsPage() {
  return <TheRelics />
}
