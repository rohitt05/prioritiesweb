'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'

// Custom ease — matches iOS UIKit default spring feel but as a cubic bezier
// (no actual spring physics = no trailing lag on scroll)
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1)

const items = [
  { date: 'Mar 30', title: 'Gateway trip 🚢', desc: '2 films from the boat', color: '#C9E6EE', emoji: '⛵' },
  { date: 'Mar 29', title: 'Sunset at the shore 🌅', desc: '9 films — videos, sunsets, late-night vibes', color: '#FFD4B8', emoji: '🌇' },
  { date: 'Mar 28', title: 'Quiet Sunday ☀️', desc: 'Audio note + 3 photos from the balcony', color: '#A8E6CF', emoji: '🌿' },
  { date: 'Mar 27', title: 'Late-night voice call 🌙', desc: '2 hours. A photo of the sky.', color: '#DBC0E7', emoji: '🌙' },
  { date: 'Mar 26', title: 'Morning film shared 📸', desc: 'A still moment from her window', color: '#E9DFB4', emoji: '☕' },
]

function TimelineCard({ item, index }: { item: typeof items[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // Wider range = more scroll distance to complete the reveal = feels slower + intentional
    offset: ['start 92%', 'start 28%'],
  })

  // All transforms use easing, NOT useSpring.
  // useTransform with easing = positionally exact + feels smooth.
  const y = useTransform(scrollYProgress, [0, 1], [40, 0], { ease: EASE_OUT })
  const op = useTransform(scrollYProgress, [0, 0.45], [0, 1], { ease: EASE_OUT })
  // X alternation: left cards enter from left, right from right
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -28 : 28, 0], { ease: EASE_OUT })
  // Dot: pops in with a tight window
  const dotScale = useTransform(scrollYProgress, [0, 0.35], [0, 1], { ease: EASE_OUT })
  // Card scale: very subtle — just enough to feel "landing"
  const sc = useTransform(scrollYProgress, [0, 0.6], [0.97, 1], { ease: EASE_OUT })

  return (
    <motion.div
      ref={ref}
      className="relative mb-6 sm:mb-8"
      // NO filter: blur here — blur runs on CPU, tanks mobile FPS.
      // opacity + y + scale on GPU via transform: all compositor-only.
      style={{ y, x, opacity: op, scale: sc }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute -left-10 top-4 origin-center"
        style={{ scale: dotScale }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373] border-2 border-[#FDFCF0] shadow-[0_0_0_2px_#D4A373]" />
      </motion.div>

      {/* Card — hover is interaction-driven so useSpring IS correct here */}
      <motion.div
        className="card p-4 sm:p-5 flex items-start gap-3 sm:gap-4 cursor-default"
        whileHover={{
          y: -4,
          scale: 1.012,
          transition: { type: 'spring', stiffness: 340, damping: 28 },
        }}
        whileTap={{
          scale: 0.985,
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        }}
      >
        <motion.div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
          style={{ background: item.color }}
          whileHover={{
            rotate: 8,
            scale: 1.1,
            transition: { type: 'spring', stiffness: 400, damping: 20 },
          }}
        >
          {item.emoji}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="label-tag mb-1">{item.date}</div>
          <div className="font-semibold text-[#2C2720] text-[13px] sm:text-[15px] mb-1">{item.title}</div>
          <div className="text-[12px] sm:text-[13px] text-[#7C7267] leading-snug">{item.desc}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function TimelineSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // ── Timeline line ─────────────────────────────────────────────────────────
  const { scrollYProgress: lineScroll } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineH = useTransform(lineScroll, [0.05, 0.92], ['0%', '100%'], { ease: EASE_OUT })

  // ── Header ────────────────────────────────────────────────────────────────
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ['start 88%', 'start 15%'],
  })
  // Direct useTransform — no useSpring wrapper
  const hY = useTransform(headerScroll, [0, 1], [44, 0], { ease: EASE_OUT })
  const hOp = useTransform(headerScroll, [0, 0.55], [0, 1], { ease: EASE_OUT })
  const hSc = useTransform(headerScroll, [0, 0.8], [0.93, 1], { ease: EASE_OUT })

  return (
    <section id="timeline" ref={sectionRef} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#FDFCF0]">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <motion.div style={{ y: hY, opacity: hOp, scale: hSc }}>
            <span className="label-tag block mb-4">Timeline</span>
            <h2 className="font-serif text-[clamp(34px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
              Every moment,
              <br />
              <em className="squiggle">remembered.</em>
            </h2>
            <p className="mt-5 text-[14px] sm:text-[16px] text-[#7C7267] max-w-sm leading-relaxed">
              Your shared history — organized, beautiful,
              always there to scroll back through together.
            </p>
          </motion.div>
        </div>

        <div className="relative pl-8 sm:pl-10">
          {/* Growing line */}
          <div className="absolute left-2 sm:left-3 top-0 bottom-0 w-px bg-[rgba(67,61,53,0.07)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D4A373]"
              style={{ height: lineH }}
            />
          </div>

          {items.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}