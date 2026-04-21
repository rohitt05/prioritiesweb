'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion'

// ─── Scene data ────────────────────────────────────────────────────────────────────
const SCENES = [
  {
    act: 'ACT I',
    kicker: 'Be the main character',
    lineA: 'Life is',
    lineB: 'a movie.',
    italic: true,
    body: 'Not every scene needs an audience — just the ones who matter.',
    light: '#C8B87A',   // warm gold spotlight
    textA: '#F5EDD8',
    textB: '#D4A373',
  },
  {
    act: 'ACT II',
    kicker: 'No middlemen',
    lineA: 'No',
    lineB: 'algorithm.',
    italic: false,
    body: 'Nobody decides what you see, what you miss, or who you become.',
    light: '#A899D4',   // cool lavender spotlight
    textA: '#EDE8F8',
    textB: '#B8A8E4',
  },
  {
    act: 'ACT III',
    kicker: 'Your circle only',
    lineA: 'Only your',
    lineB: 'circle sees.',
    italic: false,
    body: 'Every viewer is someone you chose. What you share stays between the people you let in. Period.',
    light: '#7ABFA0',   // sage green spotlight
    textA: '#E4F4EE',
    textB: '#89C9A8',
  },
  {
    act: 'ACT IV',
    kicker: 'You are not content',
    lineA: "Don't get",
    lineB: 'lost.',
    italic: false,
    body: "No public feed. No strangers scrolling your life. You're not content.",
    light: '#D48A9A',   // rose spotlight
    textA: '#F4E4E8',
    textB: '#E89AAA',
  },
  {
    act: 'ACT V',
    kicker: 'Forever private',
    lineA: 'No strangers,',
    lineB: 'ever.',
    italic: true,
    body: 'Priorities keeps your moments with the people you chose. Always.',
    light: '#C8B87A',
    textA: '#F5EDD8',
    textB: '#D4A373',
  },
] as const

const N = SCENES.length

// ─── Per-scene normalized progress (0 → 1) ─────────────────────────────────────
// Safe to call inside component body (not in .map at top level)
function useSceneProgress(raw: MotionValue<number>, i: number) {
  return useTransform(raw, [i / N, (i + 1) / N], [0, 1])
}

// ─── Scene background spotlight ────────────────────────────────────────────────
function SpotlightBg({ color, progress }: { color: string; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.2, 0.75, 1], [0, 1, 1, 0])
  const x = useTransform(progress, [0, 0.2, 0.75, 1], ['-30%', '0%', '0%', '20%'])

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        x,
        background: `radial-gradient(ellipse 55% 70% at 38% 50%, ${color}18 0%, transparent 70%)`,
      }}
    />
  )
}

// ─── Large ambient act number in bg ───────────────────────────────────────────
function AmbientNumber({ num, progress }: { num: string; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.25, 0.75, 1], [0, 0.06, 0.06, 0])
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.88, 1, 1, 1.05])

  return (
    <motion.div
      className="absolute right-[-2vw] bottom-[-4vw] font-serif select-none pointer-events-none leading-none"
      style={{
        opacity,
        scale,
        fontSize: 'clamp(180px, 28vw, 380px)',
        color: '#ffffff',
        fontStyle: 'italic',
      }}
    >
      {num}
    </motion.div>
  )
}

// ─── Individual scene content ──────────────────────────────────────────────────
function SceneContent({ scene, progress, index }: {
  scene: typeof SCENES[number]
  progress: MotionValue<number>
  index: number
}) {
  // Main text block
  const opacity = useTransform(progress, [0, 0.18, 0.76, 1], [0, 1, 1, 0])
  const clipProg = useTransform(progress, [0, 0.22], [100, 0])
  const yText = useTransform(progress, [0, 0.2, 0.78, 1], ['5%', '0%', '0%', '-4%'])

  // Kicker + act row
  const kickerOp = useTransform(progress, [0, 0.28, 0.7, 1], [0, 1, 1, 0])

  // The vertical light beam
  const beamH = useTransform(progress, [0, 0.18, 0.78, 1], ['0%', '100%', '100%', '0%'])
  const beamOp = useTransform(progress, [0, 0.12, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity }}
    >
      {/* Left: vertical accent beam */}
      <div className="relative flex-shrink-0 flex justify-center" style={{ width: 2, height: '55vh', marginLeft: 'clamp(40px, 8vw, 120px)' }}>
        <motion.div
          className="absolute top-0 left-0 w-full origin-top rounded-full"
          style={{
            height: beamH,
            opacity: beamOp,
            background: `linear-gradient(to bottom, ${scene.light}00, ${scene.light}, ${scene.light}44)`,
          }}
        />
      </div>

      {/* Right: text content */}
      <motion.div
        className="flex flex-col ml-8 sm:ml-12"
        style={{ y: yText }}
      >
        {/* Act tag + kicker */}
        <motion.div
          className="flex items-center gap-4 mb-6 sm:mb-8"
          style={{ opacity: kickerOp }}
        >
          <span
            className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-medium"
            style={{ color: scene.light }}
          >
            {scene.act}
          </span>
          <div className="h-px w-8" style={{ background: `${scene.light}60` }} />
          <span
            className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase"
            style={{ color: `${scene.light}88` }}
          >
            {scene.kicker}
          </span>
        </motion.div>

        {/* Big heading — clip-path wipe reveal */}
        <div className="overflow-hidden mb-1">
          <motion.h2
            className="font-serif leading-[0.9] tracking-tight"
            style={{
              fontSize: 'clamp(52px, 9vw, 140px)',
              color: scene.textA,
              clipPath: useTransform(clipProg, v => `inset(0 0 ${v}% 0)`),
            }}
          >
            {scene.lineA}
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8 sm:mb-10">
          <motion.h2
            className="font-serif leading-[0.9] tracking-tight"
            style={{
              fontSize: 'clamp(52px, 9vw, 140px)',
              fontStyle: scene.italic ? 'italic' : 'normal',
              color: scene.textB,
              clipPath: useTransform(
                useTransform(progress, [0.04, 0.26], [100, 0]),
                v => `inset(0 0 ${v}% 0)`
              ),
            }}
          >
            {scene.lineB}
          </motion.h2>
        </div>

        {/* Body text */}
        <motion.p
          className="leading-relaxed max-w-[42ch]"
          style={{
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            color: `${scene.textA}99`,
            opacity: useTransform(progress, [0.25, 0.42, 0.72, 1], [0, 1, 1, 0]),
          }}
        >
          {scene.body}
        </motion.p>

        {/* Scene index dots */}
        <motion.div
          className="flex items-center gap-2 mt-8 sm:mt-10"
          style={{ opacity: useTransform(progress, [0.3, 0.45], [0, 1]) }}
        >
          {SCENES.map((_, j) => (
            <div
              key={j}
              className="rounded-full transition-all duration-500"
              style={{
                width: j === index ? 20 : 4,
                height: 4,
                background: j === index ? scene.light : `${scene.light}33`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Film leader strip along top ───────────────────────────────────────────────
function LeaderStrip({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const x = useTransform(progress, [0, 1], ['0%', '-62%'])

  return (
    <div className="absolute top-0 left-0 right-0 z-20 overflow-hidden" style={{ height: 32 }}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)' }} />
      <motion.div
        className="flex items-center gap-10 px-6 absolute whitespace-nowrap"
        style={{ x, top: 0, height: '100%' }}
      >
        {Array.from({ length: 4 }).flatMap(() =>
          SCENES.map((s, i) => (
            <span
              key={`${s.act}-${i}-${Math.random()}`}
              className="text-[9px] tracking-[0.3em] uppercase opacity-30"
              style={{ color: '#fff', fontFamily: 'monospace' }}
            >
              {s.act} · {s.kicker}
            </span>
          ))
        )}
      </motion.div>
      {/* Sprocket holes */}
      <div className="absolute right-0 top-0 h-full flex items-center gap-[5px] pr-4 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-sm" style={{ width: 10, height: 7, background: 'rgba(255,255,255,0.5)' }} />
        ))}
      </div>
    </div>
  )
}

// ─── Right-side scene navigator ────────────────────────────────────────────────
function SceneNav({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  return (
    <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 items-end">
      {SCENES.map((s, i) => {
        const start = i / N
        const end = (i + 1) / N
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const op = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0.2, 1, 1, 0.2])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const w = useTransform(progress, [start, start + 0.08, end - 0.08, end], [12, 28, 28, 12])

        return (
          <div key={i} className="flex items-center gap-2">
            <motion.span
              className="text-[9px] tracking-[0.2em] uppercase hidden sm:block"
              style={{ opacity: op, color: s.light }}
            >
              {s.act}
            </motion.span>
            <motion.div
              className="rounded-full"
              style={{
                height: 2,
                width: w,
                opacity: op,
                background: s.light,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ─── Scroll hint ───────────────────────────────────────────────────────────────
function ScrollHint({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const opacity = useTransform(progress, [0, 0.1], [1, 0])

  return (
    <motion.div
      className="absolute bottom-8 left-[clamp(40px,8vw,120px)] z-20 flex items-center gap-3"
      style={{ opacity }}
    >
      <motion.div
        className="w-px"
        style={{ height: 32, background: 'rgba(255,255,255,0.25)' }}
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Scroll
      </span>
    </motion.div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Per-scene progresses — called unconditionally at component level, not inside .map()
  const p0 = useSceneProgress(scrollYProgress, 0)
  const p1 = useSceneProgress(scrollYProgress, 1)
  const p2 = useSceneProgress(scrollYProgress, 2)
  const p3 = useSceneProgress(scrollYProgress, 3)
  const p4 = useSceneProgress(scrollYProgress, 4)
  const progs = [p0, p1, p2, p3, p4]

  return (
    <div ref={containerRef} style={{ height: `${N * 140}vh` }}>
      {/* Sticky theater frame */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh', background: '#0D0B08' }}
      >
        {/* Subtle base vignette — always on */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 90% at 50% 50%, #1C1810 0%, #0D0B08 100%)',
          }}
        />

        {/* Per-scene spotlight backgrounds */}
        <div className="absolute inset-0 z-[1]">
          {SCENES.map((s, i) => (
            <SpotlightBg key={i} color={s.light} progress={progs[i]} />
          ))}
        </div>

        {/* Ambient act numbers in background */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {SCENES.map((s, i) => (
            <AmbientNumber key={i} num={(i + 1).toString().padStart(2, '0')} progress={progs[i]} />
          ))}
        </div>

        {/* Film leader strip top */}
        <LeaderStrip progress={scrollYProgress} />

        {/* Scene content panels */}
        <div className="absolute inset-0 z-[3]" style={{ paddingTop: 32 }}>
          {SCENES.map((s, i) => (
            <SceneContent key={i} scene={s} progress={progs[i]} index={i} />
          ))}
        </div>

        {/* Right navigator */}
        <SceneNav progress={scrollYProgress} />

        {/* Scroll hint */}
        <ScrollHint progress={scrollYProgress} />

        {/* Bottom grain edge */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: 60,
            background: 'linear-gradient(to top, #0D0B08, transparent)',
          }}
        />
      </div>
    </div>
  )
}