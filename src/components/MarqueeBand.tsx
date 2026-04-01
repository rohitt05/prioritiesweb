'use client'
import { motion } from 'framer-motion'

type Bubble =
  | { kind: 'avatar'; bg: string; initials: string; emoji?: string }
  | { kind: 'icon';   bg: string; emoji: string; label: string }
  | { kind: 'media';  gradient: string; icon: string }
  | { kind: 'stat';   bg: string; value: string; sub: string }

const bubbles: Bubble[] = [
  { kind: 'avatar', bg: '#FAD1D8', initials: 'J', emoji: '\uD83C\uDF38' },
  { kind: 'icon',   bg: '#FFF0F3', emoji: '\uD83C\uDFAC', label: 'Film' },
  { kind: 'avatar', bg: '#DBC0E7', initials: 'A' },
  { kind: 'media',  gradient: 'linear-gradient(135deg,#A8E6CF,#C9E6EE)', icon: '\uD83D\uDCF9' },
  { kind: 'icon',   bg: '#FDF4E7', emoji: '\uD83D\uDD14', label: 'Priority' },
  { kind: 'avatar', bg: '#C9E6EE', initials: 'R' },
  { kind: 'stat',   bg: '#EEF8F4', value: '4', sub: 'priorities' },
  { kind: 'icon',   bg: '#FAD1D8', emoji: '\uD83C\uDF99\uFE0F', label: 'Voice' },
  { kind: 'avatar', bg: '#A8E6CF', initials: 'S' },
  { kind: 'media',  gradient: 'linear-gradient(135deg,#DBC0E7,#FAD1D8)', icon: '\uD83D\uDCDE' },
  { kind: 'icon',   bg: '#E8F4FF', emoji: '\uD83D\uDD12', label: 'Private' },
  { kind: 'avatar', bg: '#FAD1D8', initials: 'M', emoji: '\u2728' },
  { kind: 'stat',   bg: '#FFF0F3', value: '24h', sub: 'films' },
  { kind: 'icon',   bg: '#EEF8F4', emoji: '\uD83D\uDC9C', label: 'Love' },
  { kind: 'avatar', bg: '#DBC0E7', initials: 'K' },
]

// Wave offsets per index — creates a natural sine-like feel
const waveY = [0, -14, -22, -14, 0, 14, 22, 14, 0, -14, -22, -14, 0, 14, 22]

const SIZE = 62

function BubbleItem({ b, i }: { b: Bubble; i: number }) {
  const baseY = waveY[i % waveY.length]
  return (
    <motion.div
      className="flex-shrink-0 rounded-full flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{
        width:  SIZE,
        height: SIZE,
        background: b.kind === 'media' ? b.gradient : b.bg,
        boxShadow: '0 4px 18px rgba(67,61,53,0.10), 0 0 0 1.5px rgba(67,61,53,0.06)',
      }}
      animate={{ y: [baseY, baseY - 8, baseY] }}
      transition={{
        duration: 3.2 + (i % 5) * 0.5,
        delay:    (i % 7) * 0.3,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    >
      {b.kind === 'avatar' && (
        <>
          <span className="font-serif italic font-bold text-[#433D35] text-[18px] leading-none">
            {b.initials}
          </span>
          {b.emoji && (
            <span className="absolute -bottom-0.5 -right-0.5 text-[11px]">{b.emoji}</span>
          )}
        </>
      )}
      {b.kind === 'icon' && (
        <div className="flex flex-col items-center gap-[2px]">
          <span className="text-[22px] leading-none">{b.emoji}</span>
          <span className="text-[8px] font-medium text-[#7C7267] leading-none">{b.label}</span>
        </div>
      )}
      {b.kind === 'media' && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-[22px] leading-none">{b.icon}</span>
          <div className="w-6 h-[3px] rounded-full bg-white/50" />
        </div>
      )}
      {b.kind === 'stat' && (
        <div className="flex flex-col items-center">
          <span className="font-serif italic font-bold text-[#433D35] text-[16px] leading-none">
            {b.value}
          </span>
          <span className="text-[8px] font-medium text-[#7C7267] leading-none tracking-wide uppercase mt-0.5">
            {b.sub}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function MarqueeBand() {
  const tripled = [...bubbles, ...bubbles, ...bubbles]
  return (
    // No background — transparent, blends with page
    <div className="relative overflow-hidden py-10">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: 'linear-gradient(to right, var(--bg, #FDFCF0), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: 'linear-gradient(to left, var(--bg, #FDFCF0), transparent)' }} />

      <motion.div
        className="flex gap-5 items-center"
        style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {tripled.map((b, i) => (
          <BubbleItem key={i} b={b} i={i} />
        ))}
      </motion.div>
    </div>
  )
}
