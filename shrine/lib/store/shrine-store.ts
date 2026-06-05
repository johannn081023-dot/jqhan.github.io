'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  Achievement,
  AchievementId,
  EasterEgg,
  ShrineJournalEntry,
  Season,
  CursorState,
  TransitionState,
} from '@/lib/types/shrine'

// ─── ACHIEVEMENTS DEFINITION ─────────────────────────────────────────────────
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'the-observer',
    name: 'The Observer',
    nameJP: '観察者',
    description: 'Visit every location within the shrine.',
    icon: '👁',
    rarity: 'common',
    unlocked: false,
    secret: false,
  },
  {
    id: 'petal-collector',
    name: 'Petal Collector',
    nameJP: '花びら収集家',
    description: 'Click 25 sakura petals drifting through the shrine.',
    icon: '🌸',
    rarity: 'common',
    unlocked: false,
    secret: false,
  },
  {
    id: 'meme-hunter',
    name: 'The Meme Hunter',
    nameJP: 'ミームハンター',
    description: 'Discover all hidden internet culture references.',
    icon: '🎭',
    rarity: 'rare',
    unlocked: false,
    secret: true,
  },
  {
    id: 'seventh-sword',
    name: 'The Seventh Sword',
    nameJP: '七番目の剣',
    description: 'Complete a full Seven Swords debate ritual.',
    icon: '⚔️',
    rarity: 'rare',
    unlocked: false,
    secret: false,
  },
  {
    id: 'spectator-mode',
    name: 'Spectator Mode',
    nameJP: '観客モード',
    description: 'Unlock the hidden monochrome spectator sequence.',
    icon: '🎬',
    rarity: 'rare',
    unlocked: false,
    secret: true,
  },
  {
    id: 'shrine-cat',
    name: 'The Shrine Cat',
    nameJP: '神社の猫',
    description: 'Find the shrine cat on every page.',
    icon: '🐱',
    rarity: 'rare',
    unlocked: false,
    secret: true,
  },
  {
    id: 'the-debugger',
    name: 'The Debugger',
    nameJP: 'デバッガー',
    description: 'Trigger the code-slice effect 50 times.',
    icon: '🔧',
    rarity: 'rare',
    unlocked: false,
    secret: false,
  },
  {
    id: 'brainrot-protocol',
    name: 'BRAINROT PROTOCOL',
    nameJP: '脳腐敗プロトコル',
    description: 'You found the code. The shrine has been compromised.',
    icon: '💀',
    rarity: 'legendary',
    unlocked: false,
    secret: true,
  },
  {
    id: 'nah-id-deploy',
    name: 'Nah, I\'d Deploy',
    nameJP: 'デプロイするしかない',
    description: 'Found the forbidden text hidden within the shrine walls.',
    icon: '🚀',
    rarity: 'legendary',
    unlocked: false,
    secret: true,
  },
  {
    id: 'domain-expansion',
    name: 'Domain Expansion: Merge Conflict',
    nameJP: '領域展開：マージコンフリクト',
    description: 'Clicked the cat enough times to trigger the expansion.',
    icon: '🌀',
    rarity: 'legendary',
    unlocked: false,
    secret: true,
  },
  {
    id: 'lantern-wisdom',
    name: 'Lantern Wisdom',
    nameJP: '提灯の知恵',
    description: 'Discovered the ancient proverb hidden within the lanterns.',
    icon: '🏮',
    rarity: 'rare',
    unlocked: false,
    secret: true,
  },
  {
    id: 'inner-sanctum',
    name: 'The Inner Sanctum',
    nameJP: '内部の聖域',
    description: 'You found what most will never see. The shrine reveals its deepest truths.',
    icon: '🗝️',
    rarity: 'mythic',
    unlocked: false,
    secret: true,
  },
  {
    id: 'master-of-curiosity',
    name: 'Master of Curiosity',
    nameJP: '好奇心の主',
    description: 'All secrets uncovered. All paths walked. The shrine is yours.',
    icon: '⛩️',
    rarity: 'mythic',
    unlocked: false,
    secret: false,
  },
]

// ─── SHRINE STATE ────────────────────────────────────────────────────────────
interface ShrineState {
  // Achievements
  achievements: Achievement[]
  unlockAchievement: (id: AchievementId) => void
  isAchievementUnlocked: (id: AchievementId) => boolean

  // Journal
  journalEntries: ShrineJournalEntry[]
  addJournalEntry: (entry: Omit<ShrineJournalEntry, 'timestamp'>) => void

  // Pages visited (for The Observer achievement)
  pagesVisited: Set<string>
  markPageVisited: (page: string) => void

  // Petal clicks (for Petal Collector)
  petalClickCount: number
  incrementPetalClicks: () => void

  // Cat found per page (for Shrine Cat)
  catFoundPages: Set<string>
  markCatFound: (page: string) => void

  // Slice count (for The Debugger)
  sliceCount: number
  incrementSliceCount: () => void

  // Easter eggs
  easterEggs: EasterEgg[]
  discoverEasterEgg: (id: string) => void

  // Season
  season: Season
  setSeason: (season: Season) => void

  // Brainrot mode
  brainrotActive: boolean
  toggleBrainrot: () => void

  // Spectator mode
  spectatorActive: boolean
  toggleSpectator: () => void

  // Shrine journal visibility
  journalOpen: boolean
  toggleJournal: () => void

  // Latest achievement toast
  latestAchievement: Achievement | null
  clearLatestAchievement: () => void

  // Global cursor state (for components to read)
  cursorState: CursorState
  setCursorState: (state: CursorState) => void

  // Page transition
  transitionState: TransitionState
  setTransitionState: (state: TransitionState) => void
}

// ─── STORE ───────────────────────────────────────────────────────────────────
export const useShrineStore = create<ShrineState>()(
  persist(
    (set, get) => ({
      // Achievements
      achievements: DEFAULT_ACHIEVEMENTS,

      unlockAchievement: (id) => {
        const { achievements, journalEntries } = get()
        const achievement = achievements.find((a) => a.id === id)
        if (!achievement || achievement.unlocked) return

        const updatedAchievements = achievements.map((a) =>
          a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
        )

        const newEntry: ShrineJournalEntry = {
          type: 'achievement',
          id,
          name: achievement.name,
          description: achievement.description,
          timestamp: new Date(),
        }

        // Check if Master of Curiosity should unlock
        const nonSecretAchievements = updatedAchievements.filter((a) => !a.secret)
        const allUnlocked = nonSecretAchievements.every((a) => a.unlocked)
        const finalAchievements = allUnlocked
          ? updatedAchievements.map((a) =>
              a.id === 'master-of-curiosity'
                ? { ...a, unlocked: true, unlockedAt: new Date() }
                : a
            )
          : updatedAchievements

        set({
          achievements: finalAchievements,
          journalEntries: [newEntry, ...journalEntries],
          latestAchievement: achievement,
        })
      },

      isAchievementUnlocked: (id) => {
        return get().achievements.find((a) => a.id === id)?.unlocked ?? false
      },

      // Journal
      journalEntries: [],
      addJournalEntry: (entry) => {
        set((s) => ({
          journalEntries: [{ ...entry, timestamp: new Date() }, ...s.journalEntries],
        }))
      },

      // Pages visited
      pagesVisited: new Set(),
      markPageVisited: (page) => {
        const { pagesVisited, unlockAchievement } = get()
        const updated = new Set(pagesVisited)
        updated.add(page)
        set({ pagesVisited: updated })
        const allPages = ['gate', 'journey', 'relics', 'scrolls', 'seven-swords', 'exit']
        if (allPages.every((p) => updated.has(p))) {
          unlockAchievement('the-observer')
        }
      },

      // Petal clicks
      petalClickCount: 0,
      incrementPetalClicks: () => {
        const { petalClickCount, unlockAchievement } = get()
        const newCount = petalClickCount + 1
        set({ petalClickCount: newCount })
        if (newCount >= 25) unlockAchievement('petal-collector')
      },

      // Cat found
      catFoundPages: new Set(),
      markCatFound: (page) => {
        const { catFoundPages, unlockAchievement } = get()
        const updated = new Set(catFoundPages)
        updated.add(page)
        set({ catFoundPages: updated })
        const allPages = ['gate', 'journey', 'relics', 'scrolls', 'seven-swords', 'exit']
        if (allPages.every((p) => updated.has(p))) {
          unlockAchievement('shrine-cat')
        }
      },

      // Slice count
      sliceCount: 0,
      incrementSliceCount: () => {
        const { sliceCount, unlockAchievement } = get()
        const newCount = sliceCount + 1
        set({ sliceCount: newCount })
        if (newCount >= 50) unlockAchievement('the-debugger')
      },

      // Easter eggs
      easterEggs: [],
      discoverEasterEgg: (id) => {
        const { easterEggs, addJournalEntry } = get()
        if (easterEggs.find((e) => e.id === id)?.discovered) return
        const updated = [...easterEggs]
        const existing = updated.find((e) => e.id === id)
        if (existing) {
          existing.discovered = true
          existing.discoveredAt = new Date()
        } else {
          updated.push({ id, trigger: id, discovered: true, discoveredAt: new Date() })
        }
        set({ easterEggs: updated })
        addJournalEntry({ type: 'easter-egg', id, name: id, description: 'Hidden discovery unlocked.' })
      },

      // Season — automatically derived
      season: (() => {
        const month = new Date().getMonth()
        if (month >= 2 && month <= 4) return 'spring'
        if (month >= 5 && month <= 7) return 'summer'
        if (month >= 8 && month <= 10) return 'autumn'
        return 'winter'
      })(),
      setSeason: (season) => set({ season }),

      // Brainrot mode
      brainrotActive: false,
      toggleBrainrot: () => {
        const { brainrotActive, unlockAchievement } = get()
        if (!brainrotActive) unlockAchievement('brainrot-protocol')
        set((s) => ({ brainrotActive: !s.brainrotActive }))
      },

      // Spectator mode
      spectatorActive: false,
      toggleSpectator: () => {
        const { spectatorActive, unlockAchievement } = get()
        if (!spectatorActive) unlockAchievement('spectator-mode')
        set((s) => ({ spectatorActive: !s.spectatorActive }))
      },

      // Journal
      journalOpen: false,
      toggleJournal: () => set((s) => ({ journalOpen: !s.journalOpen })),

      // Achievement toast
      latestAchievement: null,
      clearLatestAchievement: () => set({ latestAchievement: null }),

      // Cursor
      cursorState: 'idle',
      setCursorState: (state) => set({ cursorState: state }),

      // Transition
      transitionState: 'idle',
      setTransitionState: (state) => set({ transitionState: state }),
    }),
    {
      name: 'shrine-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        achievements: state.achievements,
        journalEntries: state.journalEntries,
        pagesVisited: Array.from(state.pagesVisited),
        petalClickCount: state.petalClickCount,
        catFoundPages: Array.from(state.catFoundPages),
        sliceCount: state.sliceCount,
        easterEggs: state.easterEggs,
      }),
      // Rehydrate Sets from arrays
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (Array.isArray(state.pagesVisited)) {
            state.pagesVisited = new Set(state.pagesVisited as unknown as string[])
          }
          if (Array.isArray(state.catFoundPages)) {
            state.catFoundPages = new Set(state.catFoundPages as unknown as string[])
          }
        }
      },
    }
  )
)
