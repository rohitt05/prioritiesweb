'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const AVATARS = [
  { emoji: '🧑‍🎤', label: 'your person', x: '8%',  delay: 0.0, rotate: -14, size: 52 },
  { emoji: '👩‍💻', label: 'the smart one', x: '18%', delay: 0.12, rotate: 8,  size: 44 },
  { emoji: '🧔',   label: 'your ride-or-die', x: '30%', delay: 0.22, rotate: -6,  size: 48 },
  { emoji: '👩‍🎨', label: 'the creative one', x: '42%', delay: 0.08, rotate: 12, size: 40 },
  { emoji: '🧑‍🍳', label: 'who feeds you', x: '54%', delay: 0.18, rotate: -10, size: 56 },
  { emoji: '👨‍🎓', label: 'the nerd', x: '64%', delay: 0.30, rotate: 7,  size: 42 },
  { emoji: '👩‍🚀', label: 'dreamer', x: '74%', delay: 0.05, rotate: -8,  size: 46 },
  { emoji: '🧑‍🎸', label: 'the fun one', x: '84%', delay: 0.24, rotate: 15, size: 50 },
  { emoji: '🧕',   label: 'your rock', x: '93%', delay: 0.14, rotate: -5,  size: 44 },
]

function FallingAvatar({ emoji, label, x, delay, rotate, size }: typeof AVATARS[0]) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      title={label}
      initial={{ y: -120, opacity: 0, rotate: rotate * 1.5 }}
      animate={inView ? {
        y: 0,
        opacity: 1,
        rotate,
        transition: {
          delay,
          duration: 0.7,
          type: 'spring',
          stiffness: 160,
          damping: 14,
        }
      } : {}}
      whileHover={{
        y: -10,
        rotate: rotate * -0.6,
        scale: 1.18,
        transition: { type: 'spring', stiffness: 400, damping: 16 }
      }}
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        fontSize: size,
        lineHeight: 1,
        cursor: 'default',
        userSelect: 'none',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))',
      }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <footer className="bg-[#100F0D] text-[#9A9589] overflow-hidden">

      {/* ── Hero band ── */}
      <div ref={sectionRef} className="relative px-5 sm:px-8 pt-28 pb-20">

        {/* Falling avatars */}
        <div className="relative h-20 mb-10 max-w-5xl mx-auto">
          {AVATARS.map(a => <FallingAvatar key={a.emoji} {...a} />)}
        </div>

        {/* Big tagline */}
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#5A554F] text-sm tracking-widest uppercase font-semibold mb-4"
          >
            me and my 9 idiots
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-[40px] sm:text-[58px] md:text-[72px] font-bold text-[#F5F0E8] leading-[1.05] mb-5"
          >
            built with love,
            <br />
            <span className="text-[#C17B6B]">for love —</span>
            <br />
            <span className="text-[#8A8278] text-[28px] sm:text-[38px] md:text-[48px] font-normal not-italic">by your lover 🌸</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#4A4540] text-sm leading-relaxed max-w-sm mx-auto"
          >
            A private space for the 9 people who actually matter.
            Real moments. No algorithm. No noise.
          </motion.p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[#1E1C18] mx-5 sm:mx-8" />

      {/* ── Links grid ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
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
            {/* Product */}
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Product</p>
              <ul className="space-y-3">
                <li><a href="/#about" className="hover:text-[#F5F0E8] transition-colors">About</a></li>
                <li><a href="/#features" className="hover:text-[#F5F0E8] transition-colors">Features</a></li>
                <li><a href="/#waitlist" className="hover:text-[#F5F0E8] transition-colors">Join Waitlist</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-4 text-xs tracking-widest uppercase">Company</p>
              <ul className="space-y-3">
                <li><a href="mailto:hello@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Contact</a></li>
                <li><a href="mailto:support@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Support</a></li>
                <li><a href="mailto:careers@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Join Us</a></li>
              </ul>
            </div>

            {/* Legal */}
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

      {/* ── Bottom bar ── */}
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

    </footer>
  )
}
