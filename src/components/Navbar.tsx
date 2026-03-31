'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-[#FDFCF0]/90 backdrop-blur-md border-b border-[rgba(67,61,53,0.08)]' : 'py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
          <span className="text-[22px] font-serif italic font-bold text-[#433D35] tracking-tight">priorities</span>
        </motion.div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Films', 'Priorities', 'Timeline', 'Features'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[#7C7267] hover:text-[#433D35] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#waitlist"
          className="btn-ink text-sm py-2.5 px-6"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Join Waitlist
        </motion.a>
      </div>
    </motion.nav>
  )
}
