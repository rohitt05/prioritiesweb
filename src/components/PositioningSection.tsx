'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function PositioningSection() {
  const ref = useRef(null)
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
              top: i === 0 ? '-15%' : i === 1 ? '50%' : '20%',
              left: i === 0 ? '-8%' : undefined,
              right: i !== 0 ? '-8%' : undefined,
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

        {/* ── Manifesto card ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/[0.09] px-6 sm:px-12 py-10 sm:py-14"
        >
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