'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 50))

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'py-3 bg-[#FDFCF0]/92 backdrop-blur-xl border-b border-[rgba(67,61,53,0.07)] shadow-sm'
          : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <motion.span
          className="text-[22px] font-serif italic font-bold text-[#433D35] tracking-tight cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          priorities
        </motion.span>

        <div className="hidden md:flex items-center gap-8">
          {['Films','Priorities','Timeline','Features'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] text-[#7C7267] hover:text-[#2C2720] transition-colors"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#waitlist"
          className="btn-ink text-[13px] py-2.5 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Join Waitlist
        </motion.a>
      </div>
    </motion.nav>
  )
}
