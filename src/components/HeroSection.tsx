'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import DecoBubbles from './DecoBubbles'

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.04, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
}

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} style={{ perspective: '600px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const springY = useSpring(y, { stiffness: 60, damping: 18 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden paper"
    >
      <DecoBubbles />

      <motion.div
        style={{ y: springY, opacity }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-[#F7F4E9] border border-[rgba(67,61,53,0.1)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          <span className="text-xs font-medium text-[#7C7267] tracking-wide">Coming soon — Join the waitlist</span>
        </motion.div>

        {/* Main headline */}
        <h1 className="text-[56px] sm:text-[72px] md:text-[90px] font-serif font-bold leading-[0.92] tracking-tight text-[#2C2720] mb-6">
          <SplitText text="for the" />
          <br />
          <span className="italic">
            <SplitText text="people" />
          </span>
          <br />
          <SplitText text="who matter." />
        </h1>

        {/* Squiggle under "people" */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="text-lg text-[#7C7267] max-w-lg mx-auto leading-relaxed mb-10"
        >
          A private app for your closest connections —
          partners, best friends, and trusted circles.
          Films, memories, priorities. No algorithm. Just love.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a href="#waitlist" className="btn-ink" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            Join Waitlist
          </motion.a>
          <motion.a href="#films" className="btn-outline" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            See the App
          </motion.a>
        </motion.div>

        {/* Floating cards mimicking app UI */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute inset-0 pointer-events-none hidden md:block"
        >
          {/* "Films of my day" style card */}
          <motion.div
            className="absolute top-[8%] left-[-2%] bg-white rounded-2xl shadow-sm border border-[rgba(67,61,53,0.08)] px-4 py-3 w-44 text-left"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-[9px] tracking-widest uppercase text-[#A89F8D] mb-1">Films of my day</div>
            <div className="font-serif italic text-lg text-[#2C2720]">Monday</div>
            <div className="text-[10px] text-[#7C7267]">Mar 30, 2026</div>
          </motion.div>

          {/* Priority bubble cluster */}
          <motion.div
            className="absolute top-[12%] right-[-3%] flex gap-2 items-end"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {['#FAD1D8','#DBC0E7','#C9E6EE','#A8E6CF'].map((c, i) => (
              <div
                key={i}
                className="rounded-full border-2 border-white shadow-sm"
                style={{ width: 36 + i * 6, height: 36 + i * 6, background: c }}
              />
            ))}
          </motion.div>

          {/* Timeline label */}
          <motion.div
            className="absolute bottom-[28%] left-[-1%] bg-white rounded-2xl shadow-sm border border-[rgba(67,61,53,0.08)] px-4 py-2.5"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-xs text-[#7C7267]">📅 30 mar</div>
            <div className="text-xs font-semibold text-[#433D35] mt-0.5">2 new films shared</div>
          </motion.div>

          {/* SEEN label */}
          <motion.div
            className="absolute bottom-[30%] right-[-1%] bg-[#F7F4E9] rounded-xl px-3 py-1.5 border border-[rgba(67,61,53,0.08)]"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#A89F8D]">SEEN</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="text-[10px] tracking-widest uppercase text-[#A89F8D]">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#A89F8D] to-transparent"
          animate={{ scaleY: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
