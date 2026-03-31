'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const truths = [
  {
    icon: '🌍',
    label: 'Not for this app',
    line: 'Your followers list',
  },
  {
    icon: '📢',
    label: 'Not for this app',
    line: 'The highlight reel',
  },
  {
    icon: '🔔',
    label: 'Not for this app',
    line: 'Notifications from strangers',
  },
  {
    icon: '🤳',
    label: 'Not for this app',
    line: 'Looking good for the internet',
  },
]

const forLines = [
  { emoji: '🫀', text: 'The 2am text you actually mean' },
  { emoji: '📸', text: 'The photo you only share with one person' },
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
    <section ref={ref} className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[#1C1814] overflow-hidden">
      {/* ambient blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {['#D4A373', '#FAD1D8', '#DBC0E7'].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 260 + i * 140,
              height: 260 + i * 140,
              background: c,
              opacity: 0.055,
              filter: 'blur(70px)',
              top:   i === 0 ? '-15%' : i === 1 ? '50%' : '20%',
              left:  i === 0 ? '-8%' : undefined,
              right: i !== 0 ? '-8%' : undefined,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ delay: i * 0.7, duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* ── Top: NOT for this app ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#7C7267] block mb-5">Let's be honest</span>
          <h2 className="font-serif text-[clamp(34px,6vw,72px)] font-bold text-[#FDFCF0] leading-[0.9] tracking-tight">
            This app is
            <br />
            <em className="text-[#D4A373]">not for everyone.</em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-[15px] sm:text-[17px] text-[#7C7267] max-w-sm mx-auto leading-relaxed"
          >
            And that&apos;s the whole point.
          </motion.p>
        </motion.div>

        {/* "Not for this" pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-20 sm:mb-24">
          {truths.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.08]"
            >
              <span className="text-lg line-through opacity-30">{t.icon}</span>
              <span className="text-[13px] text-white/30 line-through">{t.line}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Divider phrase ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-14 sm:mb-16"
        >
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-serif italic text-[#D4A373] text-[18px] sm:text-[22px] whitespace-nowrap">but it is for this.</span>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

        {/* ── FOR lines ── */}
        <div className="flex flex-col gap-5 mb-20 sm:mb-24">
          {forLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.65 + i * 0.11, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 group"
            >
              <motion.span
                className="text-2xl w-10 flex-shrink-0"
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ delay: i * 1.2, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >{line.emoji}</motion.span>
              <span className="text-[17px] sm:text-[19px] font-serif italic text-[#FDFCF0] leading-snug group-hover:text-[#D4A373] transition-colors duration-300">
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom manifesto ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-2"
        >
          <div className="inline-block bg-white/[0.04] border border-white/[0.08] rounded-3xl px-6 sm:px-10 py-8 sm:py-10">
            <p className="font-serif italic text-[clamp(20px,3.5vw,36px)] text-[#FDFCF0] leading-[1.3]">
              &ldquo;The world has a million apps
              <br />
              <span className="text-[#D4A373]">for everyone.</span>
              <br />
              We made one
              <br />
              for <span className="text-[#D4A373]">the one.</span>&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
              <span className="text-[11px] tracking-[0.16em] uppercase text-[#7C7267]">Priorities · 2026</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
