'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ─── SVG face strings ────────────────────────────────────────────────────────
const FACE_SVGS = [
  // 0 girl light, bun
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FAD1D8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><ellipse cx="32" cy="18" rx="13" ry="10" fill="#3D2314"/><ellipse cx="20" cy="22" rx="5" ry="7" fill="#3D2314"/><ellipse cx="44" cy="22" rx="5" ry="7" fill="#3D2314"/><circle cx="26" cy="30" r="1.2" fill="#3D2314"/><circle cx="38" cy="30" r="1.2" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#C17B6B" stroke-width="1.5" stroke-linecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/></svg>`,
  // 1 boy medium
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#DBC0E7"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><rect x="19" y="15" width="26" height="14" rx="6" fill="#2C1A0E"/><circle cx="26" cy="30" r="1.3" fill="#2C1A0E"/><circle cx="38" cy="30" r="1.3" fill="#2C1A0E"/><path d="M28 37 Q32 39 36 37" stroke="#A0522D" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  // 2 girl dark, curly
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#C9E6EE"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#8D5524"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#8D5524"/><circle cx="22" cy="22" r="8" fill="#1C0A00"/><circle cx="32" cy="18" r="9" fill="#1C0A00"/><circle cx="42" cy="22" r="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 40 36 37" stroke="#6B3A2A" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  // 3 boy light, wavy
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#D4E6D0"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#6B3F1E"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 39 36 37" stroke="#C17B6B" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  // 4 girl medium, ponytail
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#F0E6C8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><ellipse cx="32" cy="17" rx="14" ry="8" fill="#5C3317"/><rect x="28" y="10" width="8" height="16" rx="4" fill="#5C3317"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#A0522D" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  // 5 boy dark, fade
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#E8D5C4"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#4A2912"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#4A2912"/><ellipse cx="32" cy="19" rx="13" ry="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 39 36 37" stroke="#6B3A2A" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  // 6 YOU
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FDFCF0"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#4A2912"/><circle cx="26" cy="30" r="1.5" fill="#2C1A0E"/><circle cx="38" cy="30" r="1.5" fill="#2C1A0E"/><path d="M27 36 Q32 40 37 36" stroke="#C17B6B" stroke-width="2" stroke-linecap="round" fill="none"/><ellipse cx="24" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/><ellipse cx="40" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/></svg>`,
]

const FRIENDS_DATA = [
  { faceIdx: 0, label: 'the creative one', r: 56 },
  { faceIdx: 1, label: 'the fun one',       r: 64 },
  { faceIdx: 2, label: 'the smart one',     r: 50 },
  { faceIdx: 3, label: 'your ride-or-die',  r: 68 },
  { faceIdx: 4, label: 'who feeds you',     r: 54 },
  { faceIdx: 5, label: 'your rock',         r: 62 },
  { faceIdx: 1, label: 'the dreamer',       r: 48 },
  { faceIdx: 0, label: 'the wise one',      r: 58 },
  { faceIdx: 2, label: 'your person',       r: 52 },
]
const YOU_DATA = { faceIdx: 6, label: 'you', r: 70 }
const ALL_DATA = [...FRIENDS_DATA, YOU_DATA]

const CANVAS_H = 440

// ─── Physics Stage ────────────────────────────────────────────────────────────
function PhysicsStage({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startedRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // pre-load images once immediately (no trigger needed)
    const imgs: HTMLImageElement[] = []
    let loaded = 0
    FACE_SVGS.forEach((svg, i) => {
      const img = new window.Image()
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      img.src = URL.createObjectURL(blob)
      img.onload = () => { loaded++ }
      imgs[i] = img
    })

    // watch trigger — only launch physics once, when section scrolls into view
    if (!trigger || startedRef.current) return
    startedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.offsetWidth || window.innerWidth
    canvas.width  = W
    canvas.height = CANVAS_H

    import('matter-js').then((M) => {
      const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = M

      const engine = Engine.create({ gravity: { y: 2.5 } })

      // ── walls: floor + left + right ONLY (no ceiling) ──
      const wallOpts = { isStatic: true, render: { visible: false }, friction: 0.4, restitution: 0.25 }
      const floor  = Bodies.rectangle(W / 2, CANVAS_H + 25, W + 200, 50,   wallOpts)
      const wallL  = Bodies.rectangle(-25,   CANVAS_H / 2,  50,      CANVAS_H * 4, wallOpts)
      const wallR  = Bodies.rectangle(W + 25, CANVAS_H / 2, 50,      CANVAS_H * 4, wallOpts)
      Composite.add(engine.world, [floor, wallL, wallR])

      // ── bodies: start ABOVE the canvas (negative y) ──
      const bodies = ALL_DATA.map((d, i) => {
        const isYou = i === ALL_DATA.length - 1
        // spread x evenly, you near center
        const xPos = isYou
          ? W / 2
          : d.r + (i / (FRIENDS_DATA.length - 1)) * (W - d.r * 2)
        // start very high above canvas, staggered so they rain in sequence
        const startY = -(i * 120 + d.r + 80)
        const body = Bodies.circle(xPos, startY, d.r, {
          restitution: 0.3,
          friction: 0.5,
          frictionAir: 0.008,
          density: 0.004,
          render: { visible: false },
        })
        ;(body as any).__faceIdx = d.faceIdx
        ;(body as any).__r       = d.r
        ;(body as any).__label   = d.label
        ;(body as any).__isYou   = isYou
        return body
      })
      Composite.add(engine.world, bodies)

      // ── mouse drag (real physics pushes) ──
      const mouse = Mouse.create(canvas)
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, render: { visible: false } },
      })
      Composite.add(engine.world, mc)

      // ── runner ──
      const runner = Runner.create()
      Runner.run(runner, engine)

      // ── custom draw loop ──
      const ctx = canvas.getContext('2d')!

      function draw() {
        rafRef.current = requestAnimationFrame(draw)
        ctx.clearRect(0, 0, W, CANVAS_H)

        Composite.allBodies(engine.world).forEach((body: any) => {
          if (body.isStatic) return
          const { x, y } = body.position
          const r: number   = body.__r
          const fi: number  = body.__faceIdx
          const label: string = body.__label
          const isYou: boolean = body.__isYou
          if (r === undefined) return

          // clip & draw face
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(body.angle)
          ctx.beginPath()
          ctx.arc(0, 0, r, 0, Math.PI * 2)
          ctx.clip()
          if (imgs[fi]?.complete && imgs[fi].naturalWidth > 0) {
            ctx.drawImage(imgs[fi], -r, -r, r * 2, r * 2)
          } else {
            ctx.fillStyle = '#2a2824'
            ctx.fill()
          }
          ctx.restore()

          // ring
          ctx.save()
          ctx.translate(x, y)
          if (isYou) {
            // gold glow
            ctx.beginPath()
            ctx.arc(0, 0, r + 11, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(212,163,115,0.2)'
            ctx.lineWidth = 16
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(0, 0, r + 3, 0, Math.PI * 2)
            ctx.strokeStyle = '#D4A373'
            ctx.lineWidth = 3.5
            ctx.stroke()
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, r + 1.5, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255,255,255,0.07)'
            ctx.lineWidth = 2.5
            ctx.stroke()
          }
          ctx.restore()

          // label
          ctx.save()
          ctx.translate(x, y)
          const fs = Math.max(9, r * 0.19)
          ctx.font = `${isYou ? 700 : 500} ${fs}px Inter, sans-serif`
          ctx.fillStyle = isYou ? '#C17B6B' : 'rgba(80,74,68,0.9)'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillText(isYou ? 'YOU' : label, 0, r + 6)
          ctx.restore()
        })
      }
      draw()
    })

    return () => { cancelAnimationFrame(rafRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: CANVAS_H,
        display: 'block',
        cursor: 'grab',
        background: 'transparent',
      }}
    />
  )
}

// ─── Animated block ───────────────────────────────────────────────────────────
function AnimatedBlock({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative w-full border-t border-[#1E1C18]"
      style={{ background: 'linear-gradient(to top, #0A0908 0%, #0e0d0b 100%)' }}
    >
      {/* tagline — tight bottom padding so canvas is close */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 pt-16 pb-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#3A3630] text-[11px] tracking-[0.22em] uppercase font-semibold mb-6"
        >
          me and my 9 idiots
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.14, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 1.0,
            color: '#F5F0E8',
            marginBottom: '0.25em',
            letterSpacing: '-0.02em',
          }}
        >
          built with love,
          <br />
          <span style={{ color: '#C17B6B' }}>for love —</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.4vw, 26px)',
            color: '#4E4944',
            marginBottom: '1.2rem',
            fontWeight: 400,
          }}
        >
          by your lover 🌸
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-[#272320] text-[10px] tracking-[0.18em] uppercase"
        >
          grab &amp; drag them around
        </motion.p>
      </div>

      {/* physics canvas — directly below, no extra spacing */}
      <PhysicsStage trigger={inView} />

      {/* floor fade */}
      <div
        style={{
          height: 56,
          marginTop: -56,
          background: 'linear-gradient(to top, #0A0908 50%, transparent 100%)',
          pointerEvents: 'none',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()
  const sectionRef = useRef(null)
  // fire only when the top of the section hits the bottom of the viewport
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <footer ref={sectionRef} className="bg-[#100F0D] text-[#9A9589] overflow-hidden">

      {/* ── Links + brand grid ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-14">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div className="max-w-[200px]">
            <span className="font-serif italic text-[26px] font-bold text-[#F5F0E8] block mb-2">priorities</span>
            <p className="text-xs leading-relaxed text-[#4A4540]">9 people. Real moments. No noise.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Product</p>
              <ul className="space-y-3">
                <li><a href="/#about" className="hover:text-[#F5F0E8] transition-colors">About</a></li>
                <li><a href="/#features" className="hover:text-[#F5F0E8] transition-colors">Features</a></li>
                <li><a href="/#waitlist" className="hover:text-[#F5F0E8] transition-colors">Join Waitlist</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Company</p>
              <ul className="space-y-3">
                <li><a href="mailto:hello@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Contact</a></li>
                <li><a href="mailto:support@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Support</a></li>
                <li><a href="mailto:careers@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Join Us</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Legal</p>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#F5F0E8] transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-[#F5F0E8] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-[#1E1C18]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#3D3830]">
          <p>© {year} Priorities. All rights reserved. Made with 🌸 in India.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-[#9A9589] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#9A9589] transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-[#9A9589] transition-colors">Cookies</Link>
            <a href="mailto:hello@getpriorities.app" className="hover:text-[#9A9589] transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* ── Physics section ── */}
      <AnimatedBlock inView={inView} />

    </footer>
  )
}
