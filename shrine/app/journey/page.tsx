import type { Metadata } from 'next'
import { TheJourney } from '@/components/shrine/TheJourney'

export const metadata: Metadata = {
  title: 'The Journey',
  description:
    'A pilgrimage through curiosity, code, and craft. The story of John Paul Giftson.',
}

export default function JourneyPage() {
  return <TheJourney />
}
