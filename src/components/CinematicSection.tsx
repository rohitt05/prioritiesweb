'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ─── App palette ─────────────────────────────────────────────────────────────────
const P = [
  '#B8C88D','#E9DFB4','#EFBFB3','#A8E6CF','#DDEDC4',
  '#FFD4B8','#FFADAD','#C9E6EE','#FAD1D8','#F2C4D6',
  '#DBC0E7','#F0B2C7','#F0C7DB','#b6e3f4','#c0aede',
  '#ffdfbf','#d1d4f9','#ffd5dc','#f8c8dc','#a8d8ea',
  '#e0bbe4','#fec8d8','#d291bc','#fff2cc','#b9fbc0',
  '#ffc6ff','#fdffb6','#bdb2ff','#a0c4ff','#ffadad',
  '#caffbf','#9bf6ff','#ffc8dd','#d0f4de','#e4c1f9',
]

// ─── Deco bubbles ─────────────────────────────────────────────────────────────────
// dx/dy: scroll drift multiplier (px per full scroll). Kept small for smoothness.
const BUBBLES: Array<{x:number;y:number;s:number;ci:number;dx:number;dy:number;dur:number;delay:number}> = [
  { x:5,   y:10,  s:64,  ci:0,  dx:6,   dy:-8,  dur:9,  delay:0   },
  { x:82,  y:6,   s:48,  ci:1,  dx:-5,  dy:7,   dur:8,  delay:1.2 },
  { x:14,  y:68,  s:56,  ci:2,  dx:7,   dy:-6,  dur:11, delay:0.5 },
  { x:76,  y:72,  s:72,  ci:3,  dx:-6,  dy:8,   dur:10, delay:1.8 },
  { x:90,  y:35,  s:32,  ci:4,  dx:5,   dy:-9,  dur:7,  delay:0.9 },
  { x:3,   y:45,  s:44,  ci:5,  dx:-4,  dy:7,   dur:9,  delay:2.1 },
  { x:55,  y:80,  s:36,  ci:6,  dx:4,   dy:-5,  dur:8,  delay:0.3 },
  { x:38,  y:4,   s:28,  ci:7,  dx:-5,  dy:6,   dur:10, delay:1.5 },
  { x:62,  y:55,  s:52,  ci:8,  dx:6,   dy:-7,  dur:9,  delay:0.7 },
  { x:22,  y:88,  s:24,  ci:9,  dx:-3,  dy:5,   dur:11, delay:2.4 },
  { x:93,  y:80,  s:40,  ci:10, dx:4,   dy:-6,  dur:8,  delay:1.0 },
  { x:47,  y:22,  s:20,  ci:11, dx:-4,  dy:7,   dur:7,  delay:0.6 },
  { x:30,  y:50,  s:30,  ci:12, dx:5,   dy:-4,  dur:10, delay:1.9 },
  { x:70,  y:42,  s:22,  ci:13, dx:-3,  dy:6,   dur:8,  delay:0.2 },
  { x:18,  y:32,  s:18,  ci:14, dx:4,   dy:-5,  dur:9,  delay:2.8 },
  { x:85,  y:22,  s:26,  ci:15, dx:-5,  dy:4,   dur:7,  delay:1.3 },
  { x:42,  y:62,  s:34,  ci:16, dx:3,   dy:-6,  dur:10, delay:0.8 },
  { x:8,   y:28,  s:16,  ci:17, dx:-4,  dy:5,   dur:8,  delay:2.0 },
  { x:65,  y:15,  s:20,  ci:18, dx:5,   dy:-4,  dur:9,  delay:1.1 },
  { x:52,  y:90,  s:28,  ci:19, dx:-3,  dy:6,   dur:11, delay:0.4 },
  { x:25,  y:14,  s:14,  ci:20, dx:4,   dy:-7,  dur:7,  delay:3.0 },
  { x:96,  y:55,  s:18,  ci:21, dx:-5,  dy:5,   dur:8,  delay:1.7 },
  { x:35,  y:35,  s:12,  ci:22, dx:3,   dy:-4,  dur:9,  delay:2.3 },
  { x:78,  y:88,  s:22,  ci:23, dx:-4,  dy:6,   dur:10, delay:0.6 },
  { x:58,  y:30,  s:16,  ci:24, dx:5,   dy:-5,  dur:8,  delay:1.4 },
  { x:10,  y:55,  s:14,  ci:25, dx:-3,  dy:4,   dur:9,  delay:2.6 },
]

// ─── Film circles (photos) ────────────────────────────────────────────────────────────
const FILM_CIRCLES = [
  { x:6,   y:6,   s:108, seed:'moment1', dx:4,   dy:-5,  dur:10, delay:0   },
  { x:78,  y:4,   s:84,  seed:'moment2', dx:-4,  dy:6,   dur:9,  delay:1.2 },
  { x:87,  y:50,  s:96,  seed:'moment3', dx:-3,  dy:-6,  dur:11, delay:0.6 },
  { x:1,   y:52,  s:76,  seed:'moment4', dx:5,   dy:7,   dur:8,  delay:1.8 },
  { x:58,  y:76,  s:90,  seed:'moment5', dx:-5,  dy:-4,  dur:10, delay:0.9 },
  { x:26,  y:70,  s:66,  seed:'moment6', dx:4,   dy:5,   dur:9,  delay:2.1 },
  { x:44,  y:2,   s:72,  seed:'moment7', dx:-3,  dy:-5,  dur:8,  delay:1.5 },
]

// ─── Per-scene glow (light palette) ─────────────────────────────────────────────────
const SCENE_BG = [
  { bg: '#F5F0E8', glow: 'rgba(233,223,180,0.55)' },  // 0 — raffia warm
  { bg: '#EEF0FA', glow: 'rgba(193,174,222,0.50)' },  // 1 — prelude lilac
  { bg: '#EDF5F0', glow: 'rgba(168,230,207,0.50)' },  // 2 — padua mint
  { bg: '#F5EEF0', glow: 'rgba(242,196,214,0.50)' },  // 3 — wePeep blush
  { bg: '#F8F0F4', glow: 'rgba(240,178,199,0.50)' },  // 4 — kobi rose
]

// ─── Scenes ───────────────────────────────────────────────────────────────────
const SCENES = [
  {
    label: 'Be the main character',
    icon: null,
    bigHeading: true,
    heading: 'Life is a movie.',
    body: 'Not every scene needs an audience —',
    bodyEm: 'just the ones who matter.',
    sub: null,
    textColor:     '#2C2416',
    bodyColor:     '#7A6E5F',
    accentColor:   '#83934D',
  },
  {
    label: null,
    icon: '🔒',
    bigHeading: false,
    heading: 'No algorithm.',
    body: 'Your feed is yours.',
    bodyEm: null,
    sub: 'Nobody decides what you see, what you miss, or who you become.',
    textColor:     '#2A2040',
    bodyColor:     '#6B5F80',
    accentColor:   '#7B5EA7',
  },
  {
    label: null,
    icon: '👁️',
    bigHeading: false,
    heading: 'Only your circle sees.',
    body: 'Every viewer is someone you chose.',
    bodyEm: null,
    sub: 'What you share stays between the people you let in. Period.',
    textColor:     '#1A3028',
    bodyColor:     '#4A7060',
    accentColor:   '#44562F',
  },
  {
    label: null,
    icon: '🚫',
    bigHeading: false,
    heading: "Don't get lost in the crowd.",
    body: 'No public feed. No strangers scrolling your life.',
    bodyEm: null,
    sub: "You're not content. Your memories aren't for likes or algorithms.",
    textColor:     '#3A1828',
    bodyColor:     '#7A4A60',
    accentColor:   '#C45C7A',
  },
  {
    label: null,
    icon: '✨',
    bigHeading: false,
    heading: 'No strangers, ever.',
    body: 'Priorities keeps them where they belong —',
    bodyEm: 'with the people you chose.',
    sub: null,
    textColor:     '#2C2416',
    bodyColor:     '#7A6E5F',
    accentColor:   '#83934D',
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
      className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-20 text-center"
      style={{ opacity, y }}
    >
      {scene.label && (
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-medium border"
            style={{
              color: scene.accentColor,
              borderColor: scene.accentColor + '44',
              background: scene.accentColor + '12',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: scene.accentColor }}
            />
            {scene.label}
          </span>
        </div>
      )}

      {scene.icon && (
        <div className="text-[48px] sm:text-[58px] mb-3 leading-none select-none">
          {scene.icon}
        </div>
      )}

      <h2
        className="font-serif tracking-tight leading-[0.95] mb-5"
        style={{
          fontSize: scene.bigHeading ? 'clamp(44px, 7.5vw, 108px)' : 'clamp(30px, 4.5vw, 68px)',
          fontStyle: scene.bigHeading ? 'italic' : 'normal',
          color: scene.bigHeading ? scene.accentColor : scene.textColor,
        }}
      >
        {scene.heading}
      </h2>

      <div className="flex items-center gap-3 mb-5" style={{ opacity: 0.4 }}>
        <div className="h-px w-10 sm:w-14" style={{ background: scene.accentColor }} />
        <span className="text-xs" style={{ color: scene.accentColor }}>✦</span>
        <div className="h-px w-10 sm:w-14" style={{ background: scene.accentColor }} />
      </div>

      <p
        className="font-light leading-relaxed max-w-lg"
        style={{ fontSize: 'clamp(15px, 2vw, 21px)', color: scene.bodyColor }}
      >
        {scene.body}
        {scene.bodyEm && (
          <> <em className="not-italic font-normal" style={{ color: scene.textColor }}>{scene.bodyEm}</em></>
        )}
      </p>

      {scene.sub && (
        <p
          className="mt-3 max-w-sm leading-relaxed"
          style={{ fontSize: 'clamp(11px, 1.3vw, 13px)', color: scene.bodyColor, opacity: 0.7 }}
        >
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

  // ✔ Spring-smooth version of scroll progress — eliminates all jitter
  // stiffness + damping tuned for a buttery, not laggy, feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.0001,
  })

  const N    = SCENES.length  // 5
  const step = 1 / N          // 0.20
  const FIN  = 0.05
  const FOUT = 0.05

  // All motion values derived from smoothProgress — no more per-bubble useTransform in map
  const sceneOpacities = SCENES.map((_, i) =>
    useTransform(smoothProgress,
      [i*step, i*step+FIN, (i+1)*step-FOUT, (i+1)*step],
      [0, 1, 1, 0]
    )
  )
  const sceneYs = SCENES.map((_, i) =>
    useTransform(smoothProgress,
      [i*step, i*step+FIN, (i+1)*step-FOUT, (i+1)*step],
      [14, 0, 0, -14]
    )
  )

  // Background color crossfade between scenes
  const bgIndex = useTransform(smoothProgress, [0, 1], [0, N - 1])

  // Scene bg opacity per scene
  const bgOps = SCENE_BG.map((_, i) =>
    useTransform(smoothProgress,
      [i*step, i*step+FIN, (i+1)*step-FOUT, (i+1)*step],
      [0, 1, 1, 0]
    )
  )

  // Bubble drift — computed ONCE per bubble, not in render loop
  // dx/dy are small so movement is subtle and smooth
  const bubbleDrifts = BUBBLES.map((b) => ({
    x: useTransform(smoothProgress, [0, 1], [0, b.dx]),
    y: useTransform(smoothProgress, [0, 1], [0, b.dy]),
  }))
  const filmDrifts = FILM_CIRCLES.map((f) => ({
    x: useTransform(smoothProgress, [0, 1], [0, f.dx]),
    y: useTransform(smoothProgress, [0, 1], [0, f.dy]),
  }))

  // Dots
  const dotWidths = SCENES.map((_, i) =>
    useTransform(smoothProgress,
      [i*step, i*step+step*0.3, (i+1)*step-step*0.3, (i+1)*step],
      [5, 22, 22, 5]
    )
  )
  const dotOps = SCENES.map((_, i) =>
    useTransform(smoothProgress,
      [i*step, i*step+step*0.3, (i+1)*step-step*0.3, (i+1)*step],
      [0.22, 1, 1, 0.22]
    )
  )

  return (
    <div ref={containerRef} style={{ height: '650vh' }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100svh' }}>

        {/* Per-scene background layers */}
        {SCENE_BG.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 z-0"
            style={{
              opacity: bgOps[i],
              background: `radial-gradient(ellipse 100% 100% at 50% 50%, ${s.glow} 0%, ${s.bg} 55%, ${s.bg} 100%)`,
            }}
          />
        ))}

        {/* Subtle paper texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        {/* ── Deco bubbles ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {BUBBLES.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left:   `${b.x}%`,
                top:    `${b.y}%`,
                width:  b.s,
                height: b.s,
                background: P[b.ci % P.length],
                opacity: 0.55,
                x: bubbleDrifts[i].x,
                y: bubbleDrifts[i].y,
              }}
              animate={{
                y:     [0, -(b.s * 0.18), b.s * 0.10, 0],
                x:     [0,  b.s * 0.08,  -(b.s * 0.05), 0],
                scale: [1,  1.03, 0.98, 1],
              }}
              transition={{
                duration: b.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
                delay: b.delay,
              }}
            />
          ))}
        </div>

        {/* ── Film circles with photos ── */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {FILM_CIRCLES.map((f, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full overflow-hidden"
              style={{
                left:   `${f.x}%`,
                top:    `${f.y}%`,
                width:  f.s,
                height: f.s,
                opacity: 0.82,
                boxShadow: '0 2px 0 2px rgba(255,255,255,0.55), 0 6px 28px rgba(0,0,0,0.12)',
                x: filmDrifts[i].x,
                y: filmDrifts[i].y,
              }}
              animate={{
                y:      [0, -(f.s * 0.12), f.s * 0.07, 0],
                x:      [0,  f.s * 0.05,  -(f.s * 0.03), 0],
                rotate: [0, 1.2, -0.8, 0],
              }}
              transition={{
                duration: f.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
                delay: f.delay,
              }}
            >
              <img
                src={`https://picsum.photos/seed/${f.seed}/220/220`}
                alt=""
                width={f.s}
                height={f.s}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
              {/* Light inner shadow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.3)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Scene text ── */}
        <div className="absolute inset-0 z-[4]">
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
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 pointer-events-none">
          {SCENES.map((scene, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width:      dotWidths[i],
                height:     5,
                opacity:    dotOps[i],
                background: scene.accentColor,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
