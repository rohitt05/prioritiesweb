'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion'

// ─── Palette ─────────────────────────────────────────────────────────────────────
const CARD_THEMES = [
  // card 0 — intro
  { bg: '#F5F0E8', cardBg: 'rgba(255,255,255,0.72)', accent: '#83934D', text: '#2C2416', muted: '#7A6E5F', glow: 'rgba(184,200,141,0.35)' },
  // card 1 — not for: follower count + highlight reel
  { bg: '#FFF0F2', cardBg: 'rgba(255,240,242,0.80)', accent: '#C45C7A', text: '#3A1828', muted: '#8A5868', glow: 'rgba(255,173,173,0.40)' },
  // card 2 — not for: notifications + looking good
  { bg: '#FFF4EE', cardBg: 'rgba(255,244,238,0.80)', accent: '#C47A3A', text: '#2C1A0A', muted: '#8A6A4A', glow: 'rgba(255,212,184,0.40)' },
  // card 3 — not for: viral + who viewed
  { bg: '#F0F4FF', cardBg: 'rgba(240,244,255,0.80)', accent: '#5B6BB5', text: '#1A2040', muted: '#5A6080', glow: 'rgba(193,198,249,0.40)' },
  // card 4 — divider: but it is for this
  { bg: '#EDF5F0', cardBg: 'rgba(237,245,240,0.85)', accent: '#44562F', text: '#1A2C18', muted: '#4A7060', glow: 'rgba(168,230,207,0.45)' },
  // card 5 — for: 2am text + photo
  { bg: '#F5EBF8', cardBg: 'rgba(245,235,248,0.80)', accent: '#7B5EA7', text: '#2A1840', muted: '#6A4A80', glow: 'rgba(219,192,231,0.45)' },
  // card 6 — for: voice note + small moment
  { bg: '#EBF5F8', cardBg: 'rgba(235,245,248,0.80)', accent: '#3A7A8A', text: '#0A2830', muted: '#3A6A78', glow: 'rgba(168,216,234,0.45)' },
  // card 7 — for: space for you two
  { bg: '#FFF0F5', cardBg: 'rgba(255,240,245,0.85)', accent: '#C45C8A', text: '#3A1828', muted: '#8A4A68', glow: 'rgba(240,178,199,0.45)' },
  // card 8 — manifesto quote (final)
  { bg: '#F5F0E8', cardBg: 'rgba(255,255,255,0.90)', accent: '#83934D', text: '#2C2416', muted: '#7A6E5F', glow: 'rgba(184,200,141,0.35)' },
]

// ─── Deco bubbles (static, few, tasteful) ────────────────────────────────────────────
const DECO = [
  { x: '8%',  y: '12%', size: 52, color: '#FAD1D8', opacity: 0.45, dur: 7  },
  { x: '88%', y: '8%',  size: 34, color: '#DBC0E7', opacity: 0.40, dur: 9  },
  { x: '5%',  y: '55%', size: 28, color: '#C9E6EE', opacity: 0.38, dur: 11 },
  { x: '92%', y: '48%', size: 44, color: '#B8C88D', opacity: 0.35, dur: 8  },
  { x: '15%', y: '88%', size: 22, color: '#FFD4B8', opacity: 0.40, dur: 10 },
  { x: '80%', y: '82%', size: 36, color: '#F2C4D6', opacity: 0.38, dur: 7  },
  { x: '50%', y: '5%',  size: 18, color: '#A8E6CF', opacity: 0.35, dur: 12 },
  { x: '72%', y: '30%', size: 14, color: '#d1d4f9', opacity: 0.42, dur: 6  },
]

// ─── Card data ────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    type: 'intro' as const,
    label: "Let's be honest",
    heading: 'This app is not for everyone.',
    sub: "And that's the whole point.",
  },
  {
    type: 'notfor' as const,
    items: [
      { icon: '🌍', line: 'Your follower count' },
      { icon: '📢', line: 'The highlight reel' },
    ],
  },
  {
    type: 'notfor' as const,
    items: [
      { icon: '🔔', line: 'Notifications from strangers' },
      { icon: '🤳', line: 'Looking good for the internet' },
    ],
  },
  {
    type: 'notfor' as const,
    items: [
      { icon: '📈', line: 'Going viral' },
      { icon: '👀', line: 'Who viewed your story' },
    ],
  },
  {
    type: 'divider' as const,
    text: 'but it is for this.',
  },
  {
    type: 'for' as const,
    items: [
      { emoji: '🫀', text: 'The 2am text you actually mean' },
      { emoji: '📸', text: 'The photo you only send to one person' },
    ],
  },
  {
    type: 'for' as const,
    items: [
      { emoji: '🎙️', text: 'A voice note that sounds like a hug' },
      { emoji: '🗓️', text: 'Every small moment that becomes a memory' },
    ],
  },
  {
    type: 'for' as const,
    items: [
      { emoji: '🔒', text: 'A space that belongs only to you two' },
    ],
  },
  {
    type: 'manifesto' as const,
  },
]

// ─── Single stacked card ────────────────────────────────────────────────────────────────
function StackCard({
  index,
  total,
  progress,
  theme,
  card,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useSpring>
  theme: typeof CARD_THEMES[0]
  card: typeof CARDS[0]
}) {
  const start  = index / total
  const arrive = start + 0.5 / total        // card fully visible
  const stay   = (index + 1) / total        // next card starts covering
  const leave  = stay + 0.3 / total

  // Slide up from below
  const y = useTransform(
    progress,
    [start, arrive],
    ['60px', '0px']
  )
  const entryOpacity = useTransform(
    progress,
    [start, arrive],
    [0, 1]
  )
  // Scale down + push back as cards stack on top
  const scale = useTransform(
    progress,
    [stay, leave],
    [1, 0.94]
  )
  const stackY = useTransform(
    progress,
    [stay, leave],
    ['0px', '-18px']
  )
  const exitOpacity = useTransform(
    progress,
    [leave, leave + 0.05 / total],
    [1, 0]
  )

  // Combine opacities
  const opacity = useTransform(
    [entryOpacity, exitOpacity] as const,
    ([e, x]: number[]) => Math.min(e, x)
  )

  return (
    <motion.div
      className="absolute inset-x-0 mx-auto w-full max-w-lg px-4"
      style={{
        y: useTransform([y, stackY] as const, ([a, b]: string[]) => `calc(${a} + ${b})`),
        scale,
        opacity,
        zIndex: index + 1,
        transformOrigin: 'top center',
      }}
    >
      <div
        className="rounded-3xl overflow-hidden w-full"
        style={{
          background: theme.cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.75)',
          boxShadow: `0 12px 48px ${theme.glow}, 0 2px 0 rgba(255,255,255,0.9) inset`,
          minHeight: 220,
        }}
      >
        <CardContent card={card} theme={theme} />
      </div>
    </motion.div>
  )
}

// ─── Card content switcher ──────────────────────────────────────────────────────────
function CardContent({
  card,
  theme,
}: {
  card: typeof CARDS[0]
  theme: typeof CARD_THEMES[0]
}) {
  if (card.type === 'intro') {
    const c = card as Extract<typeof CARDS[0], { type: 'intro' }>
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-12 gap-3">
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
          style={{ color: theme.accent, background: theme.accent + '18', border: `1px solid ${theme.accent}30` }}
        >
          {c.label}
        </span>
        <h2
          className="font-serif font-bold leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(26px,5vw,42px)', color: theme.text }}
        >
          {c.heading}
        </h2>
        <p style={{ color: theme.muted, fontSize: 15 }}>{c.sub}</p>
      </div>
    )
  }

  if (card.type === 'notfor') {
    const c = card as Extract<typeof CARDS[0], { type: 'notfor' }>
    return (
      <div className="flex flex-col items-center justify-center px-8 py-10 gap-5">
        {c.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 w-full justify-center">
            <span className="text-3xl">{item.icon}</span>
            <span
              className="font-serif italic text-[18px] sm:text-[22px] line-through"
              style={{ color: theme.muted, textDecorationColor: theme.accent + '80' }}
            >
              {item.line}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (card.type === 'divider') {
    const c = card as Extract<typeof CARDS[0], { type: 'divider' }>
    return (
      <div className="flex flex-col items-center justify-center px-8 py-12 gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px" style={{ background: theme.accent + '40' }} />
          <span
            className="font-serif italic text-[22px] sm:text-[28px] font-bold"
            style={{ color: theme.accent }}
          >
            {c.text}
          </span>
          <div className="flex-1 h-px" style={{ background: theme.accent + '40' }} />
        </div>
        <p className="text-[12px] tracking-widest uppercase" style={{ color: theme.muted, opacity: 0.7 }}>
          swipe to see what it's actually for
        </p>
      </div>
    )
  }

  if (card.type === 'for') {
    const c = card as Extract<typeof CARDS[0], { type: 'for' }>
    return (
      <div className="flex flex-col items-center justify-center px-8 py-10 gap-6">
        {c.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 w-full justify-center">
            <span className="text-3xl">{item.emoji}</span>
            <span
              className="font-serif italic text-[18px] sm:text-[22px]"
              style={{ color: theme.text }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // manifesto
  return (
    <div className="flex flex-col items-center justify-center px-8 sm:px-12 py-12 gap-2 text-center">
      <span
        className="font-serif text-[56px] leading-none select-none"
        style={{ color: theme.accent, opacity: 0.4, lineHeight: 0.7 }}
      >&ldquo;</span>
      <p
        className="font-serif leading-[1.55] tracking-tight"
        style={{ fontSize: 'clamp(17px,3.2vw,26px)', color: theme.text }}
      >
        The world has a million apps<br />
        <em className="not-italic" style={{ color: theme.accent }}>for everyone.</em><br />
        <span style={{ opacity: 0.6 }}>We made one</span><br />
        for{' '}<em style={{ color: theme.accent }} className="font-bold">the one.</em>
      </p>
      <span
        className="font-serif text-[56px] leading-none select-none"
        style={{ color: theme.accent, opacity: 0.4, lineHeight: 0.7 }}
      >&rdquo;</span>
      <div className="mt-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
        <span className="text-[10px] tracking-[0.16em] uppercase" style={{ color: theme.muted }}>Priorities · 2026</span>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
      </div>
    </div>
  )
}

// ─── Dynamic background colour ────────────────────────────────────────────────────
function DynamicBg({ progress, total }: { progress: ReturnType<typeof useSpring>; total: number }) {
  return (
    <>
      {CARD_THEMES.map((theme, i) => {
        const mid   = i / total
        const start = Math.max(0, mid - 0.5 / total)
        const end   = Math.min(1, mid + 0.5 / total)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const op = useTransform(progress, [start, mid, end], [0, 1, 0])
        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: op,
              background: `radial-gradient(ellipse 110% 80% at 50% 30%, ${theme.glow} 0%, ${theme.bg} 50%, ${theme.bg} 100%)`,
            }}
          />
        )
      })}
    </>
  )
}

// ─── Main export ────────────────────────────────────────────────────────────────────
export default function PositioningSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const total = CARDS.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.0001,
  })

  return (
    <div ref={containerRef} style={{ height: `${total * 80}vh` }}>
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        {/* Dynamic background */}
        <div className="absolute inset-0 z-0">
          {/* Base warm bg */}
          <div className="absolute inset-0" style={{ background: '#F5F0E8' }} />
          <DynamicBg progress={progress} total={total} />
        </div>

        {/* Paper texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            opacity: 0.018,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        {/* Deco bubbles — few, always visible */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {DECO.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: b.x, top: b.y,
                width: b.size, height: b.size,
                background: b.color,
                opacity: b.opacity,
                filter: 'blur(1px)',
              }}
              animate={{
                y:     [0, -18, 0],
                x:     [0, i % 2 === 0 ? 8 : -8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: b.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        {/* Stacked cards — centred vertically */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <div className="relative w-full max-w-lg" style={{ height: 280 }}>
            {CARDS.map((card, i) => (
              <StackCard
                key={i}
                index={i}
                total={total}
                progress={progress}
                theme={CARD_THEMES[i]}
                card={card}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint — fades out once scrolled */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-[4]"
          style={{
            opacity: useTransform(progress, [0, 0.08], [1, 0]),
          }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: 'rgba(44,36,22,0.25)' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: 'rgba(44,36,22,0.40)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(44,36,22,0.35)' }}>scroll</span>
        </motion.div>

      </div>
    </div>
  )
}
