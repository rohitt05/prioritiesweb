'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

const wordVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const charVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function AnimatedWord({ word, className }: { word: string; className?: string }) {
  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className}`}
      variants={wordVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '600px' }}
    >
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 z-10">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full card-glass border border-white/10"
      >
        <Sparkles size={14} className="text-brand-rose" />
        <span className="text-sm text-white/60">Coming soon — Join the waitlist</span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-pulse" />
      </motion.div>

      {/* Main headline */}
      <motion.div
        style={{ y: springY, opacity, scale }}
        className="text-center max-w-4xl mx-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-6">
          <div className="mb-2">
            <AnimatedWord word="For the" />
          </div>
          <div className="mb-2">
            <AnimatedWord word="people" className="gradient-text" />
          </div>
          <div>
            <AnimatedWord word="who matter most." />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed mt-6"
        >
          Priorities is a private space built for your closest connections —
          partners, best friends, and trusted circles. No algorithm. No audience.
          Just the people you actually love.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <motion.a
            href="#waitlist"
            className="btn-primary text-base relative z-10"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Join the Waitlist
          </motion.a>
          <motion.a
            href="#features"
            className="btn-ghost text-base"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See Features
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* 3D floating cards behind headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[
          { top: '15%', left: '5%', rotate: -15, label: '📍 Priority List', delay: 0 },
          { top: '25%', right: '6%', rotate: 12, label: '🎙️ Audio Note', delay: 0.2 },
          { bottom: '25%', left: '8%', rotate: 8, label: '📸 Shared Memory', delay: 0.4 },
          { bottom: '20%', right: '5%', rotate: -10, label: '💜 Reaction', delay: 0.6 },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="absolute card-glass rounded-2xl px-4 py-2.5 text-sm font-medium text-white/70 hidden md:block"
            style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom, rotate: card.rotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: 2 + card.delay, duration: 0.6 },
              scale:   { delay: 2 + card.delay, duration: 0.6 },
              y:       { delay: 2 + card.delay, duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: card.delay },
            }}
          >
            {card.label}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
