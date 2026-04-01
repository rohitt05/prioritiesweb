'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'

// ─── Themes per card ─────────────────────────────────────────────────────────
const THEMES = [
  { bg: '#F5F0E8', cardBg: 'rgba(255,255,255,0.75)', accent: '#83934D', text: '#2C2416', muted: '#7A6E5F', glow: 'rgba(184,200,141,0.40)' },
  { bg: '#FFF0F2', cardBg: 'rgba(255,235,238,0.82)', accent: '#C45C7A', text: '#3A1828', muted: '#8A5868', glow: 'rgba(255,173,173,0.45)' },
  { bg: '#FFF4EE', cardBg: 'rgba(255,242,232,0.82)', accent: '#C47A3A', text: '#2C1A0A', muted: '#8A6A4A', glow: 'rgba(255,212,184,0.45)' },
  { bg: '#F0F4FF', cardBg: 'rgba(232,238,255,0.82)', accent: '#5B6BB5', text: '#1A2040', muted: '#5A6080', glow: 'rgba(193,198,249,0.45)' },
  { bg: '#EDF5F0', cardBg: 'rgba(228,245,236,0.88)', accent: '#44562F', text: '#1A2C18', muted: '#4A7060', glow: 'rgba(168,230,207,0.50)' },
  { bg: '#F5EBF8', cardBg: 'rgba(242,232,250,0.82)', accent: '#7B5EA7', text: '#2A1840', muted: '#6A4A80', glow: 'rgba(219,192,231,0.48)' },
  { bg: '#EBF5F8', cardBg: 'rgba(228,244,250,0.82)', accent: '#3A7A8A', text: '#0A2830', muted: '#3A6A78', glow: 'rgba(168,216,234,0.48)' },
  { bg: '#FFF0F5', cardBg: 'rgba(255,232,244,0.88)', accent: '#C45C8A', text: '#3A1828', muted: '#8A4A68', glow: 'rgba(240,178,199,0.48)' },
  { bg: '#F5F0E8', cardBg: 'rgba(255,255,255,0.92)', accent: '#83934D', text: '#2C2416', muted: '#7A6E5F', glow: 'rgba(184,200,141,0.40)' },
]

// ─── Deco bubbles ─────────────────────────────────────────────────────────────
const DECO = [
  { x: '6%',  y: '10%', size: 56, color: '#FAD1D8', opacity: 0.42, dur: 7  },
  { x: '87%', y: '7%',  size: 36, color: '#DBC0E7', opacity: 0.38, dur: 9  },
  { x: '4%',  y: '52%', size: 30, color: '#C9E6EE', opacity: 0.36, dur: 11 },
  { x: '91%', y: '46%', size: 46, color: '#B8C88D', opacity: 0.33, dur: 8  },
  { x: '14%', y: '86%', size: 24, color: '#FFD4B8', opacity: 0.38, dur: 10 },
  { x: '79%', y: '80%', size: 38, color: '#F2C4D6', opacity: 0.36, dur: 7  },
  { x: '50%', y: '4%',  size: 20, color: '#A8E6CF', opacity: 0.33, dur: 12 },
  { x: '71%', y: '28%', size: 16, color: '#d1d4f9', opacity: 0.40, dur: 6  },
]

// ─── Card content data ────────────────────────────────────────────────────────
const CARDS = [
  { type: 'intro'    as const, label: "Let's be honest",  heading: 'This app is\nnot for everyone.', sub: "And that's the whole point." },
  { type: 'notfor'   as const, items: [{ icon: '🌍', line: 'Your follower count' }, { icon: '📢', line: 'The highlight reel' }] },
  { type: 'notfor'   as const, items: [{ icon: '🔔', line: 'Notifications from strangers' }, { icon: '🤳', line: 'Looking good for the internet' }] },
  { type: 'notfor'   as const, items: [{ icon: '📈', line: 'Going viral' }, { icon: '👀', line: 'Who viewed your story' }] },
  { type: 'divider'  as const, text: 'but it is for this.' },
  { type: 'for'      as const, items: [{ emoji: '🫀', text: 'The 2am text you actually mean' }, { emoji: '📸', text: 'The photo you only send to one person' }] },
  { type: 'for'      as const, items: [{ emoji: '🎙️', text: 'A voice note that sounds like a hug' }, { emoji: '🗓️', text: 'Every small moment that becomes a memory' }] },
  { type: 'for'      as const, items: [{ emoji: '🔒', text: 'A space that belongs only to you two' }] },
  { type: 'manifesto'as const },
]

const N = CARDS.length   // 9
// Each card occupies 1/N of the scroll range
// card i is "active" at progress = i/(N-1)

// ─── Card inner content ───────────────────────────────────────────────────────
function CardContent({ card, theme }: { card: typeof CARDS[0]; theme: typeof THEMES[0] }) {
  if (card.type === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-12 gap-4">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{ color: theme.accent, background: theme.accent + '1A', border: `1px solid ${theme.accent}33` }}>
          {card.label}
        </span>
        <h2 className="font-serif font-bold leading-[1.05] tracking-tight whitespace-pre-line"
          style={{ fontSize: 'clamp(24px,5vw,40px)', color: theme.text }}>
          {card.heading}
        </h2>
        <p className="text-[15px]" style={{ color: theme.muted }}>{card.sub}</p>
      </div>
    )
  }
  if (card.type === 'notfor') {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-10 gap-6">
        {card.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[32px] leading-none">{item.icon}</span>
            <span className="font-serif text-[19px] sm:text-[22px] line-through"
              style={{ color: theme.muted, textDecorationColor: theme.accent + '90' }}>
              {item.line}
            </span>
          </div>
        ))}
      </div>
    )
  }
  if (card.type === 'divider') {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-12 gap-5">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px" style={{ background: theme.accent + '50' }} />
          <span className="font-serif italic text-[22px] sm:text-[28px] font-semibold" style={{ color: theme.accent }}>
            {card.text}
          </span>
          <div className="flex-1 h-px" style={{ background: theme.accent + '50' }} />
        </div>
        <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: theme.muted, opacity: 0.65 }}>
          keep scrolling
        </p>
      </div>
    )
  }
  if (card.type === 'for') {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-10 gap-6">
        {card.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[32px] leading-none">{item.emoji}</span>
            <span className="font-serif italic text-[19px] sm:text-[22px]" style={{ color: theme.text }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    )
  }
  // manifesto
  return (
    <div className="flex flex-col items-center justify-center px-8 sm:px-12 py-12 gap-3 text-center">
      <span className="font-serif text-[52px] select-none" style={{ color: theme.accent, opacity: 0.38, lineHeight: 0.6 }}>&ldquo;</span>
      <p className="font-serif leading-[1.6] tracking-tight" style={{ fontSize: 'clamp(17px,3vw,25px)', color: theme.text }}>
        The world has a million apps<br />
        <em className="not-italic" style={{ color: theme.accent }}>for everyone.</em><br />
        <span style={{ opacity: 0.55 }}>We made one</span><br />
        for{' '}<strong style={{ color: theme.accent }}>the one.</strong>
      </p>
      <span className="font-serif text-[52px] select-none" style={{ color: theme.accent, opacity: 0.38, lineHeight: 0.6 }}>&rdquo;</span>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
        <span className="text-[10px] tracking-[0.16em] uppercase" style={{ color: theme.muted }}>Priorities · 2026</span>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
      </div>
    </div>
  )
}

// ─── One card with pre-computed motion values ─────────────────────────────────
function StackCard({
  card, theme, yMv, scaleMv, opacityMv, zIndex,
}: {
  card:      typeof CARDS[0]
  theme:     typeof THEMES[0]
  yMv:       MotionValue<number>
  scaleMv:   MotionValue<number>
  opacityMv: MotionValue<number>
  zIndex:    number
}) {
  return (
    <motion.div
      className="absolute inset-x-0 mx-auto px-5 sm:px-8"
      style={{ y: yMv, scale: scaleMv, opacity: opacityMv, zIndex, transformOrigin: 'top center' }}
    >
      <div
        className="rounded-3xl w-full mx-auto"
        style={{
          maxWidth: 480,
          background: theme.cardBg,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255,255,255,0.80)',
          boxShadow: `0 16px 56px ${theme.glow}, 0 1px 0 rgba(255,255,255,0.95) inset`,
          minHeight: 200,
        }}
      >
        <CardContent card={card} theme={theme} />
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PositioningSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring on raw scroll
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0001 })

  // ── Pre-compute all transforms here in the parent (rules of hooks ✓) ──
  // For N cards, card i is "centre stage" when sp = i/(N-1).
  // It slides in from below, sits, then scales back as next card arrives.

  const SLIDE_IN  = 0.55 / (N - 1)   // how much progress to fully arrive
  const SCALE_OUT = 0.45 / (N - 1)   // how much progress until fully pushed back

  // card 0
  const p0  = 0 / (N - 1)
  const y0  = useTransform(sp, [p0 - SLIDE_IN, p0], [80, 0])
  const sc0 = useTransform(sp, [p0, p0 + SCALE_OUT], [1, 0.93])
  const o0  = useTransform(sp, [p0 - SLIDE_IN, p0, p0 + SCALE_OUT * 2], [0, 1, 0])

  const p1  = 1 / (N - 1)
  const y1  = useTransform(sp, [p1 - SLIDE_IN, p1], [80, 0])
  const sc1 = useTransform(sp, [p1, p1 + SCALE_OUT], [1, 0.93])
  const o1  = useTransform(sp, [p1 - SLIDE_IN, p1, p1 + SCALE_OUT * 2], [0, 1, 0])

  const p2  = 2 / (N - 1)
  const y2  = useTransform(sp, [p2 - SLIDE_IN, p2], [80, 0])
  const sc2 = useTransform(sp, [p2, p2 + SCALE_OUT], [1, 0.93])
  const o2  = useTransform(sp, [p2 - SLIDE_IN, p2, p2 + SCALE_OUT * 2], [0, 1, 0])

  const p3  = 3 / (N - 1)
  const y3  = useTransform(sp, [p3 - SLIDE_IN, p3], [80, 0])
  const sc3 = useTransform(sp, [p3, p3 + SCALE_OUT], [1, 0.93])
  const o3  = useTransform(sp, [p3 - SLIDE_IN, p3, p3 + SCALE_OUT * 2], [0, 1, 0])

  const p4  = 4 / (N - 1)
  const y4  = useTransform(sp, [p4 - SLIDE_IN, p4], [80, 0])
  const sc4 = useTransform(sp, [p4, p4 + SCALE_OUT], [1, 0.93])
  const o4  = useTransform(sp, [p4 - SLIDE_IN, p4, p4 + SCALE_OUT * 2], [0, 1, 0])

  const p5  = 5 / (N - 1)
  const y5  = useTransform(sp, [p5 - SLIDE_IN, p5], [80, 0])
  const sc5 = useTransform(sp, [p5, p5 + SCALE_OUT], [1, 0.93])
  const o5  = useTransform(sp, [p5 - SLIDE_IN, p5, p5 + SCALE_OUT * 2], [0, 1, 0])

  const p6  = 6 / (N - 1)
  const y6  = useTransform(sp, [p6 - SLIDE_IN, p6], [80, 0])
  const sc6 = useTransform(sp, [p6, p6 + SCALE_OUT], [1, 0.93])
  const o6  = useTransform(sp, [p6 - SLIDE_IN, p6, p6 + SCALE_OUT * 2], [0, 1, 0])

  const p7  = 7 / (N - 1)
  const y7  = useTransform(sp, [p7 - SLIDE_IN, p7], [80, 0])
  const sc7 = useTransform(sp, [p7, p7 + SCALE_OUT], [1, 0.93])
  const o7  = useTransform(sp, [p7 - SLIDE_IN, p7, p7 + SCALE_OUT * 2], [0, 1, 0])

  const p8  = 8 / (N - 1)  // = 1
  const y8  = useTransform(sp, [p8 - SLIDE_IN, p8], [80, 0])
  const sc8 = useTransform(sp, [p8 - SLIDE_IN, p8], [1, 1])   // last card stays
  const o8  = useTransform(sp, [p8 - SLIDE_IN, p8], [0, 1])

  const cards = [
    { yMv: y0, scaleMv: sc0, opacityMv: o0 },
    { yMv: y1, scaleMv: sc1, opacityMv: o1 },
    { yMv: y2, scaleMv: sc2, opacityMv: o2 },
    { yMv: y3, scaleMv: sc3, opacityMv: o3 },
    { yMv: y4, scaleMv: sc4, opacityMv: o4 },
    { yMv: y5, scaleMv: sc5, opacityMv: o5 },
    { yMv: y6, scaleMv: sc6, opacityMv: o6 },
    { yMv: y7, scaleMv: sc7, opacityMv: o7 },
    { yMv: y8, scaleMv: sc8, opacityMv: o8 },
  ]

  // Dynamic bg per card
  const bgOpacities = THEMES.map((_, i) => {
    const mid = i / (N - 1)
    const half = 0.6 / (N - 1)
    return useTransform(sp, [Math.max(0, mid - half), mid, Math.min(1, mid + half)], [0, 1, 0])
  })

  // Scroll hint opacity
  const hintOp = useTransform(sp, [0, 0.06], [1, 0])

  return (
    // scroll container: 100vh sticky + N cards × 60vh of scroll distance
    <div ref={containerRef} style={{ height: `calc(100vh + ${(N - 1) * 60}vh)` }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100svh' }}>

        {/* Dynamic background layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: '#F5F0E8' }} />
          {THEMES.map((theme, i) => (
            <motion.div key={i} className="absolute inset-0" style={{
              opacity: bgOpacities[i],
              background: `radial-gradient(ellipse 120% 90% at 50% 35%, ${theme.glow} 0%, ${theme.bg} 55%, ${theme.bg} 100%)`,
            }} />
          ))}
        </div>

        {/* Deco bubbles */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {DECO.map((b, i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ left: b.x, top: b.y, width: b.size, height: b.size, background: b.color, opacity: b.opacity, filter: 'blur(0.5px)' }}
              animate={{ y: [0, -16, 0], x: [0, i % 2 === 0 ? 9 : -9, 0], scale: [1, 1.07, 1] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.55 }}
            />
          ))}
        </div>

        {/* Card stack */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <div className="relative w-full" style={{ height: 300 }}>
            {CARDS.map((card, i) => (
              <StackCard
                key={i}
                card={card}
                theme={THEMES[i]}
                yMv={cards[i].yMv}
                scaleMv={cards[i].scaleMv}
                opacityMv={cards[i].opacityMv}
                zIndex={i + 1}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-[5]"
          style={{ opacity: hintOp }}>
          <motion.div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: 'rgba(44,36,22,0.22)' }}>
            <motion.div className="w-1 h-2 rounded-full" style={{ background: 'rgba(44,36,22,0.35)' }}
              animate={{ y: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(44,36,22,0.30)' }}>scroll</span>
        </motion.div>

      </div>
    </div>
  )
}
