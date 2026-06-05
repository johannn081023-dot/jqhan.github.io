'use client'

import { useMemo } from 'react'
import type { Season } from '@/lib/types/shrine'

interface SeasonConfig {
  season: Season
  particleColor: string[]
  particleType: 'sakura' | 'firefly' | 'maple' | 'snow'
  ambientColor: string
  skyGradient: string
  moonIntensity: number
  windStrength: number
}

export function useSeason(): SeasonConfig {
  return useMemo(() => {
    const month = new Date().getMonth()

    if (month >= 2 && month <= 4) {
      return {
        season: 'spring',
        particleColor: ['#FFB7C5', '#FFC8D6', '#FFE4EB', '#FF8FAB'],
        particleType: 'sakura',
        ambientColor: 'rgba(255, 183, 197, 0.06)',
        skyGradient: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1A0F28 0%, #0B0615 60%, #05030A 100%)',
        moonIntensity: 0.8,
        windStrength: 1.2,
      }
    }

    if (month >= 5 && month <= 7) {
      return {
        season: 'summer',
        particleColor: ['#F6B94A', '#FFD97D', '#FFF3B0', '#F2C96A'],
        particleType: 'firefly',
        ambientColor: 'rgba(246, 185, 74, 0.04)',
        skyGradient: 'radial-gradient(ellipse 80% 60% at 50% 0%, #120A20 0%, #0B0615 60%, #05030A 100%)',
        moonIntensity: 0.6,
        windStrength: 0.6,
      }
    }

    if (month >= 8 && month <= 10) {
      return {
        season: 'autumn',
        particleColor: ['#D4A84F', '#C84B2A', '#F6B94A', '#8B4513'],
        particleType: 'maple',
        ambientColor: 'rgba(212, 168, 79, 0.05)',
        skyGradient: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1A0C08 0%, #0D0508 60%, #05030A 100%)',
        moonIntensity: 0.9,
        windStrength: 1.5,
      }
    }

    return {
      season: 'winter',
      particleColor: ['#D7DBE0', '#C9CDD2', '#F5F7FA', '#B8CAFF'],
      particleType: 'snow',
      ambientColor: 'rgba(140, 164, 255, 0.04)',
      skyGradient: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0E0C1A 0%, #080614 60%, #05030A 100%)',
      moonIntensity: 1.0,
      windStrength: 0.8,
    }
  }, [])
}
