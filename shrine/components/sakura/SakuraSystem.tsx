'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useSeason } from '@/lib/hooks/use-season'
import { useShrineStore } from '@/lib/store/shrine-store'
import type { SakuraPetal } from '@/lib/types/shrine'

const PETAL_COUNT = 35
const FIREFLY_COUNT = 20
const PETAL_PATH =
  'M 0,-1 C 0.5,-1 1,-0.5 1,0 C 1,0.5 0.5,1 0,0.8 C -0.5,1 -1,0.5 -1,0 C -1,-0.5 -0.5,-1 0,-1 Z'

let particleId = 0

export function SakuraSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petalsRef = useRef<SakuraPetal[]>([])
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const scrollRef = useRef(0)
  const windRef = useRef({ x: 0.3, y: 0 })
  const windTimeRef = useRef(0)

  const { season, particleColor, particleType, windStrength } = useSeason()
  const { incrementPetalClicks } = useShrineStore()

  const createPetal = useCallback(
    (overrideY?: number): SakuraPetal => {
      const layer = (Math.ceil(Math.random() * 3) as 1 | 2 | 3)
      const speedMultiplier = layer === 1 ? 0.6 : layer === 2 ? 1 : 1.4
      const color = particleColor[Math.floor(Math.random() * particleColor.length)]

      return {
        id: particleId++,
        x: Math.random() * window.innerWidth,
        y: overrideY !== undefined ? overrideY : Math.random() * -window.innerHeight,
        size: layer === 1 ? 4 + Math.random() * 3 : layer === 2 ? 6 + Math.random() * 4 : 8 + Math.random() * 5,
        opacity: layer === 1 ? 0.3 + Math.random() * 0.3 : layer === 2 ? 0.5 + Math.random() * 0.3 : 0.6 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2 * speedMultiplier,
        speedX: (Math.random() - 0.5) * 0.8 * speedMultiplier,
        speedY: (0.4 + Math.random() * 0.6) * speedMultiplier,
        wobble: 0,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
        wobbleOffset: Math.random() * Math.PI * 2,
        layer,
        color,
      }
    },
    [particleColor]
  )

  const createFirefly = useCallback((): SakuraPetal => {
    return {
      id: particleId++,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 2 + Math.random() * 3,
      opacity: 0,
      rotation: 0,
      rotationSpeed: 0,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      wobbleOffset: Math.random() * Math.PI * 2,
      layer: 2,
      color: particleColor[Math.floor(Math.random() * particleColor.length)],
    }
  }, [particleColor])

  // Initialize petals
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const count = particleType === 'firefly' ? FIREFLY_COUNT : PETAL_COUNT
    petalsRef.current = Array.from({ length: count }, (_, i) => {
      if (particleType === 'firefly') return createFirefly()
      return createPetal(Math.random() * window.innerHeight) // Start spread throughout
    })

    return () => window.removeEventListener('resize', resize)
  }, [season, createPetal, createFirefly, particleType])

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Draw functions
  const drawSakuraPetal = useCallback(
    (ctx: CanvasRenderingContext2D, petal: SakuraPetal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate((petal.rotation * Math.PI) / 180)
      ctx.globalAlpha = petal.opacity

      const s = petal.size
      ctx.beginPath()
      // Organic petal shape
      ctx.moveTo(0, -s)
      ctx.bezierCurveTo(s * 0.6, -s * 0.8, s * 0.8, 0, 0, s * 0.6)
      ctx.bezierCurveTo(-s * 0.8, 0, -s * 0.6, -s * 0.8, 0, -s)
      ctx.closePath()

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
      gradient.addColorStop(0, petal.color + 'FF')
      gradient.addColorStop(1, petal.color + '44')
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.restore()
    },
    []
  )

  const drawFirefly = useCallback(
    (ctx: CanvasRenderingContext2D, petal: SakuraPetal, time: number) => {
      const pulse = Math.sin(time * 0.001 + petal.wobbleOffset) * 0.5 + 0.5
      const opacity = pulse * petal.opacity

      ctx.save()
      ctx.globalAlpha = opacity
      const gradient = ctx.createRadialGradient(petal.x, petal.y, 0, petal.x, petal.y, petal.size * 3)
      gradient.addColorStop(0, petal.color + 'FF')
      gradient.addColorStop(0.5, petal.color + '80')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(petal.x, petal.y, petal.size * 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = opacity * 1.5
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(petal.x, petal.y, petal.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    },
    []
  )

  const drawMapleLeaf = useCallback(
    (ctx: CanvasRenderingContext2D, petal: SakuraPetal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate((petal.rotation * Math.PI) / 180)
      ctx.globalAlpha = petal.opacity

      const s = petal.size
      ctx.beginPath()
      ctx.moveTo(0, -s)
      // 5-point maple
      for (let i = 0; i < 5; i++) {
        const outerAngle = ((i * 72 - 90) * Math.PI) / 180
        const innerAngle = (((i * 72 + 36) - 90) * Math.PI) / 180
        ctx.lineTo(Math.cos(outerAngle) * s, Math.sin(outerAngle) * s)
        ctx.lineTo(Math.cos(innerAngle) * s * 0.4, Math.sin(innerAngle) * s * 0.4)
      }
      ctx.closePath()
      ctx.fillStyle = petal.color
      ctx.fill()
      ctx.restore()
    },
    []
  )

  const drawSnowflake = useCallback(
    (ctx: CanvasRenderingContext2D, petal: SakuraPetal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate((petal.rotation * Math.PI) / 180)
      ctx.globalAlpha = petal.opacity * 0.7

      const s = petal.size
      ctx.strokeStyle = petal.color
      ctx.lineWidth = 0.5

      for (let i = 0; i < 6; i++) {
        ctx.save()
        ctx.rotate((i * 60 * Math.PI) / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -s)
        ctx.moveTo(0, -s * 0.6)
        ctx.lineTo(s * 0.2, -s * 0.4)
        ctx.moveTo(0, -s * 0.6)
        ctx.lineTo(-s * 0.2, -s * 0.4)
        ctx.stroke()
        ctx.restore()
      }
      ctx.restore()
    },
    []
  )

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = 0

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 3) // cap at 3x slow
      lastTime = time
      windTimeRef.current += 0.005

      // Gently oscillate wind
      windRef.current.x =
        windStrength *
        (0.3 + Math.sin(windTimeRef.current * 0.7) * 0.2 + Math.sin(windTimeRef.current * 1.3) * 0.1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      petalsRef.current.forEach((petal, i) => {
        if (particleType === 'firefly') {
          // Firefly: opacity cycles, drifts slowly
          petal.opacity = 0.5 + Math.sin(time * 0.001 + petal.wobbleOffset) * 0.5
          petal.x += petal.speedX * delta
          petal.y += petal.speedY * delta

          // Gentle attraction to random targets
          petal.wobble += petal.wobbleSpeed
          petal.x += Math.sin(petal.wobble) * 0.3

          // Wrap
          if (petal.x < -20) petal.x = canvas.width + 20
          if (petal.x > canvas.width + 20) petal.x = -20
          if (petal.y < -20) petal.y = canvas.height + 20
          if (petal.y > canvas.height + 20) petal.y = -20

          drawFirefly(ctx, petal, time)
          return
        }

        // Falling particles (sakura, maple, snow)
        petal.wobble += petal.wobbleSpeed
        petal.x += (windRef.current.x + Math.sin(petal.wobble + petal.wobbleOffset) * 0.5) * delta
        petal.y += petal.speedY * delta
        petal.rotation += petal.rotationSpeed * delta

        // Mouse repulsion — petals gently avoid the cursor
        const dx = petal.x - mouse.x
        const dy = petal.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          petal.x += (dx / dist) * force * 2
          petal.y += (dy / dist) * force * 1
        }

        // Parallax layers respond to scroll at different rates
        const scrollOffset = scrollRef.current * (petal.layer === 1 ? 0.05 : petal.layer === 2 ? 0.1 : 0.15)
        const renderY = petal.y - (scrollOffset % canvas.height)

        if (petal.y > canvas.height + 50) {
          // Reset at top
          const fresh = createPetal()
          petalsRef.current[i] = fresh
          return
        }

        // Draw based on type
        const savedY = petal.y
        petal.y = renderY

        switch (particleType) {
          case 'sakura':
            drawSakuraPetal(ctx, petal)
            break
          case 'maple':
            drawMapleLeaf(ctx, petal)
            break
          case 'snow':
            drawSnowflake(ctx, petal)
            break
        }

        petal.y = savedY
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [season, particleType, windStrength, drawSakuraPetal, drawFirefly, drawMapleLeaf, drawSnowflake, createPetal])

  // Click on petal to collect it
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const x = e.clientX
      const y = e.clientY

      const hit = petalsRef.current.findIndex((p) => {
        const dx = p.x - x
        const dy = p.y - y
        return Math.sqrt(dx * dx + dy * dy) < p.size * 2
      })

      if (hit !== -1) {
        incrementPetalClicks()
        // Remove petal and spawn new one
        petalsRef.current.splice(hit, 1, createPetal())
      }
    },
    [incrementPetalClicks, createPetal]
  )

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0"
      style={{ mixBlendMode: 'screen' }}
      onClick={handleCanvasClick}
      aria-hidden="true"
    />
  )
}
