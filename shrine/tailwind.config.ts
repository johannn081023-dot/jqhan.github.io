import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── SHRINE COLOR SYSTEM ────────────────────────────────────────────
      colors: {
        // Primary Backgrounds — deep midnight shrine atmosphere
        shrine: {
          void:     '#050505', // shadow depth
          abyss:    '#080808', // primary bg
          deep:     '#111111', // secondary bg layer
          veil:     '#161616', // tertiary bg layer
          surface:  '#1C1C1C', // elevated surfaces
          overlay:  '#242424', // overlays, modals
        },
        // Typography — matte silver
        silver: {
          dim:      '#8A8E94',
          muted:    '#A8ACB2',
          DEFAULT:  '#C9CDD2',
          bright:   '#D7DBE0',
          katana:   '#F5F7FA', // highlights, interactive
        },
        // Emotional accents
        sakura: {
          pale:     '#FFE4EB',
          DEFAULT:  '#FFC8D6',
          bloom:    '#FFB7C5',
          deep:     '#FF8FAB',
        },
        gold: {
          dim:      '#8B6B20',
          muted:    '#B08830',
          DEFAULT:  '#D4A84F',
          bright:   '#F2C96A',
          shrine:   '#FFD97D', // rare discoveries
        },
        amber: {
          dim:      '#C48A20',
          DEFAULT:  '#F6B94A',
          bright:   '#FFCC70',
        },
        moonlight: {
          dim:      '#4A5FCC',
          DEFAULT:  '#8CA4FF',
          bright:   '#B8CAFF',
          aurora:   '#C5D4FF',
        },
        jade: {
          dim:      '#3D9E7A',
          DEFAULT:  '#7FD6B2',
          bright:   '#A8E8CF',
        },
        crimson: {
          dim:      '#7A2020',
          DEFAULT:  '#B33A3A',
          bright:   '#D94F4F',
          seal:     '#FF6B6B',
        },
      },

      // ─── TYPOGRAPHY ────────────────────────────────────────────────────
      fontFamily: {
        sans:       ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display:    ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:       ['var(--font-jetbrains)', 'Menlo', 'monospace'],
        japanese:   ['var(--font-noto-jp)', 'serif'],
        calligraphy:['var(--font-noto-jp)', 'serif'],
      },
      fontSize: {
        '2xs':   ['0.625rem', { lineHeight: '1rem' }],
        xs:      ['0.75rem',  { lineHeight: '1.125rem' }],
        sm:      ['0.875rem', { lineHeight: '1.375rem' }],
        base:    ['1rem',     { lineHeight: '1.75rem' }],
        lg:      ['1.125rem', { lineHeight: '1.875rem' }],
        xl:      ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl':   ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':   ['1.875rem', { lineHeight: '2.375rem' }],
        '4xl':   ['2.25rem',  { lineHeight: '2.75rem' }],
        '5xl':   ['3rem',     { lineHeight: '3.5rem' }],
        '6xl':   ['3.75rem',  { lineHeight: '4.25rem' }],
        '7xl':   ['4.5rem',   { lineHeight: '5rem' }],
        '8xl':   ['6rem',     { lineHeight: '6.5rem' }],
        '9xl':   ['8rem',     { lineHeight: '8.5rem' }],
        'shrine':['clamp(3rem,8vw,7rem)', { lineHeight: '1.05' }],
        'gate':  ['clamp(4rem,12vw,10rem)', { lineHeight: '1' }],
      },

      // ─── SPACING ───────────────────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '88':  '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ─── BORDER RADIUS ─────────────────────────────────────────────────
      borderRadius: {
        '4xl':  '2rem',
        '5xl':  '2.5rem',
        'seal': '50%',
      },

      // ─── SHADOWS ───────────────────────────────────────────────────────
      boxShadow: {
        'shrine':       '0 0 40px rgba(212, 168, 79, 0.15)',
        'shrine-lg':    '0 0 80px rgba(212, 168, 79, 0.25)',
        'sakura':       '0 0 20px rgba(255, 183, 197, 0.3)',
        'moonlight':    '0 0 30px rgba(140, 164, 255, 0.2)',
        'katana':       '0 0 2px rgba(245, 247, 250, 0.8), 0 0 10px rgba(245, 247, 250, 0.3)',
        'glow-gold':    '0 0 15px rgba(212, 168, 79, 0.5), 0 0 40px rgba(212, 168, 79, 0.2)',
        'glow-sakura':  '0 0 15px rgba(255, 183, 197, 0.5), 0 0 40px rgba(255, 183, 197, 0.2)',
        'glow-moon':    '0 0 15px rgba(140, 164, 255, 0.5), 0 0 40px rgba(140, 164, 255, 0.2)',
        'inner-shrine': 'inset 0 1px 0 rgba(212, 168, 79, 0.1), inset 0 -1px 0 rgba(0,0,0,0.3)',
      },

      // ─── BACKGROUND GRADIENTS ──────────────────────────────────────────
      backgroundImage: {
        'shrine-gradient':     'radial-gradient(ellipse 80% 60% at 50% 0%, #170F30 0%, #0B0615 60%, #05030A 100%)',
        'shrine-radial':       'radial-gradient(circle at center, #170F30 0%, #0B0615 50%, #05030A 100%)',
        'gate-sky':            'linear-gradient(to bottom, #05030A 0%, #0B0615 30%, #120A24 60%, #170F30 100%)',
        'gold-shimmer':        'linear-gradient(105deg, transparent 40%, rgba(212,168,79,0.3) 50%, transparent 60%)',
        'katana-edge':         'linear-gradient(to right, transparent, #F5F7FA, transparent)',
        'sakura-veil':         'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(255,183,197,0.08) 0%, transparent 70%)',
        'moonlight-veil':      'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(140,164,255,0.08) 0%, transparent 60%)',
        'torii-gradient':      'linear-gradient(to bottom, #D4A84F 0%, #C8922A 50%, #B87A18 100%)',
        'scroll-paper':        'linear-gradient(to bottom, #1A1228 0%, #140E20 50%, #1A1228 100%)',
      },

      // ─── ANIMATIONS ────────────────────────────────────────────────────
      animation: {
        // Entrance
        'fade-in':         'fadeIn 0.6s ease forwards',
        'fade-up':         'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-down':       'fadeDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':        'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-in-left':   'slideInLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-in-right':  'slideInRight 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        // Ambient
        'float':           'float 6s ease-in-out infinite',
        'float-slow':      'float 10s ease-in-out infinite',
        'sway':            'sway 8s ease-in-out infinite',
        'pulse-shrine':    'pulseShrine 4s ease-in-out infinite',
        'shimmer':         'shimmer 2.5s linear infinite',
        'shrine-flicker':  'shrineFlicker 3s ease-in-out infinite',
        // Sakura
        'petal-fall':      'petalFall linear infinite',
        'petal-drift':     'petalDrift ease-in-out infinite',
        // Katana
        'katana-slash':    'katanaSlash 0.3s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'blade-gleam':     'bladeGleam 0.8s ease forwards',
        'slice-reveal':    'sliceReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        // Seals
        'seal-crack':      'sealCrack 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'seal-glow':       'sealGlow 2s ease-in-out infinite',
        // Text
        'text-reveal':     'textReveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'char-in':         'charIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        // Torii
        'torii-emerge':    'toriiEmerge 2s cubic-bezier(0.16,1,0.3,1) forwards',
        'lantern-glow':    'lanternGlow 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:       { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeDown:     { from: { opacity: '0', transform: 'translateY(-24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:      { from: { opacity: '0', transform: 'scale(0.9)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideInLeft:  { from: { opacity: '0', transform: 'translateX(-32px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(32px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        float:        { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        sway:         { '0%,100%': { transform: 'rotate(-2deg)' }, '50%': { transform: 'rotate(2deg)' } },
        pulseShrine:  { '0%,100%': { opacity: '0.6', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.02)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        shrineFlicker:{ '0%,100%': { opacity: '1' }, '92%': { opacity: '1' }, '93%': { opacity: '0.8' }, '94%': { opacity: '1' }, '96%': { opacity: '0.9' }, '97%': { opacity: '1' } },
        petalFall:    { '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' }, '10%': { opacity: '1' }, '90%': { opacity: '0.8' }, '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' } },
        petalDrift:   { '0%,100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(30px)' } },
        katanaSlash:  { '0%': { transform: 'scaleX(0) translateX(-100%)', opacity: '0' }, '50%': { opacity: '1' }, '100%': { transform: 'scaleX(1) translateX(0)', opacity: '0' } },
        bladeGleam:   { '0%': { backgroundPosition: '-200% 0', opacity: '0' }, '30%': { opacity: '1' }, '100%': { backgroundPosition: '200% 0', opacity: '0' } },
        sliceReveal:  { '0%': { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }, '100%': { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' } },
        sealCrack:    { '0%': { transform: 'scale(1) rotate(0deg)' }, '30%': { transform: 'scale(1.1) rotate(-3deg)' }, '60%': { transform: 'scale(0.95) rotate(2deg)' }, '100%': { transform: 'scale(1) rotate(0deg)' } },
        sealGlow:     { '0%,100%': { boxShadow: '0 0 10px rgba(212,168,79,0.3)' }, '50%': { boxShadow: '0 0 30px rgba(212,168,79,0.8), 0 0 60px rgba(212,168,79,0.4)' } },
        textReveal:   { '0%': { clipPath: 'inset(0 100% 0 0)' }, '100%': { clipPath: 'inset(0 0% 0 0)' } },
        charIn:       { '0%': { opacity: '0', transform: 'translateY(10px) rotateX(-90deg)' }, '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' } },
        toriiEmerge:  { '0%': { opacity: '0', transform: 'translateY(40px) scale(0.95)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        lanternGlow:  { '0%,100%': { filter: 'drop-shadow(0 0 8px rgba(246,185,74,0.6))' }, '50%': { filter: 'drop-shadow(0 0 20px rgba(246,185,74,0.9))' } },
      },

      // ─── TRANSITIONS ───────────────────────────────────────────────────
      transitionTimingFunction: {
        'shrine':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'blade':      'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cinematic':  'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },

      // ─── BLUR ─────────────────────────────────────────────────────────
      blur: {
        '4xl': '72px',
        '5xl': '100px',
      },

      // ─── Z-INDEX ──────────────────────────────────────────────────────
      zIndex: {
        '60':  '60',
        '70':  '70',
        '80':  '80',
        '90':  '90',
        '100': '100',
        'cursor': '9999',
        'overlay': '9998',
        'transition': '9997',
        'achievement': '9996',
      },
    },
  },
  plugins: [],
}

export default config
