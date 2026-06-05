/* ═══════════════════════════════════════════════════════════════════════════
   THE SHRINE — Core Type Definitions
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export type ShrinePage = 'gate' | 'journey' | 'relics' | 'scrolls' | 'seven-swords' | 'exit'

export interface ShrineLocation {
  id: ShrinePage
  path: string
  label: string       // English
  japanese: string    // 日本語
  kanji: string       // Single character or short kanji
  description: string
  icon: string        // Emoji or unicode symbol
}

// ─── SAKURA SYSTEM ────────────────────────────────────────────────────────────
export interface SakuraPetal {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number
  wobble: number
  wobbleSpeed: number
  wobbleOffset: number
  layer: 1 | 2 | 3 // Depth layer for parallax
  color: string
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

// ─── CURSOR SYSTEM ────────────────────────────────────────────────────────────
export type CursorState = 'idle' | 'hover' | 'click' | 'slash' | 'special' | 'text'

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────
export interface Achievement {
  id: string
  name: string
  nameJP: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'legendary' | 'mythic'
  unlocked: boolean
  unlockedAt?: Date
  secret: boolean
}

export type AchievementId =
  | 'the-observer'
  | 'petal-collector'
  | 'meme-hunter'
  | 'seventh-sword'
  | 'spectator-mode'
  | 'shrine-cat'
  | 'the-debugger'
  | 'master-of-curiosity'
  | 'brainrot-protocol'
  | 'nah-id-deploy'
  | 'domain-expansion'
  | 'lantern-wisdom'
  | 'inner-sanctum'

// ─── EASTER EGGS ─────────────────────────────────────────────────────────────
export interface EasterEgg {
  id: string
  trigger: string
  discovered: boolean
  discoveredAt?: Date
}

// ─── SEVEN SWORDS ─────────────────────────────────────────────────────────────
export type SwordPersona =
  | 'strategist'
  | 'scholar'
  | 'engineer'
  | 'contrarian'
  | 'creator'
  | 'observer'
  | 'pragmatist'

export interface Sword {
  id: SwordPersona
  name: string
  title: string
  titleJP: string
  description: string
  color: string
  glowColor: string
  icon: string
  perspective?: string  // Generated response
  eliminated: boolean
  eliminationRound?: number
  score?: number
}

export interface SwordsDebate {
  question: string
  rounds: SwordsRound[]
  winner?: SwordPersona
  finalAnswer?: string
  status: 'idle' | 'generating' | 'debating' | 'eliminating' | 'complete'
}

export interface SwordsRound {
  roundNumber: number
  responses: Record<SwordPersona, string>
  eliminated: SwordPersona[]
  reasoning: string
}

// ─── PROJECTS / RELICS ───────────────────────────────────────────────────────
export interface Relic {
  id: string
  title: string
  subtitle: string
  era: string          // Year or era description
  type: 'artifact' | 'scroll' | 'rune' | 'crystal' | 'blade'
  status: 'sealed' | 'discovered' | 'legendary'
  description: string
  longDescription: string
  tags: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  screenshots?: string[]
  lessons: string[]
  failures: string[]
  futureDirections: string[]
  color: string
  featured: boolean
}

// ─── SCROLLS / WRITING ───────────────────────────────────────────────────────
export interface Scroll {
  slug: string
  title: string
  titleJP?: string
  description: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  readingTime: number // minutes
  featured: boolean
  draft: boolean
}

// ─── SHRINE JOURNAL ──────────────────────────────────────────────────────────
export interface ShrineJournalEntry {
  type: 'achievement' | 'discovery' | 'easter-egg' | 'exploration'
  id: string
  name: string
  description: string
  timestamp: Date
}

// ─── PAGE TRANSITION ─────────────────────────────────────────────────────────
export type TransitionState = 'idle' | 'exit' | 'enter' | 'complete'

export interface PageTransitionConfig {
  duration: number
  type: 'katana-slash' | 'fade' | 'scroll-reveal'
}
