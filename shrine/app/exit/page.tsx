import type { Metadata } from 'next'
import { TheExit } from '@/components/shrine/TheExit'

export const metadata: Metadata = {
  title: 'The Exit',
  description: 'Leave the shrine. Take what you found with you.',
}

export default function ExitPage() {
  return <TheExit />
}
