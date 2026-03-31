'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? 'card-glass py-3 mx-4' : ''
        }`}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF4D6D, #C77DFF)' }}>
            <Heart size={16} fill="white" color="white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Priorities</span>
        </motion.div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'For Who', 'About'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-white/60 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#waitlist"
          className="btn-primary text-sm py-2.5 px-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Early Access
        </motion.a>
      </div>
    </motion.nav>
  )
}
