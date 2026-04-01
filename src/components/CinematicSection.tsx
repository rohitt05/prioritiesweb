'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const PRIVACY_PILLS = [
  { icon: '🔒', text: 'No algorithm' },
  { icon: '👁️', text: 'Only your circle sees' },
  { icon: '🚫', text: 'No public feed' },
  { icon: '✨', text: 'No strangers, ever' },
]

export default function CinematicSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax on the background
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['-8%', '8%']),
    { stiffness: 40, damping: 20 }
  )

  // Scroll-driven text reveals
  const textProgress = useScroll({
    target: ref,
    offset: ['start 80%', 'start 15%'],
  })
  const lineOp  = useTransform(textProgress.scrollYProgress, [0, 0.4], [0, 1])
  const lineY   = useSpring(useTransform(textProgress.scrollYProgress, [0, 0.5], [60, 0]), { stiffness: 55, damping: 18 })
  const subOp   = useTransform(textProgress.scrollYProgress, [0.2, 0.7], [0, 1])
  const subY    = useSpring(useTransform(textProgress.scrollYProgress, [0.2, 0.7], [40, 0]), { stiffness: 55, damping: 18 })
  const pillsOp = useTransform(textProgress.scrollYProgress, [0.5, 1], [0, 1])
  const pillsY  = useSpring(useTransform(textProgress.scrollYProgress, [0.5, 1], [30, 0]), { stiffness: 55, damping: 18 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1A1612] py-28 sm:py-40 px-5 sm:px-8"
    >
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Warm vignette glow center */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(212,163,115,0.08) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Decorative film strip lines */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-6 opacity-10 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-full h-4 bg-white rounded-sm" />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-between py-6 opacity-10 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-full h-4 bg-white rounded-sm" />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">

        {/* Label */}
        <motion.div
          style={{ opacity: lineOp, y: lineY }}
          className="mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,163,115,0.25)] text-[11px] tracking-[0.15em] uppercase text-[#D4A373] font-medium">
            <span className="w-1 h-1 rounded-full bg-[#D4A373] animate-pulse" />
            For the ones who matter
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div style={{ opacity: lineOp, y: lineY }}>
          <h2 className="font-serif text-[clamp(52px,12vw,140px)] font-bold leading-[0.85] tracking-tight text-[#F5F0E8] mb-2">
            Life is a
          </h2>
          <h2 className="font-serif text-[clamp(52px,12vw,140px)] font-bold leading-[0.85] tracking-tight italic text-[#D4A373]">
            movie.
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{ opacity: subOp }}
          className="my-8 sm:my-10 flex items-center justify-center gap-4"
        >
          <div className="h-px w-12 sm:w-20 bg-[rgba(212,163,115,0.3)]" />
          <span className="text-[#D4A373] text-lg">✦</span>
          <div className="h-px w-12 sm:w-20 bg-[rgba(212,163,115,0.3)]" />
        </motion.div>

        {/* Subline */}
        <motion.p
          style={{ opacity: subOp, y: subY }}
          className="text-[18px] sm:text-[22px] md:text-[26px] text-[#B8AFA3] leading-relaxed max-w-2xl mx-auto font-light"
        >
          Not every scene needs an audience —
          <br className="hidden sm:block" />
          <em className="text-[#F5F0E8] font-normal"> just the ones who matter.</em>
        </motion.p>

        {/* Privacy micro-copy */}
        <motion.p
          style={{ opacity: subOp, y: subY }}
          className="mt-5 text-[13px] sm:text-[14px] text-[#7A7168] max-w-md mx-auto leading-relaxed"
        >
          Your memories aren't content. They're not for likes, strangers, or algorithms.
          Priorities keeps them exactly where they belong — with the people you chose.
        </motion.p>

        {/* Privacy pills */}
        <motion.div
          style={{ opacity: pillsOp, y: pillsY }}
          className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3"
        >
          {PRIVACY_PILLS.map((pill, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[12px] sm:text-[13px] text-[#B8AFA3]"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, borderColor: 'rgba(212,163,115,0.3)', color: '#D4A373' }}
            >
              <span>{pill.icon}</span>
              <span>{pill.text}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
