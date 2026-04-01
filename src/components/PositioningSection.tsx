'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const notForPills = [
  { icon: '🌍', line: 'Your follower count' },
  { icon: '📢', line: 'The highlight reel' },
  { icon: '🔔', line: 'Notifications from strangers' },
  { icon: '🤳', line: 'Looking good for the internet' },
  { icon: '📈', line: 'Going viral' },
  { icon: '👀', line: 'Who viewed your story' },
]

const forLines = [
  { emoji: '🫀', text: 'The 2am text you actually mean' },
  { emoji: '📸', text: 'The photo you only send to one person' },
  { emoji: '🎙️', text: 'A voice note that sounds like a hug' },
  { emoji: '🗓️', text: 'Every small moment that becomes a memory' },
  { emoji: '🔒', text: 'A space that belongs only to you two' },
]

export default function PositioningSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8 bg-[#1C1814] overflow-hidden">
      {/* Ambient blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {['#D4A373', '#FAD1D8', '#DBC0E7'].map((c, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width: 200 + i * 140, height: 200 + i * 140,
              background: c, opacity: 0.07, filter: 'blur(70px)',
              top:   i === 0 ? '-15%' : i === 1 ? '50%' : '20%',
              left:  i === 0 ? '-8%'  : undefined,
              right: i !== 0 ? '-8%'  : undefined,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ delay: i * 0.7, duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className="max-w-2xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#7C7267] block mb-4">Let&apos;s be honest</span>
          <h2 className="font-serif text-[clamp(32px,6vw,68px)] font-bold text-[#FDFCF0] leading-[0.92] tracking-tight">
            This app is<br />
            <em className="text-[#D4A373]">not for everyone.</em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-[14px] sm:text-[16px] text-[#7C7267] leading-relaxed"
          >
            And that&apos;s the whole point.
          </motion.p>
        </motion.div>

        {/* ── NOT for pills ── */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {notForPills.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08]"
            >
              <span className="text-base">{p.icon}</span>
              <span className="text-[12px] sm:text-[13px] text-white/30 line-through">{p.line}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Serif divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-10 sm:mb-12"
        >
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-serif italic text-[#D4A373] text-[16px] sm:text-[20px] whitespace-nowrap">
            but it is for this.
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

        {/* ── FOR lines ── */}
        <div className="flex flex-col gap-4 sm:gap-5 mb-12 sm:mb-16">
          {forLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -36, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.65 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 sm:gap-4 group"
            >
              <motion.span
                className="text-xl sm:text-2xl w-8 sm:w-10 flex-shrink-0 text-center"
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ delay: i * 1.2, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >{line.emoji}</motion.span>
              <span className="text-[15px] sm:text-[18px] font-serif italic text-[#FDFCF0] leading-snug group-hover:text-[#D4A373] transition-colors duration-300">
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Manifesto card — centered, beautiful ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/[0.09] px-6 sm:px-12 py-10 sm:py-14"
        >
          {/* Opening quote mark */}
          <div className="text-center mb-4">
            <span className="font-serif text-[64px] text-[#D4A373] leading-none select-none" style={{ lineHeight: 0.6, opacity: 0.5 }}>&ldquo;</span>
          </div>

          <p className="font-serif text-center text-[clamp(18px,3.5vw,28px)] text-[#FDFCF0] leading-[1.5] tracking-tight">
            The world has a million apps
            <br />
            <em className="text-[#D4A373] not-italic">for everyone.</em>
            <br />
            <span className="opacity-70">We made one</span>
            <br />
            for{' '}<em className="text-[#D4A373] font-bold">the one.</em>
          </p>

          {/* Closing quote + attribution */}
          <div className="text-center mt-6">
            <span className="font-serif text-[64px] text-[#D4A373] leading-none select-none" style={{ lineHeight: 0.6, opacity: 0.5 }}>&rdquo;</span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#7C7267]">Priorities · 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
