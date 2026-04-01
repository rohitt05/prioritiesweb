'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

// ─── Film circles with photo images ──────────────────────────────────────────
// Using picsum with consistent seeds for portrait-style images
const FILM_CIRCLES = [
  { x: 6,   y: 8,   s: 110, img: 'https://picsum.photos/seed/film1/200/200',  dx: 2,  dy: -3, delay: 0   },
  { x: 78,  y: 5,   s: 82,  img: 'https://picsum.photos/seed/film2/200/200',  dx: -3, dy: 4,  delay: 1.2 },
  { x: 88,  y: 52,  s: 96,  img: 'https://picsum.photos/seed/film3/200/200',  dx: -2, dy: -4, delay: 0.6 },
  { x: 2,   y: 55,  s: 74,  img: 'https://picsum.photos/seed/film4/200/200',  dx: 3,  dy: 5,  delay: 1.8 },
  { x: 60,  y: 78,  s: 88,  img: 'https://picsum.photos/seed/film5/200/200',  dx: -4, dy: -3, delay: 0.9 },
  { x: 28,  y: 72,  s: 64,  img: 'https://picsum.photos/seed/film6/200/200',  dx: 2,  dy: 4,  delay: 2.1 },
  { x: 46,  y: 4,   s: 70,  img: 'https://picsum.photos/seed/film7/200/200',  dx: -1, dy: -5, delay: 1.5 },
]

// ─── Plain pastel bubbles for depth ──────────────────────────────────────────
const BUBBLES = [
  { x: 18,  y: 20,  s: 48,  c: '#C9B8CF', dx: 3,  dy: -4, delay: 0.3 },
  { x: 70,  y: 28,  s: 36,  c: '#F2C4CE', dx: -2, dy: 5,  delay: 1.0 },
  { x: 12,  y: 80,  s: 40,  c: '#B8D4C8', dx: 4,  dy: -3, delay: 0.7 },
  { x: 82,  y: 75,  s: 52,  c: '#B8C88D', dx: -3, dy: 4,  delay: 1.4 },
  { x: 50,  y: 42,  s: 28,  c: '#E8C99A', dx: 2,  dy: -5, delay: 0.5 },
  { x: 36,  y: 14,  s: 32,  c: '#E2DCA0', dx: -4, dy: 3,  delay: 1.8 },
  { x: 92,  y: 20,  s: 24,  c: '#FEC8D8', dx: 3,  dy: -2, delay: 2.2 },
  { x: 55,  y: 60,  s: 20,  c: '#A8D8C0', dx: -2, dy: 4,  delay: 0.4 },
]

// ─── Per-scene glow color (shifts the warm centre vignette) ───────────────────
const SCENE_GLOW = [
  'rgba(212,163,115,0.10)',  // scene 0 — warm amber (opening)
  'rgba(180,140,200,0.09)',  // scene 1 — soft purple (privacy/lock)
  'rgba(140,180,160,0.09)',  // scene 2 — soft green (circle)
  'rgba(160,140,200,0.09)',  // scene 3 — indigo (crowd)
  'rgba(212,163,115,0.11)',  // scene 4 — amber again (conclusion)
]

// ─── Scenes ───────────────────────────────────────────────────────────────────
const SCENES = [
  {
    label: 'Be the main character',  // ONLY scene 0 has the label
    icon: null,
    bigHeading: true,
    heading: 'Life is a movie.',
    body: 'Not every scene needs an audience —',
    bodyEm: 'just the ones who matter.',
    sub: null,
    pill: null,
  },
  {
    label: null,
    icon: '🔒',
    bigHeading: false,
    heading: 'No algorithm.',
    body: 'Your feed is yours.',
    bodyEm: null,
    sub: 'Nobody decides what you see, what you miss, or who you become.',
    pill: '#C9B8CF',
  },
  {
    label: null,
    icon: '👁️',
    bigHeading: false,
    heading: 'Only your circle sees.',
    body: 'Every viewer is someone you chose.',
    bodyEm: null,
    sub: 'What you share stays between the people you let in. Period.',
    pill: '#B8D4C8',
  },
  {
    label: null,
    icon: '🚫',
    bigHeading: false,
    heading: "Don't get lost in the crowd.",
    body: 'No public feed. No strangers scrolling your life.',
    bodyEm: null,
    sub: "You're not content. Your memories aren't for likes or algorithms.",
    pill: '#B8C88D',
  },
  {
    label: null,
    icon: '✨',
    bigHeading: false,
    heading: 'No strangers, ever.',
    body: 'Priorities keeps them where they belong —',
    bodyEm: 'with the people you chose.',
    sub: null,
    pill: '#F2C4CE',
  },
]

// ─── Scene panel ──────────────────────────────────────────────────────────────
function ScenePanel({
  scene,
  opacity,
  y,
}: {
  scene: (typeof SCENES)[0]
  opacity: MotionValue<number>
  y: MotionValue<number>
}) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-16 text-center"
      style={{ opacity, y }}
    >
      {/* Label — only scene 0 */}
      {scene.label && (
        <motion.div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,163,115,0.30)] text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#D4A373] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
            {scene.label}
          </span>
        </motion.div>
      )}

      {/* Icon for privacy scenes */}
      {scene.icon && (
        <div className="text-[48px] sm:text-[60px] mb-3 leading-none select-none">
          {scene.icon}
        </div>
      )}

      {/* Heading */}
      <h2
        className="font-serif tracking-tight leading-[0.95] mb-5"
        style={{
          fontSize: scene.bigHeading ? 'clamp(48px, 8vw, 110px)' : 'clamp(32px, 5vw, 72px)',
          fontStyle: scene.bigHeading ? 'italic' : 'normal',
          color: scene.bigHeading ? '#D4A373' : '#F0EBE3',
          textShadow: '0 2px 40px rgba(0,0,0,0.5)',
        }}
      >
        {scene.heading}
      </h2>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5" style={{ opacity: 0.35 }}>
        <div className="h-px w-10 sm:w-16 bg-[#D4A373]" />
        <span className="text-[#D4A373] text-xs">✦</span>
        <div className="h-px w-10 sm:w-16 bg-[#D4A373]" />
      </div>

      {/* Body */}
      <p
        className="text-[#A89E96] font-light leading-relaxed max-w-lg"
        style={{ fontSize: 'clamp(15px, 2.2vw, 22px)' }}
      >
        {scene.body}
        {scene.bodyEm && (
          <> <em className="text-[#F0EBE3] not-italic font-normal">{scene.bodyEm}</em></>
        )}
      </p>

      {/* Sub */}
      {scene.sub && (
        <p className="mt-3 max-w-sm leading-relaxed text-[#574F4A]" style={{ fontSize: 'clamp(12px, 1.4vw, 14px)' }}>
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

  const N    = SCENES.length  // 5
  const step = 1 / N          // 0.20 per scene
  // Each scene: 8% fade-in, 64% hold, 8% fade-out — leaves 20% per scene window total
  const FADE_IN  = 0.05
  const FADE_OUT = 0.05

  const sceneOpacities = SCENES.map((_, i) =>
    useTransform(
      scrollYProgress,
      [
        i * step,
        i * step + FADE_IN,
        (i + 1) * step - FADE_OUT,
        (i + 1) * step,
      ],
      [0, 1, 1, 0]
    )
  )

  const sceneYs = SCENES.map((_, i) =>
    useTransform(
      scrollYProgress,
      [
        i * step,
        i * step + FADE_IN,
        (i + 1) * step - FADE_OUT,
        (i + 1) * step,
      ],
      [16, 0, 0, -16]
    )
  )

  // Per-scene background glow color — interpolated from SCENE_GLOW
  // We derive an opacity-of-overlay approach: show glow[i] when scene i is active
  const glowOpacities = SCENE_GLOW.map((_, i) =>
    useTransform(
      scrollYProgress,
      [
        i * step,
        i * step + FADE_IN,
        (i + 1) * step - FADE_OUT,
        (i + 1) * step,
      ],
      [0, 1, 1, 0]
    )
  )

  // Bubble scroll drift
  const bDrifts = BUBBLES.map((b) => ({
    bx: useTransform(scrollYProgress, [0, 1], [0, b.dx * 22]),
    by: useTransform(scrollYProgress, [0, 1], [0, b.dy * 22]),
  }))

  // Film circle scroll drift
  const fDrifts = FILM_CIRCLES.map((f) => ({
    fx: useTransform(scrollYProgress, [0, 1], [0, f.dx * 28]),
    fy: useTransform(scrollYProgress, [0, 1], [0, f.dy * 28]),
  }))

  // Progress dots
  const dotWidths    = SCENES.map((_, i) =>
    useTransform(scrollYProgress,
      [i * step, i * step + step * 0.3, (i + 1) * step - step * 0.3, (i + 1) * step],
      [5, 22, 22, 5]
    )
  )
  const dotOpacities = SCENES.map((_, i) =>
    useTransform(scrollYProgress,
      [i * step, i * step + step * 0.3, (i + 1) * step - step * 0.3, (i + 1) * step],
      [0.25, 1, 1, 0.25]
    )
  )

  return (
    <div ref={containerRef} style={{ height: '650vh' }}>
      <div className="sticky top-0 w-full overflow-hidden bg-[#0E0D0B]" style={{ height: '100svh' }}>

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '160px',
          }}
        />

        {/* Per-scene glow overlays — each fades in with its scene */}
        {SCENE_GLOW.map((color, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              opacity: glowOpacities[i],
              background: `radial-gradient(ellipse 70% 55% at 50% 50%, ${color} 0%, transparent 68%)`,
            }}
          />
        ))}

        {/* Film-strip perforations */}
        {(['left-0', 'right-0'] as const).map((side) => (
          <div
            key={side}
            className={`absolute ${side} top-0 bottom-0 w-5 flex flex-col justify-around py-2 pointer-events-none z-0`}
            style={{ opacity: 0.055 }}
          >
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} className="w-full h-2.5 bg-white rounded-sm" />
            ))}
          </div>
        ))}

        {/* ── Plain pastel bubbles — scroll parallax + idle float ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {BUBBLES.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${b.x}%`,
                top:  `${b.y}%`,
                width:  b.s,
                height: b.s,
                background: b.c,
                opacity: 0.38,
                filter: 'blur(1px)',
                x: bDrifts[i].bx,
                y: bDrifts[i].by,
              }}
              animate={{
                y:    [0, -(b.s * 0.22), b.s * 0.12, 0],
                x:    [0,  b.s * 0.10,  -(b.s * 0.06), 0],
                scale:[1,  1.04,         0.97,          1],
              }}
              transition={{
                duration: 7 + (i % 4) * 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
                delay: b.delay,
              }}
            />
          ))}
        </div>

        {/* ── Film circles with photos — scroll parallax + idle float ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {FILM_CIRCLES.map((f, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full overflow-hidden"
              style={{
                left:   `${f.x}%`,
                top:    `${f.y}%`,
                width:  f.s,
                height: f.s,
                opacity: 0.72,
                boxShadow: '0 0 0 2px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.35)',
                x: fDrifts[i].fx,
                y: fDrifts[i].fy,
              }}
              animate={{
                y:    [0, -(f.s * 0.14), f.s * 0.08, 0],
                x:    [0,  f.s * 0.06,  -(f.s * 0.04), 0],
                rotate: [0, 1.5, -1, 0],
              }}
              transition={{
                duration: 8 + (i % 5) * 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
                delay: f.delay,
              }}
            >
              {/* Photo fill */}
              <img
                src={f.img}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
              {/* Soft dark overlay so text is always legible in centre */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle at 60% 60%, transparent 40%, rgba(0,0,0,0.25) 100%)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Scene text panels — crossfade on scroll ── */}
        <div className="absolute inset-0 z-[3]">
          {SCENES.map((scene, i) => (
            <ScenePanel
              key={i}
              scene={scene}
              opacity={sceneOpacities[i]}
              y={sceneYs[i]}
            />
          ))}
        </div>

        {/* ── Progress dots ── */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
          {SCENES.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-[#D4A373]"
              style={{
                width:   dotWidths[i],
                height:  5,
                opacity: dotOpacities[i],
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
