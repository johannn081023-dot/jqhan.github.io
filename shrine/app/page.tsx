import type { Metadata } from 'next'
import { TheGate } from '@/components/shrine/TheGate'

export const metadata: Metadata = {
  title: 'The Gate — John Paul Giftson',
  description:
    'Step beyond the gate. A digital shrine of curiosity, engineering, and ideas worth surviving.',
}

export default function GatePage() {
  return <TheGate />
}
