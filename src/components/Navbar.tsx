'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 50))

  const links = ['Films', 'Priorities', 'Timeline', 'Features']

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'py-3 bg-[#FDFCF0]/92 backdrop-blur-xl border-b border-[rgba(67,61,53,0.07)] shadow-sm'
          : 'py-5 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.span
          className="text-[20px] sm:text-[22px] font-serif italic font-bold text-[#433D35] tracking-tight cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          priorities
        </motion.span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((item, i) => (
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

        <div className="flex items-center gap-3">
          <motion.a
            href="#waitlist"
            className="btn-ink text-[12px] sm:text-[13px] py-2 sm:py-2.5 px-4 sm:px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Waitlist
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.94 }}
          >
            <motion.span
              className="w-5 h-0.5 bg-[#433D35] rounded-full"
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-[#433D35] rounded-full"
              animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-[#433D35] rounded-full"
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-[#FDFCF0]/95 backdrop-blur-xl border-t border-[rgba(67,61,53,0.06)]"
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {links.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="py-3 text-[15px] text-[#433D35] font-medium border-b border-[rgba(67,61,53,0.06)] last:border-0"
              initial={{ opacity: 0, x: -16 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}
