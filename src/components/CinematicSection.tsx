'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ─── Persistent floating bubbles (always in BG across all scenes) ───────────
const BUBBLES = [
  { x: '6%',  y: '15%', size: 68,  color: '#C9E6EE', floatX: 8,  floatY: 18, dur: 7  },
  { x: '82%', y: '10%', size: 50,  color: '#FAD1D8', floatX: -6, floatY: 14, dur: 9  },
  { x: '12%', y: '62%', size: 42,  color: '#DBC0E7', floatX: 10, floatY: 20, dur: 8  },
  { x: '76%', y: '68%', size: 78,  color: '#B8C88D', floatX: -8, floatY: 12, dur: 11 },
  { x: '90%', y: '38%', size: 34,  color: '#FFD4B8', floatX: 6,  floatY: 16, dur: 6  },
  { x: '3%',  y: '40%', size: 54,  color: '#E9DFB4', floatX: 12, floatY: 10, dur: 10 },
  { x: '50%', y: '85%', size: 38,  color: '#FEC8D8', floatX: -4, floatY: 22, dur: 8  },
  { x: '33%', y: '8%',  size: 30,  color: '#A8E6CF', floatX: 8,  floatY: 14, dur: 7  },
  { x: '60%', y: '52%', size: 58,  color: '#C0AEDE', floatX: -10,floatY: 18, dur: 9  },
  { x: '20%', y: '88%', size: 26,  color: '#DDB892', floatX: 6,  floatY: 10, dur: 12 },
  { x: '93%', y: '80%', size: 44,  color: '#B6E3F4', floatX: -6, floatY: 16, dur: 8  },
  { x: '44%', y: '28%', size: 22,  color: '#FAD1D8', floatX: 4,  floatY: 20, dur: 6  },
]

const FILM_CIRCLES = [
  { x: '66%', y: '18%', size: 88,  color: '#C9E6EE', floatY: -16, dur: 9,  ring: true  },
  { x: '16%', y: '32%', size: 66,  color: '#FAD1D8', floatY: 12,  dur: 11, ring: false },
  { x: '80%', y: '60%', size: 60,  color: '#DDB892', floatY: -10, dur: 8,  ring: true  },
  { x: '38%', y: '72%', size: 48,  color: '#B8C88D', floatY: 14,  dur: 10, ring: false },
]

// ─── 5 scenes ────────────────────────────────────────────────────────────────
const SCENES = [
  {
    // Scene 0 — opening
    label: null,
    headline: null,
    bigLine1: 'Life is a',
    bigLine2: 'movie.',
    body: 'Not every scene needs an audience —',
    bodyItalic: 'just the ones who matter.',
    sub: null,
    pill: null,
  },
  {
    label: 'Be the main character',
    headline: '🔒',
    bigLine1: null,
    bigLine2: null,
    body: 'No algorithm.',
    bodyItalic: 'Your feed is yours.',
    sub: 'Nobody decides what you see, what you miss, or who you become.',
    pill: '#D4A373',
  },
  {
    label: 'Be the main character',
    headline: '👁️',
    bigLine1: null,
    bigLine2: null,
    body: 'Only your circle sees.',
    bodyItalic: 'Every viewer is someone you chose.',
    sub: 'What you share stays between the people you let in. Period.',
    pill: '#B8C88D',
  },
  {
    label: 'Be the main character',
    headline: '🚫',
    bigLine1: null,
    bigLine2: null,
    body: "Don't get lost in the crowd.",
    bodyItalic: 'No public feed. No strangers scrolling your life.',
    sub: "You're not content. Your memories aren't for likes or algorithms.",
    pill: '#C0AEDE',
  },
  {
    label: 'Be the main character',
    headline: '✨',
    bigLine1: null,
    bigLine2: null,
    body: 'No strangers, ever.',
    bodyItalic: 'Priorities keeps them where they belong —',
    sub: 'with the people you chose.',
    pill: '#FAD1D8',
  },
]

// ─── Floating bubble component ────────────────────────────────────────────────
function Bubble({ b }: { b: typeof BUBBLES[0] }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: b.x, top: b.y, width: b.size, height: b.size, background: b.color, opacity: 0.55 }}
      animate={{
        y: [0, -b.floatY, b.floatY * 0.4, 0],
        x: [0, b.floatX * 0.5, -b.floatX * 0.3, 0],
      }}
      transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
    />
  )
}

function FilmCircle({ f }: { f: typeof FILM_CIRCLES[0] }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none overflow-hidden"
      style={{
        left: f.x, top: f.y,
        width: f.size, height: f.size,
        background: f.color,
        opacity: 0.6,
        border: f.ring ? '2px solid rgba(255,255,255,0.15)' : 'none',
        boxShadow: f.ring ? '0 0 0 4px rgba(255,255,255,0.04)' : 'none',
      }}
      animate={{ y: [0, f.floatY, 0], rotate: [0, 2, -1, 0] }}
      transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
    />
  )
}

// ─── Single scene panel ───────────────────────────────────────────────────────
function ScenePanel({
  scene,
  opacity,
}: {
  scene: typeof SCENES[0]
  opacity: MotionValue<number>
}) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center"
      style={{ opacity }}
    >
      {/* Label */}
      {scene.label && (
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,163,115,0.25)] text-[11px] tracking-[0.15em] uppercase text-[#D4A373] font-medium">
            <span className="w-1 h-1 rounded-full bg-[#D4A373] animate-pulse" />
            {scene.label}
          </span>
        </div>
      )}

      {/* Big icon for privacy scenes */}
      {scene.headline && (
        <div className="text-[56px] sm:text-[72px] mb-4 leading-none">{scene.headline}</div>
      )}

      {/* Opening headline */}
      {scene.bigLine1 && (
        <div className="mb-2">
          <h2 className="font-serif text-[clamp(52px,12vw,140px)] font-bold leading-[0.85] tracking-tight text-[#F5F0E8]">
            {scene.bigLine1}
          </h2>
          <h2 className="font-serif text-[clamp(52px,12vw,140px)] font-bold leading-[0.85] tracking-tight italic text-[#D4A373]">
            {scene.bigLine2}
          </h2>
        </div>
      )}

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px w-10 sm:w-16 bg-[rgba(212,163,115,0.25)]" />
        <span className="text-[#D4A373] text-sm">✦</span>
        <div className="h-px w-10 sm:w-16 bg-[rgba(212,163,115,0.25)]" />
      </div>

      {/* Body */}
      <p className="text-[20px] sm:text-[26px] md:text-[32px] text-[#B8AFA3] font-light leading-snug max-w-xl">
        {scene.body}
        {scene.bodyItalic && (
          <><br className="hidden sm:block" />
          <em className="text-[#F5F0E8] font-normal"> {scene.bodyItalic}</em></>
        )}
      </p>

      {/* Sub */}
      {scene.sub && (
        <p className="mt-4 text-[13px] sm:text-[15px] text-[#6E6660] max-w-md leading-relaxed">
          {scene.sub}
        </p>
      )}
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Each scene occupies 1/5 of scroll range
  // Scene i is fully visible in its window, dissolves in/out at edges
  const sceneCount = SCENES.length // 5
  const step = 1 / sceneCount      // 0.2 each
  const fade = 0.06                // crossfade overlap

  const sceneOpacities = SCENES.map((_, i) => {
    const start  = i * step
    const peak1  = start + fade
    const peak2  = start + step - fade
    const end    = start + step
    return useTransform(
      scrollYProgress,
      [start, peak1, peak2, end],
      [0,     1,     1,     0]
    )
  })

  // Overall section fades out after last scene
  const wrapperOp = useTransform(scrollYProgress, [0.88, 1], [1, 0])

  return (
    <div ref={containerRef} style={{ height: '550vh' }} className="relative">
      <motion.div
        className="sticky top-0 w-full overflow-hidden bg-[#141210]"
        style={{ height: '100svh', opacity: wrapperOp }}
      >
        {/* Film grain */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '120px',
          }}
        />

        {/* Warm center glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(212,163,115,0.06) 0%, transparent 70%)' }}
        />

        {/* Film strip edges */}
        {(['left-0', 'right-0'] as const).map((side) => (
          <div key={side} className={`absolute ${side} top-0 bottom-0 w-6 flex flex-col justify-between py-3 opacity-[0.07] pointer-events-none z-0`}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="w-full h-3 bg-white rounded-[2px]" />
            ))}
          </div>
        ))}

        {/* ── Persistent floating layer (bubbles + film circles) ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {BUBBLES.map((b, i) => <Bubble key={i} b={b} />)}
          {FILM_CIRCLES.map((f, i) => <FilmCircle key={i} f={f} />)}
        </div>

        {/* ── Scene panels — crossfade on top of bubble layer ── */}
        <div className="absolute inset-0 z-[2]">
          {SCENES.map((scene, i) => (
            <ScenePanel key={i} scene={scene} opacity={sceneOpacities[i]} />
          ))}
        </div>

        {/* Scroll progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none">
          {SCENES.map((_, i) => {
            const dotOp = useTransform(
              scrollYProgress,
              [i * step, i * step + step * 0.5, i * step + step],
              [0.25, 1, 0.25]
            )
            return (
              <motion.div
                key={i}
                className="rounded-full bg-[#D4A373]"
                style={{
                  opacity: dotOp,
                  width: useTransform(scrollYProgress,
                    [i * step, i * step + step * 0.5, i * step + step],
                    [6, 20, 6]
                  ),
                  height: 6,
                }}
              />
            )
          })}
        </div>

      </motion.div>
    </div>
  )
}
