'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ─── Floating elements data (bubbles + film circles) ───────────────────────
const BUBBLES = [
  { x: '8%',  y: '18%', size: 72,  color: '#C9E6EE', delay: 0 },
  { x: '80%', y: '12%', size: 52,  color: '#FAD1D8', delay: 0.3 },
  { x: '15%', y: '65%', size: 44,  color: '#DBC0E7', delay: 0.6 },
  { x: '75%', y: '70%', size: 80,  color: '#B8C88D', delay: 0.2 },
  { x: '88%', y: '40%', size: 36,  color: '#FFD4B8', delay: 0.8 },
  { x: '5%',  y: '42%', size: 56,  color: '#E9DFB4', delay: 0.4 },
  { x: '50%', y: '82%', size: 40,  color: '#FEC8D8', delay: 1.0 },
  { x: '35%', y: '10%', size: 32,  color: '#A8E6CF', delay: 0.5 },
  { x: '62%', y: '55%', size: 60,  color: '#C0AEDE', delay: 0.7 },
  { x: '22%', y: '88%', size: 28,  color: '#DDB892', delay: 0.9 },
  { x: '92%', y: '82%', size: 44,  color: '#B6E3F4', delay: 0.1 },
  { x: '44%', y: '30%', size: 24,  color: '#FAD1D8', delay: 1.2 },
]

const FILM_CIRCLES = [
  { x: '68%', y: '22%', size: 90,  color: '#C9E6EE', hasPhoto: true },
  { x: '18%', y: '35%', size: 70,  color: '#FAD1D8', hasPhoto: false },
  { x: '78%', y: '58%', size: 64,  color: '#DDB892', hasPhoto: false },
]

const PRIVACY_STEPS = [
  { icon: '🔒', title: 'No algorithm',        sub: 'Your feed is yours. Nobody decides what you see.' },
  { icon: '👁️', title: 'Only your circle sees', sub: 'What you share stays between the people you chose.' },
  { icon: '🚫', title: 'No public feed',        sub: "Don't get lost in the crowd. You're not content." },
  { icon: '✨', title: 'No strangers, ever',    sub: 'Every viewer is someone you invited. Always.' },
]

// ─── Single floating bubble ────────────────────────────────────────────────
function FloatingBubble({ b, progress }: { b: typeof BUBBLES[0]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.05, 0.2, 0.75, 0.9], [0, 1, 1, 0])
  const scale   = useTransform(progress, [0.05, 0.25], [0.4, 1])
  const sp      = useSpring(scale, { stiffness: 50, damping: 16 })

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: b.x, top: b.y,
        width: b.size, height: b.size,
        background: b.color,
        opacity,
        scale: sp,
      }}
      animate={{ y: [0, -18, 0, 10, 0], x: [0, 6, -4, 0] }}
      transition={{
        duration: 6 + b.delay * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: b.delay,
      }}
    />
  )
}

// ─── Film circle (photo bubble) ───────────────────────────────────────────
function FilmCircle({ f, progress }: { f: typeof FILM_CIRCLES[0]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.1, 0.3, 0.75, 0.88], [0, 1, 1, 0])
  const scale   = useTransform(progress, [0.1, 0.3], [0.5, 1])
  const sp      = useSpring(scale, { stiffness: 45, damping: 14 })

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none overflow-hidden border-2 border-white/20 shadow-lg"
      style={{
        left: f.x, top: f.y,
        width: f.size, height: f.size,
        background: f.color,
        opacity,
        scale: sp,
      }}
      animate={{ y: [0, -14, 4, 0], rotate: [0, 2, -1, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {f.hasPhoto && (
        <div className="w-full h-full flex items-end justify-end p-1">
          <span className="text-[9px] text-white/60">So many left</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────
export default function CinematicSection() {
  // Tall scroll container — 500vh gives us room to animate through 4 steps
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Overall section fade-out near the end
  const sectionOpacity = useTransform(scrollYProgress, [0.82, 0.98], [1, 0])

  // Headline animations — come in early
  const headlineOp = useTransform(scrollYProgress, [0.02, 0.15], [0, 1])
  const headlineY  = useSpring(
    useTransform(scrollYProgress, [0.02, 0.15], [60, 0]),
    { stiffness: 60, damping: 18 }
  )

  // Subline
  const subOp = useTransform(scrollYProgress, [0.08, 0.22], [0, 1])
  const subY  = useSpring(
    useTransform(scrollYProgress, [0.08, 0.22], [40, 0]),
    { stiffness: 60, damping: 18 }
  )

  // Each privacy step reveals at evenly-spaced scroll positions
  const stepRanges = [
    [0.18, 0.32],
    [0.35, 0.48],
    [0.51, 0.64],
    [0.67, 0.80],
  ]

  return (
    // Tall container that pins the sticky child
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      {/* Sticky panel */}
      <motion.div
        className="sticky top-0 left-0 w-full overflow-hidden bg-[#1A1612]"
        style={{ height: '100svh', opacity: sectionOpacity }}
      >
        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }}
        />

        {/* Center warm glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,163,115,0.07) 0%, transparent 70%)' }}
        />

        {/* Film strip edges */}
        <div className="absolute left-0 top-0 bottom-0 w-7 flex flex-col justify-between py-4 opacity-[0.08] pointer-events-none z-0">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-full h-3.5 bg-white rounded-sm" />)}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-7 flex flex-col justify-between py-4 opacity-[0.08] pointer-events-none z-0">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-full h-3.5 bg-white rounded-sm" />)}
        </div>

        {/* ── Floating bubbles layer ── */}
        <div className="absolute inset-0 z-0">
          {BUBBLES.map((b, i) => <FloatingBubble key={i} b={b} progress={scrollYProgress} />)}
          {FILM_CIRCLES.map((f, i) => <FilmCircle key={i} f={f} progress={scrollYProgress} />)}
        </div>

        {/* ── Content layer ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-10 text-center">

          {/* Label */}
          <motion.div style={{ opacity: headlineOp, y: headlineY }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,163,115,0.25)] text-[11px] tracking-[0.15em] uppercase text-[#D4A373] font-medium">
              <span className="w-1 h-1 rounded-full bg-[#D4A373] animate-pulse" />
              Be the main character
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div style={{ opacity: headlineOp, y: headlineY }}>
            <h2 className="font-serif text-[clamp(48px,11vw,130px)] font-bold leading-[0.85] tracking-tight text-[#F5F0E8]">
              Life is a
            </h2>
            <h2 className="font-serif text-[clamp(48px,11vw,130px)] font-bold leading-[0.85] tracking-tight italic text-[#D4A373] mb-2">
              movie.
            </h2>
          </motion.div>

          {/* Divider */}
          <motion.div style={{ opacity: subOp }} className="my-6 flex items-center gap-4">
            <div className="h-px w-10 sm:w-16 bg-[rgba(212,163,115,0.3)]" />
            <span className="text-[#D4A373]">✦</span>
            <div className="h-px w-10 sm:w-16 bg-[rgba(212,163,115,0.3)]" />
          </motion.div>

          {/* Subline */}
          <motion.p
            style={{ opacity: subOp, y: subY }}
            className="text-[17px] sm:text-[21px] md:text-[24px] text-[#B8AFA3] leading-relaxed max-w-xl font-light"
          >
            Not every scene needs an audience —
            <br className="hidden sm:block" />
            <em className="text-[#F5F0E8] font-normal"> just the ones who matter.</em>
          </motion.p>

          {/* Privacy micro-copy */}
          <motion.p
            style={{ opacity: subOp, y: subY }}
            className="mt-4 text-[12px] sm:text-[13px] text-[#7A7168] max-w-sm leading-relaxed"
          >
            Your memories aren't content. They're not for likes, strangers, or algorithms.
            Don't get lost in the crowd — Priorities keeps them exactly where they belong,
            with the people you chose.
          </motion.p>

          {/* Privacy steps — reveal one by one as user scrolls */}
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 max-w-2xl">
            {PRIVACY_STEPS.map((step, i) => {
              const [from, to] = stepRanges[i]
              const op  = useTransform(scrollYProgress, [from, to], [0, 1])
              const y   = useSpring(
                useTransform(scrollYProgress, [from, to], [28, 0]),
                { stiffness: 60, damping: 16 }
              )
              const sc  = useSpring(
                useTransform(scrollYProgress, [from, to], [0.8, 1]),
                { stiffness: 60, damping: 16 }
              )
              return (
                <motion.div
                  key={i}
                  style={{ opacity: op, y, scale: sc }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.09)] backdrop-blur-sm"
                >
                  <span className="text-lg leading-none">{step.icon}</span>
                  <div className="text-left">
                    <div className="text-[12px] sm:text-[13px] font-semibold text-[#F5F0E8]">{step.title}</div>
                    <div className="text-[10px] sm:text-[11px] text-[#7A7168] leading-tight">{step.sub}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </motion.div>
    </div>
  )
}
