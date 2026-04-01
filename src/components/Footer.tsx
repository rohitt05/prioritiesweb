'use client'

import Link from 'next/link'
import { motion, useInView, useDragControls } from 'framer-motion'
import { useRef, useState } from 'react'

// ─── Avatar data ───────────────────────────────────────────────────────────────
const MY_AVATAR = {
  emoji: '🧑‍💻',
  label: 'you',
  isMe: true,
}

const FRIEND_AVATARS = [
  { id: 1,  emoji: '👩‍🎨', label: 'the creative one',   color: '#E8C5B0', startX: '5%',  delay: 0.05 },
  { id: 2,  emoji: '👨‍🎸', label: 'the fun one',         color: '#B0C9E8', startX: '16%', delay: 0.18 },
  { id: 3,  emoji: '👩‍💻', label: 'the smart one',       color: '#C8E8B0', startX: '27%', delay: 0.08 },
  { id: 4,  emoji: '🧔',   label: 'your ride-or-die',   color: '#E8B0C5', startX: '38%', delay: 0.25 },
  { id: 5,  emoji: '👩‍🍳', label: 'who feeds you',      color: '#E8DDB0', startX: '54%', delay: 0.12 },
  { id: 6,  emoji: '🧕',   label: 'your rock',          color: '#D4B0E8', startX: '65%', delay: 0.30 },
  { id: 7,  emoji: '👨‍🚀', label: 'the dreamer',        color: '#B0E8E4', startX: '76%', delay: 0.07 },
  { id: 8,  emoji: '👩‍⚕️', label: 'the wise one',       color: '#E8C9B0', startX: '87%', delay: 0.20 },
  { id: 9,  emoji: '🧑‍🎤', label: 'your person',        color: '#F5B8D0', startX: '94%', delay: 0.15 },
]

// ─── Single draggable friend avatar ──────────────────────────────────────────
function FriendAvatar({ emoji, label, color, startX, delay }: typeof FRIEND_AVATARS[0]) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const [landed, setLanded] = useState(false)
  const [dragging, setDragging] = useState(false)

  return (
    <motion.div
      ref={ref}
      drag={landed}
      dragElastic={0.18}
      dragMomentum={true}
      whileDrag={{ scale: 1.12, zIndex: 50, cursor: 'grabbing' }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      initial={{ y: -220, opacity: 0, scale: 0.7 }}
      animate={inView ? {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          delay,
          duration: 0.75,
          type: 'spring',
          stiffness: 140,
          damping: 13,
          onComplete: () => setLanded(true),
        }
      } : {}}
      whileHover={landed && !dragging ? {
        y: -10,
        scale: 1.08,
        transition: { type: 'spring', stiffness: 380, damping: 18 }
      } : {}}
      style={{
        position: 'absolute',
        left: startX,
        bottom: 0,
        cursor: landed ? 'grab' : 'default',
        zIndex: dragging ? 50 : 10,
        touchAction: 'none',
      }}
      className="flex flex-col items-center gap-2 select-none"
    >
      {/* Circle avatar */}
      <div
        style={{ background: color }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-lg"
      >
        {emoji}
      </div>
      {/* Label */}
      <span className="text-[10px] text-[#5A554F] font-medium whitespace-nowrap tracking-wide">
        {label}
      </span>
    </motion.div>
  )
}

// ─── My static center avatar ─────────────────────────────────────────────────
function MyAvatar() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-2 z-20">
      <div className="relative">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-[#C17B6B]/30 blur-md scale-110" />
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#C17B6B] flex items-center justify-center text-4xl sm:text-5xl shadow-xl relative z-10 border-[3px] border-[#F5F0E8]/20">
          🧑‍💻
        </div>
      </div>
      <span className="text-[11px] text-[#C17B6B] font-semibold tracking-widest uppercase">you</span>
    </div>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <footer className="bg-[#100F0D] text-[#9A9589] overflow-hidden">

      {/* ── Links + brand grid ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-14">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">

          {/* Brand col */}
          <div className="max-w-[200px]">
            <span className="font-serif italic text-[26px] font-bold text-[#F5F0E8] block mb-2">priorities</span>
            <p className="text-xs leading-relaxed text-[#4A4540]">
              9 people. Real moments. No noise.
            </p>
          </div>

          {/* Link columns */}
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

      {/* ── Bottom copyright bar ── */}
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

      {/* ── ANIMATED SECTION — full width, below everything ── */}
      <div
        ref={sectionRef}
        className="relative w-full border-t border-[#1E1C18] overflow-visible"
        style={{ background: 'linear-gradient(to top, #0A0908 0%, #100F0D 100%)' }}
      >
        {/* Big tagline */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#3D3830] text-xs tracking-widest uppercase font-semibold mb-5"
          >
            me and my 9 idiots
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-[36px] sm:text-[52px] md:text-[64px] font-bold text-[#F5F0E8] leading-[1.05] mb-3"
          >
            built with love,
            <br />
            <span className="text-[#C17B6B]">for love —</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#4A4540] text-base sm:text-lg font-light italic mb-4"
          >
            by your lover 🌸
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-[#2E2B27] text-[11px] tracking-wide"
          >
            drag them around ↓
          </motion.p>
        </div>

        {/* Avatar stage — fixed height container */}
        <div
          className="relative w-full mx-auto"
          style={{ height: 180, maxWidth: '100%', overflow: 'visible' }}
        >
          {/* My avatar — static center */}
          <MyAvatar />

          {/* 9 falling friend avatars */}
          {FRIEND_AVATARS.map(a => (
            <FriendAvatar key={a.id} {...a} />
          ))}
        </div>

        {/* Ground gradient */}
        <div className="h-24 w-full" style={{
          background: 'linear-gradient(to top, #0A0908 40%, transparent 100%)'
        }} />
      </div>

    </footer>
  )
}
