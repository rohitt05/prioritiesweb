'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'

// ─── Themes per card ──────────────────────────────────────────────────────────
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
  { type: 'intro'     as const, label: "Let's be honest",  heading: 'This app is\nnot for everyone.', sub: "And that's the whole point." },
  { type: 'notfor'    as const, items: [{ icon: '🌍', line: 'Your follower count' }, { icon: '📢', line: 'The highlight reel' }] },
  { type: 'notfor'    as const, items: [{ icon: '🔔', line: 'Notifications from strangers' }, { icon: '🤳', line: 'Looking good for the internet' }] },
  { type: 'notfor'    as const, items: [{ icon: '📈', line: 'Going viral' }, { icon: '👀', line: 'Who viewed your story' }] },
  { type: 'divider'   as const, text: 'but it is for this.' },
  { type: 'for'       as const, items: [{ emoji: '🫀', text: 'The 2am text you actually mean' }, { emoji: '📸', text: 'The photo you only send to one person' }] },
  { type: 'for'       as const, items: [{ emoji: '🎙️', text: 'A voice note that sounds like a hug' }, { emoji: '🗓️', text: 'Every small moment that becomes a memory' }] },
  { type: 'for'       as const, items: [{ emoji: '🔒', text: 'A space that belongs only to you two' }] },
  { type: 'manifesto' as const },
]

const N = CARDS.length // 9
// Each card gets 100vh of scroll distance — feels natural, one scroll per card
const SCROLL_PER_CARD = 100 // vh
// Total outer height = sticky panel (100vh) + N cards × 100vh of travel
// The sticky panel itself takes 100vh, so we only need N extra vh slots
const TOTAL_HEIGHT = `calc(100vh + ${N * SCROLL_PER_CARD}vh)`

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

  // useScroll tracks the full outer container (sticky + scroll distance)
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring — moderate stiffness so cards feel weighty but responsive
  const sp = useSpring(scrollYProgress, { stiffness: 70, damping: 20, restDelta: 0.0001 })

  // ── How progress maps to cards ──────────────────────────────────────────────
  // Total scroll = N cards × 100vh  →  sp goes 0 → 1 across that distance
  // Card i is centred at progress = i / N  (each card owns 1/N of total range)
  // It arrives over half its slot and leaves over the next half slot
  const SLOT      = 1 / N           // fraction of total scroll one card occupies
  const ARRIVE    = SLOT * 0.45     // card rises in during first 45% of its slot
  const LINGER    = SLOT * 0.30     // card stays fully visible for 30%
  const DEPART    = SLOT * 0.25     // card fades/scales out over final 25%

  // helper: clamp to [0,1] so boundary cards don't go negative
  const cl = (v: number) => Math.max(0, Math.min(1, v))

  // Card 0
  const s0 = 0 * SLOT
  const y0  = useTransform(sp, [cl(s0),            cl(s0 + ARRIVE)],                       [60, 0])
  const o0  = useTransform(sp, [cl(s0),            cl(s0 + ARRIVE), cl(s0 + ARRIVE + LINGER), cl(s0 + SLOT)], [0, 1, 1, 0])
  const sc0 = useTransform(sp, [cl(s0 + ARRIVE + LINGER), cl(s0 + SLOT)],                 [1, 0.94])

  // Card 1
  const s1 = 1 * SLOT
  const y1  = useTransform(sp, [cl(s1),            cl(s1 + ARRIVE)],                       [60, 0])
  const o1  = useTransform(sp, [cl(s1),            cl(s1 + ARRIVE), cl(s1 + ARRIVE + LINGER), cl(s1 + SLOT)], [0, 1, 1, 0])
  const sc1 = useTransform(sp, [cl(s1 + ARRIVE + LINGER), cl(s1 + SLOT)],                 [1, 0.94])

  // Card 2
  const s2 = 2 * SLOT
  const y2  = useTransform(sp, [cl(s2),            cl(s2 + ARRIVE)],                       [60, 0])
  const o2  = useTransform(sp, [cl(s2),            cl(s2 + ARRIVE), cl(s2 + ARRIVE + LINGER), cl(s2 + SLOT)], [0, 1, 1, 0])
  const sc2 = useTransform(sp, [cl(s2 + ARRIVE + LINGER), cl(s2 + SLOT)],                 [1, 0.94])

  // Card 3
  const s3 = 3 * SLOT
  const y3  = useTransform(sp, [cl(s3),            cl(s3 + ARRIVE)],                       [60, 0])
  const o3  = useTransform(sp, [cl(s3),            cl(s3 + ARRIVE), cl(s3 + ARRIVE + LINGER), cl(s3 + SLOT)], [0, 1, 1, 0])
  const sc3 = useTransform(sp, [cl(s3 + ARRIVE + LINGER), cl(s3 + SLOT)],                 [1, 0.94])

  // Card 4
  const s4 = 4 * SLOT
  const y4  = useTransform(sp, [cl(s4),            cl(s4 + ARRIVE)],                       [60, 0])
  const o4  = useTransform(sp, [cl(s4),            cl(s4 + ARRIVE), cl(s4 + ARRIVE + LINGER), cl(s4 + SLOT)], [0, 1, 1, 0])
  const sc4 = useTransform(sp, [cl(s4 + ARRIVE + LINGER), cl(s4 + SLOT)],                 [1, 0.94])

  // Card 5
  const s5 = 5 * SLOT
  const y5  = useTransform(sp, [cl(s5),            cl(s5 + ARRIVE)],                       [60, 0])
  const o5  = useTransform(sp, [cl(s5),            cl(s5 + ARRIVE), cl(s5 + ARRIVE + LINGER), cl(s5 + SLOT)], [0, 1, 1, 0])
  const sc5 = useTransform(sp, [cl(s5 + ARRIVE + LINGER), cl(s5 + SLOT)],                 [1, 0.94])

  // Card 6
  const s6 = 6 * SLOT
  const y6  = useTransform(sp, [cl(s6),            cl(s6 + ARRIVE)],                       [60, 0])
  const o6  = useTransform(sp, [cl(s6),            cl(s6 + ARRIVE), cl(s6 + ARRIVE + LINGER), cl(s6 + SLOT)], [0, 1, 1, 0])
  const sc6 = useTransform(sp, [cl(s6 + ARRIVE + LINGER), cl(s6 + SLOT)],                 [1, 0.94])

  // Card 7
  const s7 = 7 * SLOT
  const y7  = useTransform(sp, [cl(s7),            cl(s7 + ARRIVE)],                       [60, 0])
  const o7  = useTransform(sp, [cl(s7),            cl(s7 + ARRIVE), cl(s7 + ARRIVE + LINGER), cl(s7 + SLOT)], [0, 1, 1, 0])
  const sc7 = useTransform(sp, [cl(s7 + ARRIVE + LINGER), cl(s7 + SLOT)],                 [1, 0.94])

  // Card 8 — last card: arrives and STAYS (no fade-out)
  const s8 = 8 * SLOT
  const y8  = useTransform(sp, [cl(s8), cl(s8 + ARRIVE)], [60, 0])
  const o8  = useTransform(sp, [cl(s8), cl(s8 + ARRIVE)], [0, 1])
  const sc8 = useTransform(sp, [cl(s8), cl(s8 + ARRIVE)], [0.96, 1])

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

  // ── Background transitions — one useTransform per theme, no hooks-in-loops ──
  const bg0 = useTransform(sp, [cl(0*SLOT), cl(0*SLOT+SLOT*0.5), cl(0*SLOT+SLOT)], [0, 1, 0])
  const bg1 = useTransform(sp, [cl(1*SLOT), cl(1*SLOT+SLOT*0.5), cl(1*SLOT+SLOT)], [0, 1, 0])
  const bg2 = useTransform(sp, [cl(2*SLOT), cl(2*SLOT+SLOT*0.5), cl(2*SLOT+SLOT)], [0, 1, 0])
  const bg3 = useTransform(sp, [cl(3*SLOT), cl(3*SLOT+SLOT*0.5), cl(3*SLOT+SLOT)], [0, 1, 0])
  const bg4 = useTransform(sp, [cl(4*SLOT), cl(4*SLOT+SLOT*0.5), cl(4*SLOT+SLOT)], [0, 1, 0])
  const bg5 = useTransform(sp, [cl(5*SLOT), cl(5*SLOT+SLOT*0.5), cl(5*SLOT+SLOT)], [0, 1, 0])
  const bg6 = useTransform(sp, [cl(6*SLOT), cl(6*SLOT+SLOT*0.5), cl(6*SLOT+SLOT)], [0, 1, 0])
  const bg7 = useTransform(sp, [cl(7*SLOT), cl(7*SLOT+SLOT*0.5), cl(7*SLOT+SLOT)], [0, 1, 0])
  const bg8 = useTransform(sp, [cl(8*SLOT), cl(Math.min(1, 8*SLOT+SLOT*0.5))],     [0, 1])
  const bgOpacities = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8]

  // Scroll hint fades out quickly once user starts scrolling
  const hintOp = useTransform(sp, [0, 0.04], [1, 0])

  return (
    /*
     * Outer div creates the scroll distance.
     * - 100vh  = the sticky panel height (it sits flush at top:0)
     * - N*100vh = travel distance so each of the N cards gets a full viewport scroll
     * No overflow:hidden here — sticky only works when ancestors can scroll.
     */
    <div ref={containerRef} style={{ height: TOTAL_HEIGHT }}>

      {/* Sticky viewport panel — pinned until outer div scrolls past */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh' }}
      >

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

        {/* Card stack — centred in the sticky panel */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <div className="relative w-full" style={{ height: 320 }}>
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

        {/* Scroll progress dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-[5] pointer-events-none">
          {CARDS.map((_, i) => {
            const dotProgress = i / (N - 1)
            return (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: 'rgba(44,36,22,0.20)',
                  scale: useTransform(sp, [Math.max(0, dotProgress - 0.08), dotProgress, Math.min(1, dotProgress + 0.08)], [1, 1.6, 1]),
                  opacity: useTransform(sp, [Math.max(0, dotProgress - 0.1), dotProgress, Math.min(1, dotProgress + 0.1)], [0.25, 1, 0.25]),
                }}
              />
            )
          })}
        </div>

        {/* Scroll hint — visible only at the very start */}
        <motion.div
          className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-[5]"
          style={{ opacity: hintOp }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: 'rgba(44,36,22,0.22)' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: 'rgba(44,36,22,0.35)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(44,36,22,0.30)' }}>scroll</span>
        </motion.div>

      </div>
    </div>
  )
}
