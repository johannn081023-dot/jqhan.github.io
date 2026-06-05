'use client'

import { useEffect } from 'react'
import { useLenisInit } from '@/lib/hooks/use-lenis'
import { useShrineStore } from '@/lib/store/shrine-store'

interface ShrineProvidersProps {
  children: React.ReactNode
}

export function ShrineProviders({ children }: ShrineProvidersProps) {
  useLenisInit()

  const { setSeason, brainrotActive, spectatorActive } = useShrineStore()

  // Keep season in sync on mount
  useEffect(() => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) setSeason('spring')
    else if (month >= 5 && month <= 7) setSeason('summer')
    else if (month >= 8 && month <= 10) setSeason('autumn')
    else setSeason('winter')
  }, [setSeason])

  // Brainrot / spectator mode class injection
  useEffect(() => {
    if (brainrotActive) {
      document.documentElement.classList.add('brainrot-mode')
    } else {
      document.documentElement.classList.remove('brainrot-mode')
    }
  }, [brainrotActive])

  useEffect(() => {
    if (spectatorActive) {
      document.documentElement.classList.add('spectator-mode')
    } else {
      document.documentElement.classList.remove('spectator-mode')
    }
  }, [spectatorActive])

  return <>{children}</>
}
