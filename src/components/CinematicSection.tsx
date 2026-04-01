'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion'

// ─── App palette ─────────────────────────────────────────────────────────────────
const P = [
  '#B8C88D','#E9DFB4','#EFBFB3','#A8E6CF','#DDEDC4',
  '#FFD4B8','#FFADAD','#C9E6EE','#FAD1D8','#F2C4D6',
  '#DBC0E7','#F0B2C7','#F0C7DB','#b6e3f4','#c0aede',
  '#ffdfbf','#d1d4f9','#ffd5dc','#f8c8dc','#a8d8ea',
  '#e0bbe4','#fec8d8','#d291bc','#fff2cc','#b9fbc0',
  '#ffc6ff','#fdffb6','#bdb2ff','#a0c4ff','#caffbf',
  '#9bf6ff','#ffc8dd','#d0f4de','#e4c1f9','#ffadad',
]

// Photo seeds for film circles
const PHOTO_SEEDS = [
  'moment1','moment2','moment3','moment4','moment5',
  'moment6','moment7','moment8','moment9','moment10',
  'portrait1','portrait2','portrait3','life1','life2',
]

// ─── Per-scene config ─────────────────────────────────────────────────────────────
const SCENE_BG = [
  { bg: '#F5F0E8', glow: 'rgba(233,223,180,0.60)' },
  { bg: '#EEEAF8', glow: 'rgba(193,174,222,0.55)' },
  { bg: '#EBF5F0', glow: 'rgba(168,230,207,0.55)' },
  { bg: '#F5EBF0', glow: 'rgba(242,196,214,0.55)' },
  { bg: '#F8F0F4', glow: 'rgba(240,178,199,0.55)' },
]

const SCENES = [
  {
    label: 'Be the main character',
    icon: null, bigHeading: true,
    heading: 'Life is a movie.',
    body: 'Not every scene needs an audience —',
    bodyEm: 'just the ones who matter.',
    sub: null,
    textColor: '#2C2416', bodyColor: '#7A6E5F', accentColor: '#83934D',
  },
  {
    label: null, icon: '🔒', bigHeading: false,
    heading: 'No algorithm.',
    body: 'Your feed is yours.', bodyEm: null,
    sub: 'Nobody decides what you see, what you miss, or who you become.',
    textColor: '#2A2040', bodyColor: '#6B5F80', accentColor: '#7B5EA7',
  },
  {
    label: null, icon: '👁️', bigHeading: false,
    heading: 'Only your circle sees.',
    body: 'Every viewer is someone you chose.', bodyEm: null,
    sub: 'What you share stays between the people you let in. Period.',
    textColor: '#1A3028', bodyColor: '#4A7060', accentColor: '#44562F',
  },
  {
    label: null, icon: '🚫', bigHeading: false,
    heading: "Don't get lost in the crowd.",
    body: 'No public feed. No strangers scrolling your life.', bodyEm: null,
    sub: "You're not content. Your memories aren't for likes or algorithms.",
    textColor: '#3A1828', bodyColor: '#7A4A60', accentColor: '#C45C7A',
  },
  {
    label: null, icon: '✨', bigHeading: false,
    heading: 'No strangers, ever.',
    body: 'Priorities keeps them where they belong —',
    bodyEm: 'with the people you chose.',
    sub: null,
    textColor: '#2C2416', bodyColor: '#7A6E5F', accentColor: '#83934D',
  },
]

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  id: number
  x: number       // % from left
  size: number    // px
  color: string
  duration: number  // seconds to float from bottom to top
  delay: number
  wobble: number  // horizontal wobble amplitude px
  isFilm: boolean
  seed?: string
  opacity: number
}

let _uid = 0
function mkParticle(isFilm = false): Particle {
  const size = isFilm
    ? 60 + Math.random() * 80   // film circles: 60–140px
    : 12 + Math.random() * 60   // bubbles: 12–72px
  return {
    id:       ++_uid,
    x:        5 + Math.random() * 90,
    size,
    color:    P[Math.floor(Math.random() * P.length)],
    duration: isFilm
      ? 14 + Math.random() * 10   // film: slower rise
      : 8  + Math.random() * 10,  // bubble: faster
    delay:    0,
    wobble:   20 + Math.random() * 40,
    isFilm,
    seed:     isFilm ? PHOTO_SEEDS[Math.floor(Math.random() * PHOTO_SEEDS.length)] : undefined,
    opacity:  isFilm ? 0.75 + Math.random() * 0.2 : 0.45 + Math.random() * 0.30,
  }
}

// ─── Single rising particle ─────────────────────────────────────────────────────────
function RisingParticle({ p, onDone }: { p: Particle; onDone: (id: number) => void }) {
  const viewH = typeof window !== 'undefined' ? window.innerHeight : 800
  const travel = viewH + p.size + 40  // travel full viewport height + size

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${p.x}%`,
        bottom: -p.size - 20,
        width:  p.size,
        height: p.size,
        borderRadius: '50%',
      }}
      initial={{ y: 0, x: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y:       [-0, -travel],
        x:       [0, p.wobble, -p.wobble * 0.6, p.wobble * 0.4, 0],
        opacity: [0, p.opacity, p.opacity, p.opacity * 0.6, 0],
        scale:   [0.6, 1, 1, 0.9],
      }}
      transition={{
        duration: p.duration,
        ease: 'easeInOut',
        times:   [0, 0.08, 0.7, 0.88, 1],
        x: { duration: p.duration, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] },
      }}
      onAnimationComplete={() => onDone(p.id)}
    >
      {p.isFilm ? (
        // Film circle with photo
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            boxShadow: '0 2px 0 2px rgba(255,255,255,0.5), 0 6px 24px rgba(0,0,0,0.10)',
          }}
        >
          <img
            src={`https://picsum.photos/seed/${p.seed}/220/220`}
            alt=""
            width={p.size}
            height={p.size}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)' }}
          />
        </div>
      ) : (
        // Plain pastel bubble
        <div
          className="w-full h-full rounded-full"
          style={{ background: p.color }}
        />
      )}
    </motion.div>
  )
}

// ─── Scene text panel ─────────────────────────────────────────────────────────────
function ScenePanel({
  scene, opacity, y,
}: {
  scene: typeof SCENES[0]
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
              color:       scene.accentColor,
              borderColor: scene.accentColor + '44',
              background:  scene.accentColor + '14',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: scene.accentColor }} />
            {scene.label}
          </span>
        </div>
      )}

      {scene.icon && (
        <div className="text-[48px] sm:text-[58px] mb-3 leading-none select-none">{scene.icon}</div>
      )}

      <h2
        className="font-serif tracking-tight leading-[0.95] mb-5"
        style={{
          fontSize:  scene.bigHeading ? 'clamp(44px,7.5vw,108px)' : 'clamp(30px,4.5vw,68px)',
          fontStyle: scene.bigHeading ? 'italic' : 'normal',
          color:     scene.bigHeading ? scene.accentColor : scene.textColor,
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
        style={{ fontSize: 'clamp(15px,2vw,21px)', color: scene.bodyColor }}
      >
        {scene.body}
        {scene.bodyEm && (
          <> <em className="not-italic font-normal" style={{ color: scene.textColor }}>{scene.bodyEm}</em></>
        )}
      </p>

      {scene.sub && (
        <p
          className="mt-3 max-w-sm leading-relaxed"
          style={{ fontSize: 'clamp(11px,1.3vw,13px)', color: scene.bodyColor, opacity: 0.7 }}
        >
          {scene.sub}
        </p>
      )}
    </motion.div>
  )
}

// ─── Rising bubble pool manager ────────────────────────────────────────────────────────
function RisingPool() {
  const [particles, setParticles] = useState<Particle[]>(() => {
    // Seed initial batch spread across the screen at various heights
    const initial: Particle[] = []
    for (let i = 0; i < 18; i++) {
      const p = mkParticle(i % 7 === 0)  // every 7th is a film circle
      // stagger initial positions — some already mid-rise
      initial.push({ ...p, delay: i * 0.4 })
    }
    return initial
  })

  // Spawn new particles on interval
  useEffect(() => {
    // Bubbles: every 900ms
    const bubbleTimer = setInterval(() => {
      setParticles(prev => [...prev, mkParticle(false)])
    }, 900)

    // Film circles: every 3.5s
    const filmTimer = setInterval(() => {
      setParticles(prev => [...prev, mkParticle(true)])
    }, 3500)

    return () => {
      clearInterval(bubbleTimer)
      clearInterval(filmTimer)
    }
  }, [])

  const remove = (id: number) =>
    setParticles(prev => prev.filter(p => p.id !== id))

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <RisingParticle key={p.id} p={p} onDone={remove} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Main export ────────────────────────────────────────────────────────────────────
export default function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping:   20,
    restDelta: 0.0001,
  })

  const N    = SCENES.length
  const step = 1 / N
  const FIN  = 0.05
  const FOUT = 0.05

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
  const bgOps = SCENE_BG.map((_, i) =>
    useTransform(smoothProgress,
      [i*step, i*step+FIN, (i+1)*step-FOUT, (i+1)*step],
      [0, 1, 1, 0]
    )
  )

  return (
    <div ref={containerRef} style={{ height: '650vh' }}>
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        {/* Per-scene background */}
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

        {/* Paper texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            opacity: 0.022,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        {/* Rising bubbles + film circles pool */}
        <RisingPool />

        {/* Scene text — on top of everything */}
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

      </div>
    </div>
  )
}
