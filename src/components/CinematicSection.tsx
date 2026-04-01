'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion'

// ─── Scenes ──────────────────────────────────────────────────────────────────
const SCENES = [
  {
    label: null,
    icon: null,
    heading: 'Life is a movie.',
    headingItalic: true,
    body: 'Not every scene needs an audience —',
    bodyEm: 'just the ones who matter.',
    sub: null,
  },
  {
    label: 'Be the main character',
    icon: '🔒',
    heading: 'No algorithm.',
    headingItalic: false,
    body: 'Your feed is yours.',
    bodyEm: null,
    sub: 'Nobody decides what you see, what you miss, or who you become.',
  },
  {
    label: 'Be the main character',
    icon: '👁️',
    heading: 'Only your circle sees.',
    headingItalic: false,
    body: 'Every viewer is someone you chose.',
    bodyEm: null,
    sub: 'What you share stays between the people you let in. Period.',
  },
  {
    label: 'Be the main character',
    icon: '🚫',
    heading: "Don't get lost in the crowd.",
    headingItalic: false,
    body: 'No public feed. No strangers scrolling your life.',
    bodyEm: null,
    sub: "You're not content. Your memories aren't for likes or algorithms.",
  },
  {
    label: 'Be the main character',
    icon: '✨',
    heading: 'No strangers, ever.',
    headingItalic: false,
    body: 'Priorities keeps them where they belong —',
    bodyEm: 'with the people you chose.',
    sub: null,
  },
]

// ─── Floating bubbles — positions & drift driven by scroll ───────────────────
const BUBBLES = [
  { x: 7,   y: 14,  s: 72,  c: '#C9B8CF', dx: 3,  dy: -4  },
  { x: 83,  y: 8,   s: 52,  c: '#F2C4CE', dx: -2, dy: 5   },
  { x: 11,  y: 60,  s: 44,  c: '#B8D4C8', dx: 4,  dy: -3  },
  { x: 75,  y: 65,  s: 80,  c: '#B8C88D', dx: -5, dy: 4   },
  { x: 91,  y: 38,  s: 36,  c: '#E8C99A', dx: 3,  dy: -6  },
  { x: 2,   y: 42,  s: 56,  c: '#E2DCA0', dx: -3, dy: 5   },
  { x: 50,  y: 82,  s: 40,  c: '#FEC8D8', dx: 2,  dy: -4  },
  { x: 34,  y: 6,   s: 32,  c: '#A8D8C0', dx: -4, dy: 3   },
  { x: 60,  y: 50,  s: 60,  c: '#C0AED0', dx: 5,  dy: -5  },
  { x: 20,  y: 86,  s: 28,  c: '#D4A88C', dx: -2, dy: 4   },
  { x: 93,  y: 78,  s: 46,  c: '#A8C8E0', dx: 3,  dy: -3  },
  { x: 44,  y: 26,  s: 24,  c: '#F2C4CE', dx: -4, dy: 6   },
  // film circles — larger, slightly ringed
  { x: 66,  y: 16,  s: 92,  c: '#B8C8D8', dx: -3, dy: -5, ring: true },
  { x: 15,  y: 28,  s: 68,  c: '#F2C4CE', dx: 4,  dy: 3,  ring: true },
  { x: 78,  y: 56,  s: 62,  c: '#D4C8A0', dx: -2, dy: -4, ring: true },
  { x: 38,  y: 70,  s: 50,  c: '#C0D4B8', dx: 5,  dy: 2,  ring: true },
]

// ─── Scene panel ─────────────────────────────────────────────────────────────
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
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity, y }}
    >
      {scene.label && (
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,163,115,0.3)] text-[10px] tracking-[0.18em] uppercase text-[#D4A373] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
            {scene.label}
          </span>
        </div>
      )}

      {scene.icon && (
        <div className="text-[52px] mb-3 leading-none select-none">{scene.icon}</div>
      )}

      <h2
        className="font-serif leading-tight tracking-tight text-[#F0EBE3] mb-4"
        style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontStyle: scene.headingItalic ? 'italic' : 'normal',
          color: scene.headingItalic ? '#D4A373' : '#F0EBE3',
        }}
      >
        {scene.heading}
      </h2>

      <div className="flex items-center gap-3 mb-5 opacity-40">
        <div className="h-px w-12 bg-[#D4A373]" />
        <span className="text-[#D4A373] text-xs">✦</span>
        <div className="h-px w-12 bg-[#D4A373]" />
      </div>

      <p className="text-[#A89E96] font-light leading-snug max-w-lg" style={{ fontSize: 'clamp(16px, 2.5vw, 24px)' }}>
        {scene.body}
        {scene.bodyEm && (
          <>
            {' '}<em className="text-[#F0EBE3] not-italic font-normal">{scene.bodyEm}</em>
          </>
        )}
      </p>

      {scene.sub && (
        <p className="mt-3 text-[13px] text-[#5A5450] max-w-sm leading-relaxed">
          {scene.sub}
        </p>
      )}
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // scrollYProgress goes 0→1 over the full 600vh scroll distance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const N = SCENES.length // 5
  const step = 1 / N     // 0.2 per scene
  const FADE = 0.05       // crossfade overlap

  // Each scene: fades in → holds → fades out
  // Also slight Y parallax on entry/exit (8px) for intimacy
  const sceneOpacities = SCENES.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * step, i * step + FADE, (i + 1) * step - FADE, (i + 1) * step],
      [0, 1, 1, 0]
    )
  )
  const sceneYs = SCENES.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * step, i * step + FADE, (i + 1) * step - FADE, (i + 1) * step],
      [12, 0, 0, -12]
    )
  )

  // Bubble scroll-driven drift — each bubble shifts slightly based on scroll
  // giving a parallax depth feel tied to the scroll position
  const bubbleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Progress dots
  const dotWidths = SCENES.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * step, i * step + step * 0.4, i * step + step * 0.6, (i + 1) * step],
      [6, 22, 22, 6]
    )
  )
  const dotOpacities = SCENES.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * step, i * step + step * 0.3, (i + 1) * step - step * 0.3, (i + 1) * step],
      [0.3, 1, 1, 0.3]
    )
  )

  return (
    // Outer: 600vh tall — this is the scroll spacer
    <div ref={containerRef} style={{ height: '600vh' }}>
      {/* Sticky inner: 100vh, pins to top while container scrolls */}
      <div
        className="sticky top-0 w-full bg-[#100F0D]"
        style={{ height: '100vh' }}
      >
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px',
          }}
        />

        {/* Warm centre vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(212,163,115,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Film-strip perforations on sides */}
        {['left-0', 'right-0'].map((side) => (
          <div
            key={side}
            className={`absolute ${side} top-0 bottom-0 w-5 flex flex-col justify-around py-2 pointer-events-none z-0`}
            style={{ opacity: 0.06 }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-full h-2.5 bg-white rounded-sm" />
            ))}
          </div>
        ))}

        {/* ── Bubble layer — scroll-driven parallax ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {BUBBLES.map((b, i) => {
            // Scroll drives a slow drift — different speed per bubble
            const bx = useTransform(bubbleProgress, [0, 1], [0, b.dx * 18])
            const by = useTransform(bubbleProgress, [0, 1], [0, b.dy * 18])
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: b.s,
                  height: b.s,
                  background: b.c,
                  opacity: (b as any).ring ? 0.45 : 0.5,
                  border: (b as any).ring ? '1.5px solid rgba(255,255,255,0.12)' : 'none',
                  x: bx,
                  y: by,
                }}
                // Gentle idle float on top of scroll-driven position
                animate={{
                  y: [0, -(b.s * 0.18), b.s * 0.1, 0],
                  x: [0, b.s * 0.08, -(b.s * 0.05), 0],
                }}
                transition={{
                  duration: 6 + (i % 5) * 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'mirror',
                  delay: i * 0.3,
                }}
              />
            )
          })}
        </div>

        {/* ── Scene panels — crossfade on scroll ── */}
        <div className="absolute inset-0 z-[2]">
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
                width: dotWidths[i],
                height: 5,
                opacity: dotOpacities[i],
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
