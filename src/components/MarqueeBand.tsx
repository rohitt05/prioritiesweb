'use client'
import { motion } from 'framer-motion'

// Each bubble: type drives what's rendered inside
type Bubble =
  | { kind: 'avatar';   bg: string; initials: string; size: number; emoji?: string }
  | { kind: 'icon';     bg: string; emoji: string;    label: string; size: number }
  | { kind: 'media';    bg: string; gradient: string; icon: string;  size: number }
  | { kind: 'stat';     bg: string; value: string;    sub: string;   size: number }

const row1: Bubble[] = [
  { kind: 'avatar', bg: '#FAD1D8', initials: 'J',  emoji: '\uD83C\uDF38', size: 72 },
  { kind: 'icon',   bg: '#FFF0F3', emoji: '\uD83C\uDFAC', label: 'Film',    size: 56 },
  { kind: 'avatar', bg: '#DBC0E7', initials: 'A',  size: 64 },
  { kind: 'media',  bg: '#EEF8F4', gradient: 'linear-gradient(135deg,#A8E6CF,#C9E6EE)', icon: '\uD83D\uDCDE', size: 80 },
  { kind: 'icon',   bg: '#FDF4E7', emoji: '\uD83D\uDD14', label: 'Priority', size: 52 },
  { kind: 'avatar', bg: '#C9E6EE', initials: 'R',  size: 68 },
  { kind: 'stat',   bg: '#FDFCF0', value: '4',     sub: 'priorities',      size: 76 },
  { kind: 'icon',   bg: '#FAD1D8', emoji: '\uD83C\uDF99\uFE0F', label: 'Voice', size: 58 },
  { kind: 'avatar', bg: '#A8E6CF', initials: 'S',  size: 60 },
  { kind: 'media',  bg: '#F3E8FF', gradient: 'linear-gradient(135deg,#DBC0E7,#FAD1D8)', icon: '\uD83D\uDCF9', size: 72 },
  { kind: 'icon',   bg: '#E8F4FF', emoji: '\uD83D\uDD12', label: 'Private', size: 54 },
  { kind: 'avatar', bg: '#FAD1D8', initials: 'M',  emoji: '\uD83C\uDF1F', size: 66 },
]

const row2: Bubble[] = [
  { kind: 'media',  bg: '#FFF0F3', gradient: 'linear-gradient(135deg,#FAD1D8,#FFF0E8)', icon: '\uD83D\uDCF8', size: 68 },
  { kind: 'avatar', bg: '#C9E6EE', initials: 'K',  size: 58 },
  { kind: 'icon',   bg: '#EEF8F4', emoji: '\uD83D\uDC9C', label: 'Love',   size: 60 },
  { kind: 'avatar', bg: '#DBC0E7', initials: 'P',  emoji: '\u2728',       size: 74 },
  { kind: 'stat',   bg: '#FDFCF0', value: '24h',   sub: 'films',           size: 70 },
  { kind: 'icon',   bg: '#FDF4E7', emoji: '\uD83D\uDCF1', label: 'Media',  size: 54 },
  { kind: 'avatar', bg: '#A8E6CF', initials: 'N',  size: 62 },
  { kind: 'media',  bg: '#E8F4FF', gradient: 'linear-gradient(135deg,#C9E6EE,#DBC0E7)', icon: '\uD83D\uDCDE', size: 76 },
  { kind: 'icon',   bg: '#FAD1D8', emoji: '\uD83D\uDDD3\uFE0F', label: 'Timeline', size: 56 },
  { kind: 'avatar', bg: '#FAD1D8', initials: 'T',  size: 64 },
  { kind: 'icon',   bg: '#EEF8F4', emoji: '\uD83C\uDF08', label: 'Moments', size: 52 },
  { kind: 'stat',   bg: '#FFF0F3', value: '\u221E',  sub: 'memories',      size: 66 },
]

function BubbleItem({ b, i }: { b: Bubble; i: number }) {
  return (
    <motion.div
      className="flex-shrink-0 rounded-full flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{
        width:  b.size,
        height: b.size,
        background: b.kind === 'media' ? b.gradient : b.bg,
        boxShadow: '0 4px 20px rgba(67,61,53,0.10), 0 0 0 1.5px rgba(67,61,53,0.06)',
      }}
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 3.5 + (i % 5) * 0.6,
        delay:    (i % 7) * 0.35,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    >
      {b.kind === 'avatar' && (
        <>
          <span className="font-serif italic font-bold text-[#433D35]" style={{ fontSize: b.size * 0.32 }}>
            {b.initials}
          </span>
          {b.emoji && (
            <span className="absolute -bottom-0.5 -right-0.5 text-[13px] leading-none">{b.emoji}</span>
          )}
        </>
      )}
      {b.kind === 'icon' && (
        <div className="flex flex-col items-center gap-0.5">
          <span style={{ fontSize: b.size * 0.36 }}>{b.emoji}</span>
          <span className="text-[9px] font-medium text-[#7C7267] leading-none">{b.label}</span>
        </div>
      )}
      {b.kind === 'media' && (
        <div className="flex flex-col items-center gap-1">
          <span style={{ fontSize: b.size * 0.38 }}>{b.icon}</span>
          <div className="w-8 h-1 rounded-full bg-white/50" />
          <div className="w-5 h-1 rounded-full bg-white/30" />
        </div>
      )}
      {b.kind === 'stat' && (
        <div className="flex flex-col items-center">
          <span className="font-serif italic font-bold text-[#433D35]" style={{ fontSize: b.size * 0.3 }}>
            {b.value}
          </span>
          <span className="text-[8px] font-medium text-[#7C7267] leading-none tracking-wide uppercase">
            {b.sub}
          </span>
        </div>
      )}
    </motion.div>
  )
}

function MarqueeRow({ bubbles, reverse = false }: { bubbles: Bubble[]; reverse?: boolean }) {
  const doubled = [...bubbles, ...bubbles, ...bubbles]
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4 items-center"
        style={{ width: 'max-content' }}
        animate={{ x: reverse ? ['0%', '33.333%'] : ['0%', '-33.333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((b, i) => (
          <BubbleItem key={i} b={b} i={i} />
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeBand() {
  return (
    <div className="relative overflow-hidden bg-[#F7F4E9] py-6 sm:py-8">
      {/* Soft fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, #F7F4E9, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, #F7F4E9, transparent)' }} />

      <div className="flex flex-col gap-4">
        <MarqueeRow bubbles={row1} />
        <MarqueeRow bubbles={row2} reverse />
      </div>
    </div>
  )
}
