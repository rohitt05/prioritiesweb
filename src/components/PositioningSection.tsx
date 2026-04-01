'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Palette ─────────────────────────────────────────────────────────────────
const P = [
  '#B8C88D','#E9DFB4','#EFBFB3','#A8E6CF','#DDEDC4',
  '#FFD4B8','#FFADAD','#C9E6EE','#FAD1D8','#F2C4D6',
  '#DBC0E7','#F0B2C7','#F0C7DB','#b6e3f4','#c0aede',
  '#ffdfbf','#d1d4f9','#ffd5dc','#f8c8dc','#a8d8ea',
  '#e0bbe4','#fec8d8','#d291bc','#fff2cc','#b9fbc0',
  '#ffc6ff','#fdffb6','#bdb2ff','#a0c4ff','#caffbf',
  '#9bf6ff','#ffc8dd','#d0f4de','#e4c1f9',
]

const PHOTO_SEEDS = [
  'couple1','couple2','friend1','friend2','memory1',
  'life1','life2','moment1','moment2','portrait1',
]

// ─── Content ─────────────────────────────────────────────────────────────────
const notForPills = [
  { icon: '🌍', line: 'Your follower count' },
  { icon: '📢', line: 'The highlight reel' },
  { icon: '🔔', line: 'Notifications from strangers' },
  { icon: '🤳', line: 'Looking good for the internet' },
  { icon: '📈', line: 'Going viral' },
  { icon: '👀', line: 'Who viewed your story' },
]

const forLines = [
  { emoji: '🫀', text: 'The 2am text you actually mean' },
  { emoji: '📸', text: 'The photo you only send to one person' },
  { emoji: '🎙️', text: 'A voice note that sounds like a hug' },
  { emoji: '🗓️', text: 'Every small moment that becomes a memory' },
  { emoji: '🔒', text: 'A space that belongs only to you two' },
]

// ─── Rising bubble types ──────────────────────────────────────────────────────
interface Particle {
  id: number
  x: number
  size: number
  color: string
  duration: number
  wobble: number
  isFilm: boolean
  seed?: string
  opacity: number
}

let _uid = 0
function mkParticle(isFilm = false): Particle {
  const size = isFilm ? 55 + Math.random() * 75 : 10 + Math.random() * 52
  return {
    id:       ++_uid,
    x:        4 + Math.random() * 92,
    size,
    color:    P[Math.floor(Math.random() * P.length)],
    duration: isFilm ? 16 + Math.random() * 10 : 9 + Math.random() * 10,
    wobble:   18 + Math.random() * 38,
    isFilm,
    seed:     isFilm ? PHOTO_SEEDS[Math.floor(Math.random() * PHOTO_SEEDS.length)] : undefined,
    opacity:  isFilm ? 0.70 + Math.random() * 0.20 : 0.38 + Math.random() * 0.28,
  }
}

function RisingParticle({ p, onDone }: { p: Particle; onDone: (id: number) => void }) {
  const viewH = typeof window !== 'undefined' ? window.innerHeight : 800
  const travel = viewH + p.size + 40
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${p.x}%`, bottom: -p.size - 20, width: p.size, height: p.size, borderRadius: '50%' }}
      initial={{ y: 0, x: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y:       [0, -travel],
        x:       [0, p.wobble, -p.wobble * 0.6, p.wobble * 0.4, 0],
        opacity: [0, p.opacity, p.opacity, p.opacity * 0.5, 0],
        scale:   [0.6, 1, 1, 0.9],
      }}
      transition={{
        duration: p.duration,
        ease: 'easeInOut',
        times: [0, 0.08, 0.70, 0.88, 1],
        x: { duration: p.duration, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] },
      }}
      onAnimationComplete={() => onDone(p.id)}
    >
      {p.isFilm ? (
        <div className="w-full h-full rounded-full overflow-hidden"
          style={{ boxShadow: '0 2px 0 2px rgba(255,255,255,0.5), 0 6px 24px rgba(0,0,0,0.08)' }}>
          <img src={`https://picsum.photos/seed/${p.seed}/220/220`} alt=""
            width={p.size} height={p.size} className="w-full h-full object-cover" loading="lazy" draggable={false} />
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)' }} />
        </div>
      ) : (
        <div className="w-full h-full rounded-full" style={{ background: p.color }} />
      )}
    </motion.div>
  )
}

function RisingPool() {
  const [particles, setParticles] = useState<Particle[]>(() => {
    const init: Particle[] = []
    for (let i = 0; i < 16; i++) init.push(mkParticle(i % 7 === 0))
    return init
  })

  useEffect(() => {
    const bTimer = setInterval(() => setParticles(p => [...p, mkParticle(false)]), 1000)
    const fTimer = setInterval(() => setParticles(p => [...p, mkParticle(true)]),  3800)
    return () => { clearInterval(bTimer); clearInterval(fTimer) }
  }, [])

  const remove = (id: number) => setParticles(p => p.filter(x => x.id !== id))

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map(p => <RisingParticle key={p.id} p={p} onDone={remove} />)}
      </AnimatePresence>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PositioningSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(233,223,180,0.55) 0%, #F5F0E8 45%, #F0EBF5 100%)',
      }}
    >
      {/* Rising bubbles */}
      <RisingPool />

      {/* Paper texture */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{
        opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8A7E6E] block mb-4">Let&apos;s be honest</span>
          <h2 className="font-serif text-[clamp(32px,6vw,68px)] font-bold text-[#2C2416] leading-[0.92] tracking-tight">
            This app is<br />
            <em className="text-[#83934D]">not for everyone.</em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-[14px] sm:text-[16px] text-[#7A6E5F] leading-relaxed"
          >
            And that&apos;s the whole point.
          </motion.p>
        </motion.div>

        {/* ── NOT for pills ── */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {notForPills.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border"
              style={{
                background: 'rgba(44,36,22,0.04)',
                borderColor: 'rgba(44,36,22,0.10)',
              }}
            >
              <span className="text-base">{p.icon}</span>
              <span className="text-[12px] sm:text-[13px] text-[#B0A898] line-through">{p.line}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-10 sm:mb-12"
        >
          <div className="flex-1 h-px" style={{ background: 'rgba(44,36,22,0.12)' }} />
          <span className="font-serif italic text-[#83934D] text-[16px] sm:text-[20px] whitespace-nowrap">
            but it is for this.
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(44,36,22,0.12)' }} />
        </motion.div>

        {/* ── FOR lines ── */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 mb-12 sm:mb-16">
          {forLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.65 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 sm:gap-4 group justify-center"
            >
              <motion.span
                className="text-xl sm:text-2xl flex-shrink-0"
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ delay: i * 1.2, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >{line.emoji}</motion.span>
              <span
                className="text-[15px] sm:text-[18px] font-serif italic leading-snug text-center transition-colors duration-300"
                style={{ color: '#2C2416' }}
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Manifesto card — kept, light frosted ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl px-6 sm:px-12 py-10 sm:py-14"
          style={{
            background: 'rgba(255,255,255,0.58)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.75)',
            boxShadow: '0 8px 40px rgba(44,36,22,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
          }}
        >
          <div className="text-center mb-4">
            <span className="font-serif text-[64px] text-[#83934D] leading-none select-none" style={{ lineHeight: 0.6, opacity: 0.45 }}>&ldquo;</span>
          </div>
          <p className="font-serif text-center text-[clamp(18px,3.5vw,28px)] text-[#2C2416] leading-[1.5] tracking-tight">
            The world has a million apps
            <br />
            <em className="text-[#83934D] not-italic">for everyone.</em>
            <br />
            <span style={{ opacity: 0.6 }}>We made one</span>
            <br />
            for{' '}<em className="text-[#83934D] font-bold">the one.</em>
          </p>
          <div className="text-center mt-6">
            <span className="font-serif text-[64px] text-[#83934D] leading-none select-none" style={{ lineHeight: 0.6, opacity: 0.45 }}>&rdquo;</span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#83934D' }} />
            <span className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#8A7E6E]">Priorities · 2026</span>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#83934D' }} />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
