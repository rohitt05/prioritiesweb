'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
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

const TEXT_H  = 280
const LAND_H  = 340
const TOTAL_H = TEXT_H + LAND_H

function PhysicsStage({ trigger, width }: { trigger: boolean; width: number }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const startedRef = useRef(false)
  const rafRef     = useRef<number>(0)
  const wrapRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || startedRef.current || width === 0) return
    startedRef.current = true

    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    canvas.width  = width
    canvas.height = TOTAL_H

    const imgs: HTMLImageElement[] = []
    FACE_SVGS.forEach((svg, i) => {
      const img = new window.Image()
      img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
      imgs[i] = img
    })

    import('matter-js').then((M) => {
      const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = M
      const engine = Engine.create({ gravity: { y: 2.2 } })

      const wo = { isStatic: true, render: { visible: false }, friction: 0.4, restitution: 0.2 }
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, TOTAL_H + 25, width + 200, 50,        wo),
        Bodies.rectangle(-25,        TOTAL_H / 2,  50,          TOTAL_H * 3, wo),
        Bodies.rectangle(width + 25, TOTAL_H / 2,  50,          TOTAL_H * 3, wo),
      ])

      const bodies = ALL_DATA.map((d, i) => {
        const isYou = i === ALL_DATA.length - 1
        const xPos  = isYou
          ? width / 2
          : d.r + (i / (FRIENDS_DATA.length - 1)) * (width - d.r * 2)
        const startY = -(i * 140 + d.r + 300)
        const body = Bodies.circle(xPos, startY, d.r, {
          restitution: 0.28, friction: 0.5, frictionAir: 0.008, density: 0.004,
          render: { visible: false },
        })
        ;(body as any).__faceIdx = d.faceIdx
        ;(body as any).__r       = d.r
        ;(body as any).__label   = d.label
        ;(body as any).__isYou   = isYou
        return body
      })
      Composite.add(engine.world, bodies)

      // Matter mouse — attach directly to canvas so drag works
      const mouse = Mouse.create(canvas)
      // Neutralise Matter's built-in wheel handler so it never blocks page scroll
      ;(mouse as any).element.removeEventListener('wheel', (mouse as any).mousewheel)
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, render: { visible: false } },
      })
      Composite.add(engine.world, mc)

      // Make sure native wheel always scrolls the page (passive, no block)
      const onWheel = () => { /* noop — passive listener just stops Matter eating wheel */ }
      canvas.addEventListener('wheel', onWheel, { passive: true })

      Runner.run(Runner.create(), engine)

      const ctx = canvas.getContext('2d')!
      function draw() {
        rafRef.current = requestAnimationFrame(draw)
        ctx.clearRect(0, 0, width, TOTAL_H)
        Composite.allBodies(engine.world).forEach((body: any) => {
          if (body.isStatic) return
          const { x, y } = body.position
          const r: number      = body.__r
          const fi: number     = body.__faceIdx
          const label: string  = body.__label
          const isYou: boolean = body.__isYou
          if (r === undefined) return

          ctx.save()
          ctx.translate(x, y); ctx.rotate(body.angle)
          ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip()
          if (imgs[fi]?.complete && imgs[fi].naturalWidth > 0) {
            ctx.drawImage(imgs[fi], -r, -r, r * 2, r * 2)
          } else { ctx.fillStyle = '#2a2824'; ctx.fill() }
          ctx.restore()

          ctx.save(); ctx.translate(x, y)
          if (isYou) {
            ctx.beginPath(); ctx.arc(0, 0, r + 12, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(212,163,115,0.18)'; ctx.lineWidth = 18; ctx.stroke()
            ctx.beginPath(); ctx.arc(0, 0, r + 3,  0, Math.PI * 2)
            ctx.strokeStyle = '#D4A373';                ctx.lineWidth = 3.5; ctx.stroke()
          } else {
            ctx.beginPath(); ctx.arc(0, 0, r + 1.5, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 2.5; ctx.stroke()
          }
          ctx.restore()

          ctx.save(); ctx.translate(x, y)
          ctx.font = `${isYou ? 700 : 500} ${Math.max(9, r * 0.19)}px Inter,sans-serif`
          ctx.fillStyle = isYou ? '#C17B6B' : 'rgba(80,74,68,0.9)'
          ctx.textAlign = 'center'; ctx.textBaseline = 'top'
          ctx.fillText(isYou ? 'YOU' : label, 0, r + 6)
          ctx.restore()
        })
      }
      draw()

      return () => {
        cancelAnimationFrame(rafRef.current)
        canvas.removeEventListener('wheel', onWheel)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, width])

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block', width: '100%', height: TOTAL_H,
          background: 'transparent',
          // pointer-events ON so Matter Mouse can receive mousedown for dragging
          pointerEvents: 'auto',
          cursor: 'grab',
          // sit behind the text overlay
          position: 'relative', zIndex: 1,
        }}
      />
    </div>
  )
}

function AnimatedBlock({ inView }: { inView: boolean }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!blockRef.current) return
    setWidth(blockRef.current.offsetWidth)
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(blockRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={blockRef}
      style={{ position: 'relative', width: '100%', height: TOTAL_H, background: '#0e0d0b', overflow: 'hidden' }}
    >
      <PhysicsStage trigger={inView} width={width} />

      {/* text — pointer-events:none so clicks fall through to canvas for dragging */}
      <div
        className="absolute top-0 left-0 right-0 text-center px-5 sm:px-8"
        style={{ zIndex: 10, paddingTop: 44, pointerEvents: 'none' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#3A3630] text-[11px] tracking-[0.22em] uppercase font-semibold mb-5"
        >
          me and my 9 idiots
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.14, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Georgia,"Times New Roman",serif',
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 'clamp(44px, 7.5vw, 90px)',
            lineHeight: 1.0, color: '#F5F0E8',
            marginBottom: '0.22em', letterSpacing: '-0.02em',
          }}
        >
          built with love,<br />
          <span style={{ color: '#C17B6B' }}>for love —</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Georgia,serif', fontStyle: 'italic',
            fontSize: 'clamp(16px, 2.2vw, 24px)',
            color: '#4E4944', marginBottom: '0.8rem', fontWeight: 400,
          }}
        >
          by your lover 🌸
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-[#2A2724] text-[10px] tracking-[0.18em] uppercase"
        >
          grab &amp; drag them around
        </motion.p>
      </div>
    </div>
  )
}

export default function Footer() {
  const year       = new Date().getFullYear()
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <footer ref={sectionRef} className="bg-[#0e0d0b] text-[#9A9589] overflow-hidden">

      {/* top: brand + links + copyright */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">

          {/* brand */}
          <div className="max-w-[220px]">
            <span className="font-serif italic text-[26px] font-bold text-[#F5F0E8] block mb-2">priorities</span>
            <p className="text-xs leading-relaxed text-[#4A4540] mb-3">9 people. Real moments. No noise.</p>
            <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: '13px', color: '#3A3530', lineHeight: 1.55 }}>
              built with love,<br />
              <span style={{ color: '#6B4035' }}>for love —</span><br />
              by your lover 🌸
            </p>
          </div>

          {/* links + copyright */}
          <div className="flex flex-col gap-6 flex-1 items-end">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm w-full sm:w-auto">
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
            <p className="text-xs text-[#2E2C29] text-right w-full">
              © {year} Priorities. All rights reserved. Made with 🌸 in India.
            </p>
          </div>

        </div>
      </div>

      {/* physics block — no border, no extra space */}
      <AnimatedBlock inView={inView} />

    </footer>
  )
}
