import type { Metadata } from 'next'
import { TheScrolls } from '@/components/shrine/TheScrolls'

export const metadata: Metadata = {
  title: 'The Scrolls',
  description: 'Ancient manuscripts from the shrine. Writings on engineering, AI, systems thinking, and internet culture.',
}

export default function ScrollsPage() {
  return <TheScrolls />
}
