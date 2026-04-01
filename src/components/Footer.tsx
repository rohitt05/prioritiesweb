'use client'

import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const FACE_SVGS = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FAD1D8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><ellipse cx="32" cy="18" rx="13" ry="10" fill="#3D2314"/><ellipse cx="20" cy="22" rx="5" ry="7" fill="#3D2314"/><ellipse cx="44" cy="22" rx="5" ry="7" fill="#3D2314"/><circle cx="26" cy="30" r="1.2" fill="#3D2314"/><circle cx="38" cy="30" r="1.2" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#C17B6B" stroke-width="1.5" stroke-linecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#DBC0E7"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><rect x="19" y="15" width="26" height="14" rx="6" fill="#2C1A0E"/><circle cx="26" cy="30" r="1.3" fill="#2C1A0E"/><circle cx="38" cy="30" r="1.3" fill="#2C1A0E"/><path d="M28 37 Q32 39 36 37" stroke="#A0522D" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#C9E6EE"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#8D5524"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#8D5524"/><circle cx="22" cy="22" r="8" fill="#1C0A00"/><circle cx="32" cy="18" r="9" fill="#1C0A00"/><circle cx="42" cy="22" r="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 40 36 37" stroke="#6B3A2A" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#D4E6D0"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#6B3F1E"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 39 36 37" stroke="#C17B6B" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#F0E6C8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><ellipse cx="32" cy="17" rx="14" ry="8" fill="#5C3317"/><rect x="28" y="10" width="8" height="16" rx="4" fill="#5C3317"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#A0522D" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#E8D5C4"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#4A2912"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#4A2912"/><ellipse cx="32" cy="19" rx="13" ry="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 39 36 37" stroke="#6B3A2A" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FDFCF0"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#4A2912"/><circle cx="26" cy="30" r="1.5" fill="#2C1A0E"/><circle cx="38" cy="30" r="1.5" fill="#2C1A0E"/><path d="M27 36 Q32 40 37 36" stroke="#C17B6B" stroke-width="2" stroke-linecap="round" fill="none"/><ellipse cx="24" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/><ellipse cx="40" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/></svg>`,
]

const BASE_W = 900
const FRIENDS_BASE = [
  { faceIdx: 0, label: 'the creative one', r: 58 },
  { faceIdx: 1, label: 'the fun one',       r: 66 },
  { faceIdx: 2, label: 'the smart one',     r: 52 },
  { faceIdx: 3, label: 'your ride-or-die',  r: 70 },
  { faceIdx: 4, label: 'who feeds you',     r: 56 },
  { faceIdx: 5, label: 'your rock',         r: 64 },
  { faceIdx: 1, label: 'the dreamer',       r: 50 },
  { faceIdx: 0, label: 'the wise one',      r: 60 },
  { faceIdx: 2, label: 'your person',       r: 54 },
]
const YOU_BASE = { faceIdx: 6, label: 'you', r: 74 }

function PhysicsStage({ trigger, width, height }: { trigger: boolean; width: number; height: number }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const startedRef  = useRef(false)
  const rafRef      = useRef<number>(0)
  const draggingRef = useRef(false)

  useEffect(() => {
    if (!trigger || startedRef.current || width === 0 || height === 0) return
    startedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const scale = Math.max(0.38, Math.min(1.15, width / BASE_W))
    const W = width
    const H = height
    canvas.width  = W
    canvas.height = H

    const imgs: HTMLImageElement[] = []
    FACE_SVGS.forEach((svg, i) => {
      const img = new window.Image()
      img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
      imgs[i] = img
    })

    const ALL_DATA = [
      ...FRIENDS_BASE.map(d => ({ ...d, r: Math.round(d.r * scale) })),
      { ...YOU_BASE, r: Math.round(YOU_BASE.r * scale) },
    ]

    import('matter-js').then((M) => {
      const { Engine, Runner, Bodies, Composite, Events, Mouse, MouseConstraint } = M
      const engine = Engine.create({ gravity: { y: 2.5 } })

      const wo = { isStatic: true, render: { visible: false }, friction: 0.4, restitution: 0.25 }
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2,  H + 25,   W + 200, 50,   wo), // floor
        Bodies.rectangle(-25,    H / 2,    50, H * 4,     wo), // left wall
        Bodies.rectangle(W + 25, H / 2,    50, H * 4,     wo), // right wall
        // NO ceiling — avatars can fly all the way up
      ])

      const FRIENDS_COUNT = FRIENDS_BASE.length
      const bodies = ALL_DATA.map((d, i) => {
        const isYou = i === ALL_DATA.length - 1
        const xPos  = isYou
          ? W / 2
          : d.r * 1.1 + (i / (FRIENDS_COUNT - 1)) * (W - d.r * 2.2)
        const startY = -(i * 130 * scale + d.r + 200)
        const body = Bodies.circle(xPos, startY, d.r, {
          restitution: 0.32, friction: 0.45, frictionAir: 0.009, density: 0.004,
          render: { visible: false },
        })
        ;(body as any).__faceIdx = d.faceIdx
        ;(body as any).__r       = d.r
        ;(body as any).__label   = d.label
        ;(body as any).__isYou   = isYou
        return body
      })
      Composite.add(engine.world, bodies)

      const mouse = Mouse.create(canvas)
      const mouseEl = (mouse as any).element as HTMLElement
      mouseEl.removeEventListener('wheel',      (mouse as any).mousewheel)
      mouseEl.removeEventListener('mousewheel', (mouse as any).mousewheel)
      mouseEl.addEventListener('wheel', () => {}, { passive: true })

      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.22, damping: 0.08, render: { visible: false } },
      })
      Composite.add(engine.world, mc)

      Events.on(mc, 'startdrag', () => { draggingRef.current = true })
      Events.on(mc, 'enddrag',   () => { draggingRef.current = false })

      Runner.run(Runner.create(), engine)

      const ctx = canvas.getContext('2d')!

      function draw() {
        rafRef.current = requestAnimationFrame(draw)
        ctx.clearRect(0, 0, W, H)

        Composite.allBodies(engine.world).forEach((body: any) => {
          if (body.isStatic) return
          const { x, y } = body.position
          const r: number      = body.__r
          const fi: number     = body.__faceIdx
          const label: string  = body.__label
          const isYou: boolean = body.__isYou
          if (r === undefined) return

          // face
          ctx.save()
          ctx.translate(x, y); ctx.rotate(body.angle)
          ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip()
          if (imgs[fi]?.complete && imgs[fi].naturalWidth > 0) {
            ctx.drawImage(imgs[fi], -r, -r, r * 2, r * 2)
          } else {
            ctx.fillStyle = '#2a2824'; ctx.fill()
          }
          ctx.restore()

          // ring
          ctx.save(); ctx.translate(x, y)
          if (isYou) {
            ctx.beginPath(); ctx.arc(0, 0, r + Math.max(6, 10 * scale), 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(212,163,115,0.18)'; ctx.lineWidth = Math.max(8, 16 * scale); ctx.stroke()
            ctx.beginPath(); ctx.arc(0, 0, r + 3, 0, Math.PI * 2)
            ctx.strokeStyle = '#D4A373'; ctx.lineWidth = 3; ctx.stroke()
          } else {
            ctx.beginPath(); ctx.arc(0, 0, r + 1.5, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 2; ctx.stroke()
          }
          ctx.restore()

          // label
          const labelSize = Math.max(8, Math.round(r * 0.21))
          ctx.save(); ctx.translate(x, y)
          ctx.font = `${isYou ? 700 : 500} ${labelSize}px Inter,sans-serif`
          ctx.fillStyle = isYou ? '#C17B6B' : 'rgba(80,74,68,0.85)'
          ctx.textAlign = 'center'; ctx.textBaseline = 'top'
          ctx.fillText(isYou ? 'YOU' : label, 0, r + 5)
          ctx.restore()
        })
      }
      draw()

      return () => cancelAnimationFrame(rafRef.current)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: 'transparent',
        cursor: 'grab',
        touchAction: 'pan-y',
      }}
    />
  )
}

function AnimatedBlock({ inView }: { inView: boolean }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!blockRef.current) return
    const update = () => {
      if (!blockRef.current) return
      setDims({ width: blockRef.current.offsetWidth, height: blockRef.current.offsetHeight })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(blockRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={blockRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#0e0d0b',
        overflow: 'hidden',
      }}
    >
      {/* Text overlay — sits behind avatars via z-index */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1,
          userSelect: 'none',
        }}
      >
        <p style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 72px)',
          color: 'rgba(245, 240, 232, 0.07)',
          lineHeight: 1.15,
          textAlign: 'center',
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          me and my{' '}
          <span style={{ color: 'rgba(193, 123, 107, 0.10)' }}>9 idiots</span>
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(10px, 1.1vw, 13px)',
          color: 'rgba(245, 240, 232, 0.03)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginTop: '10px',
          textAlign: 'center',
        }}>
          your whole world, in one app
        </p>
      </div>

      {/* Physics canvas on top */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <PhysicsStage trigger={inView} width={dims.width} height={dims.height} />
      </div>
    </div>
  )
}

export default function Footer() {
  const year       = new Date().getFullYear()
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <footer ref={sectionRef} className="bg-[#0e0d0b] text-[#9A9589] overflow-hidden">

      {/* top: brand + links */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">

          {/* brand */}
          <div className="max-w-[220px]">
            <span className="font-serif italic text-[26px] font-bold text-[#F5F0E8] block mb-2">priorities</span>
            <p className="text-xs leading-relaxed text-[#4A4540]">9 people. Real moments. No noise.</p>
          </div>

          {/* links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Product</p>
              <ul className="space-y-3">
                <li><a href="/#about"    className="hover:text-[#F5F0E8] transition-colors">About</a></li>
                <li><a href="/#features" className="hover:text-[#F5F0E8] transition-colors">Features</a></li>
                <li><a href="/#waitlist" className="hover:text-[#F5F0E8] transition-colors">Join Waitlist</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Company</p>
              <ul className="space-y-3">
                <li><a href="mailto:hello@getpriorities.app"   className="hover:text-[#F5F0E8] transition-colors">Contact</a></li>
                <li><a href="mailto:support@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Support</a></li>
                <li><a href="mailto:careers@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Join Us</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Legal</p>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms"   className="hover:text-[#F5F0E8] transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-[#F5F0E8] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1c1b19] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: '12px', color: '#3A3530', lineHeight: 1.55 }}>
            built with love, <span style={{ color: '#6B4035' }}>for love —</span> by your lover 🌸
          </p>
          <p className="text-xs text-[#2E2C29]">
            © {year} Priorities. All rights reserved. Made with 🌸 in India.
          </p>
        </div>
      </div>

      {/* Full-viewport physics section */}
      <AnimatedBlock inView={inView} />

    </footer>
  )
}
