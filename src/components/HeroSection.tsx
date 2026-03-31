'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import DecoBubbles from './DecoBubbles'

const WORDS = ['for', 'the', 'people', 'who', 'matter.']

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const y  = useTransform(scrollYProgress, [0,1], ['0%','28%'])
  const op = useTransform(scrollYProgress, [0,0.75], [1, 0])
  const sc = useTransform(scrollYProgress, [0,1], [1, 0.94])
  const sy = useSpring(y, { stiffness: 55, damping: 18 })

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      <DecoBubbles />

      <motion.div style={{ y: sy, opacity: op, scale: sc }} className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16,1,0.3,1] }}
          className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full bg-white border border-[rgba(67,61,53,0.1)] shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          <span className="text-[12px] font-medium text-[#7C7267] tracking-wide">Now accepting early access</span>
        </motion.div>

        {/* Giant headline — word-by-word */}
        <h1 className="font-serif text-[clamp(56px,12vw,130px)] font-bold leading-[0.88] tracking-tight text-[#2C2720] mb-8">
          {WORDS.map((word, wi) => (
            <motion.span
              key={wi}
              className={`inline-block mr-[0.18em] ${
                word === 'people' ? 'italic text-[#D4A373]' : ''
              }`}
              initial={{ opacity: 0, y: 70, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5 + wi * 0.1, duration: 0.75, ease: [0.16,1,0.3,1] }}
              style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-[17px] md:text-[19px] text-[#7C7267] max-w-[480px] mx-auto leading-relaxed mb-12"
        >
          A private app for partners, best friends, and trusted circles.
          Films. Memories. No algorithm.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a href="#waitlist" className="btn-ink text-[14px]" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            Join Waitlist <span className="ml-1 opacity-60">↗</span>
          </motion.a>
          <motion.a href="#films" className="btn-outline text-[14px]" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            See the App
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating UI chips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} className="absolute inset-0 pointer-events-none hidden lg:block">
        {[
          { label: 'Films of my day', sub: 'Monday · Mar 30', top: '18%', left: '2%', rotate: -4, delay: 0 },
          { label: '📌 Priority #1', sub: 'Mehak · active', top: '14%', right: '2%', rotate: 5, delay: 0.2 },
          { label: 'SEEN ✓', sub: '2 minutes ago', bottom: '28%', left: '1%', rotate: 3, delay: 0.4 },
          { label: '🎞️ 12 Films', sub: 'This week', bottom: '24%', right: '1%', rotate: -3, delay: 0.6 },
        ].map((chip, i) => (
          <motion.div
            key={i}
            className="absolute bg-white border border-[rgba(67,61,53,0.09)] rounded-2xl px-4 py-3 shadow-sm min-w-[140px]"
            style={{ top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right, rotate: chip.rotate }}
            animate={{ y: [0, -9, 0] }}
            transition={{ delay: 2.1 + chip.delay, duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-[12px] font-semibold text-[#433D35]">{chip.label}</div>
            <div className="text-[10px] text-[#A89F8D] mt-0.5">{chip.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-tag">scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#A89F8D] to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
