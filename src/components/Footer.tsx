'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ─── SVG face renderers (same as AudienceSection) ──────────────────────────────
const FACES = [
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FAD1D8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><ellipse cx="32" cy="18" rx="13" ry="10" fill="#3D2314"/><ellipse cx="20" cy="22" rx="5" ry="7" fill="#3D2314"/><ellipse cx="44" cy="22" rx="5" ry="7" fill="#3D2314"/><circle cx="26" cy="30" r="1.2" fill="#3D2314"/><circle cx="38" cy="30" r="1.2" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#C17B6B" strokeWidth="1.5" strokeLinecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/></svg>),
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#DBC0E7"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><rect x="19" y="15" width="26" height="14" rx="6" fill="#2C1A0E"/><circle cx="26" cy="30" r="1.3" fill="#2C1A0E"/><circle cx="38" cy="30" r="1.3" fill="#2C1A0E"/><path d="M28 37 Q32 39 36 37" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#C9E6EE"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#8D5524"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#8D5524"/><circle cx="22" cy="22" r="8" fill="#1C0A00"/><circle cx="32" cy="18" r="9" fill="#1C0A00"/><circle cx="42" cy="22" r="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 40 36 37" stroke="#6B3A2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#C17B6B" opacity="0.4"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#C17B6B" opacity="0.4"/></svg>),
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#D4E6D0"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#6B3F1E"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 39 36 37" stroke="#C17B6B" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#F0E6C8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><ellipse cx="32" cy="17" rx="14" ry="8" fill="#5C3317"/><rect x="28" y="10" width="8" height="16" rx="4" fill="#5C3317"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/></svg>),
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#E8D5C4"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#4A2912"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#4A2912"/><ellipse cx="32" cy="19" rx="13" ry="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 39 36 37" stroke="#6B3A2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
]

function YouAvatar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#FDFCF0"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/>
      <path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#4A2912"/>
      <circle cx="26" cy="30" r="1.5" fill="#2C1A0E"/>
      <circle cx="38" cy="30" r="1.5" fill="#2C1A0E"/>
      <path d="M27 36 Q32 40 37 36" stroke="#C17B6B" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <ellipse cx="24" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/>
      <ellipse cx="40" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/>
    </svg>
  )
}

// 9 friends: leftPct kept 5–88 so they never clip left/right edge
// fallFrom is how far above their final resting spot they start (px)
// different sizes so they overlap and feel alive
const FRIENDS = [
  { id: 1, faceIdx: 0, label: 'the creative one', size: 112, leftPct: 5,  delay: 0.05, z: 3,  fallFrom: 520 },
  { id: 2, faceIdx: 1, label: 'the fun one',       size: 134, leftPct: 15, delay: 0.18, z: 5,  fallFrom: 600 },
  { id: 3, faceIdx: 2, label: 'the smart one',     size: 98,  leftPct: 25, delay: 0.09, z: 2,  fallFrom: 480 },
  { id: 4, faceIdx: 3, label: 'your ride-or-die',  size: 144, leftPct: 36, delay: 0.26, z: 6,  fallFrom: 640 },
  { id: 5, faceIdx: 4, label: 'who feeds you',     size: 106, leftPct: 56, delay: 0.13, z: 4,  fallFrom: 500 },
  { id: 6, faceIdx: 5, label: 'your rock',         size: 130, leftPct: 65, delay: 0.30, z: 7,  fallFrom: 580 },
  { id: 7, faceIdx: 1, label: 'the dreamer',       size: 94,  leftPct: 74, delay: 0.07, z: 2,  fallFrom: 460 },
  { id: 8, faceIdx: 0, label: 'the wise one',      size: 120, leftPct: 81, delay: 0.21, z: 5,  fallFrom: 560 },
  { id: 9, faceIdx: 2, label: 'your person',       size: 102, leftPct: 88, delay: 0.15, z: 3,  fallFrom: 510 },
]

// ─── Single draggable friend ───────────────────────────────────────────────────
function FriendAvatar({ faceIdx, label, size, leftPct, delay, z, fallFrom }: typeof FRIENDS[0]) {
  const [landed, setLanded] = useState(false)
  const [dragging, setDragging] = useState(false)

  return (
    <motion.div
      // free drag — no constraints, fully interactive
      drag={landed}
      dragElastic={0.18}
      dragMomentum
      whileDrag={{ scale: 1.13, zIndex: 80, cursor: 'grabbing' }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      // start high above, fall down to bottom:0
      initial={{ y: -fallFrom, opacity: 0, scale: 0.55, rotate: (leftPct % 2 === 0 ? -8 : 8) }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          delay,
          duration: 0.9,
          type: 'spring',
          stiffness: 100,
          damping: 11,
          onComplete: () => setLanded(true),
        },
      }}
      whileHover={landed && !dragging ? {
        y: -14,
        scale: 1.08,
        transition: { type: 'spring', stiffness: 360, damping: 16 },
      } : {}}
      style={{
        position: 'absolute',
        // center avatar on leftPct, clamped to stay fully on screen
        left: `calc(${leftPct}% - ${size / 2}px)`,
        bottom: 16, // small ground margin
        zIndex: dragging ? 80 : z,
        cursor: landed ? 'grab' : 'default',
        touchAction: 'none',
      }}
      className="flex flex-col items-center gap-1 select-none"
    >
      <div
        className="rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          boxShadow: '0 10px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)',
          border: '2.5px solid rgba(255,255,255,0.07)',
        }}
      >
        {FACES[faceIdx](size, `ff-${faceIdx}-${leftPct}`)}
      </div>
      <span style={{
        fontSize: Math.max(9, size * 0.082),
        color: '#4A4540',
        whiteSpace: 'nowrap',
        fontWeight: 500,
        letterSpacing: '0.04em',
      }}>
        {label}
      </span>
    </motion.div>
  )
}

// ─── My static avatar — center bottom, never falls, never draggable ─────────
function MyAvatar() {
  const size = 140
  return (
    <div
      className="absolute flex flex-col items-center gap-1 select-none"
      style={{ left: `calc(50% - ${size / 2}px)`, bottom: 16, zIndex: 20 }}
    >
      {/* pulse glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size + 56, height: size + 56,
          top: -28, left: -28,
          background: 'radial-gradient(circle, rgba(193,123,107,0.40) 0%, transparent 65%)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="rounded-full overflow-hidden relative"
        style={{
          width: size, height: size,
          border: '3.5px solid #D4A373',
          boxShadow: '0 8px 48px rgba(212,163,115,0.50), 0 2px 12px rgba(0,0,0,0.35)',
        }}
      >
        <YouAvatar size={size} />
      </div>
      <span style={{
        fontSize: 11,
        color: '#C17B6B',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        you
      </span>
    </div>
  )
}

// ─── The whole animated block — client-only mount to avoid hydration errors ───
function AnimatedBlock({ inView }: { inView: boolean }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div
      className="relative w-full border-t border-[#1E1C18]"
      style={{
        background: 'linear-gradient(to top, #0A0908 0%, #100F0D 100%)',
        // tall enough for text + avatars; overflow visible so avatars can peek above
        paddingBottom: 0,
        overflow: 'visible',
      }}
    >
      {/* Tagline text — sits at top of this block */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#3D3830] text-xs tracking-widest uppercase font-semibold mb-5"
        >
          me and my 9 idiots
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-[36px] sm:text-[52px] md:text-[64px] font-bold text-[#F5F0E8] leading-[1.05] mb-3"
        >
          built with love,<br />
          <span className="text-[#C17B6B]">for love —</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.36, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#4A4540] text-base sm:text-lg font-light italic mb-2"
        >
          by your lover 🌸
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-[#2A2824] text-[11px] tracking-wide"
        >
          drag them around ↓
        </motion.p>
      </div>

      {/*
        Avatar stage:
        - position: relative so avatars with bottom:16 land at the bottom of this div
        - overflow: visible so they can fall through/above the text visually
        - height: 220px gives them ground space
        - NO overflow hidden — fully free
      */}
      <div
        className="relative w-full"
        style={{ height: 220, overflow: 'visible' }}
      >
        {/* My avatar always present (no animation needed, it’s static) */}
        <MyAvatar />

        {/* 9 friends only mount client-side */}
        {mounted && FRIENDS.map(a => (
          <FriendAvatar key={a.id} {...a} />
        ))}
      </div>

      {/* ground fade */}
      <div
        className="h-20 w-full"
        style={{ background: 'linear-gradient(to top, #0A0908 60%, transparent 100%)', marginTop: -20 }}
      />
    </div>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <footer ref={sectionRef} className="bg-[#100F0D] text-[#9A9589]" style={{ overflow: 'visible' }}>

      {/* ── Links + brand grid ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-14">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div className="max-w-[200px]">
            <span className="font-serif italic text-[26px] font-bold text-[#F5F0E8] block mb-2">priorities</span>
            <p className="text-xs leading-relaxed text-[#4A4540]">9 people. Real moments. No noise.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Product</p>
              <ul className="space-y-3">
                <li><a href="/#about" className="hover:text-[#F5F0E8] transition-colors">About</a></li>
                <li><a href="/#features" className="hover:text-[#F5F0E8] transition-colors">Features</a></li>
                <li><a href="/#waitlist" className="hover:text-[#F5F0E8] transition-colors">Join Waitlist</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Company</p>
              <ul className="space-y-3">
                <li><a href="mailto:hello@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Contact</a></li>
                <li><a href="mailto:support@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Support</a></li>
                <li><a href="mailto:careers@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Join Us</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Legal</p>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#F5F0E8] transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-[#F5F0E8] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-[#1E1C18]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#3D3830]">
          <p>© {year} Priorities. All rights reserved. Made with 🌸 in India.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-[#9A9589] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#9A9589] transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-[#9A9589] transition-colors">Cookies</Link>
            <a href="mailto:hello@getpriorities.app" className="hover:text-[#9A9589] transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* ── Animated section ── */}
      <AnimatedBlock inView={inView} />

    </footer>
  )
}
