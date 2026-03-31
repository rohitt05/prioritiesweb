'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const items = [
  { date: 'Mar 30', title: 'Gateway trip 🚢', desc: '2 films from the boat', color: '#C9E6EE', emoji: '⛵' },
  { date: 'Mar 29', title: 'Sunset at the shore 🌅', desc: '9 films — videos, sunsets, late-night vibes', color: '#FFD4B8', emoji: '🌇' },
  { date: 'Mar 28', title: 'Quiet Sunday ☀️', desc: 'Audio note + 3 photos from the balcony', color: '#A8E6CF', emoji: '🌿' },
  { date: 'Mar 27', title: 'Late-night voice call 🌙', desc: '2 hours. A photo of the sky.', color: '#DBC0E7', emoji: '🌙' },
  { date: 'Mar 26', title: 'Morning film shared 📸', desc: 'A still moment from her window', color: '#E9DFB4', emoji: '☕' },
]

export default function TimelineSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineH  = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%'])

  return (
    <section id="timeline" ref={ref} className="relative py-28 px-6 bg-[#FDFCF0]">
      <div className="max-w-3xl mx-auto">
        {/* Header — zoom + fade in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="label-tag block mb-4">Timeline</span>
          <h2 className="font-serif text-[clamp(38px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Every moment,
            <br />
            <em className="squiggle">remembered.</em>
          </h2>
          <p className="mt-6 text-[16px] text-[#7C7267] max-w-sm leading-relaxed">
            Your shared history — organized, beautiful, always
            there to scroll back through together.
          </p>
        </motion.div>

        <div className="relative pl-10">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[rgba(67,61,53,0.07)]">
            <motion.div className="absolute top-0 left-0 w-full bg-[#D4A373]" style={{ height: lineH }} />
          </div>

          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative mb-8"
              // Alternating left/right stagger
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, filter: 'blur(3px)' }}
              animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: i * 0.13, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute -left-10 top-3"
                initial={{ scale: 0, rotate: -45 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: i * 0.13 + 0.18, type: 'spring', stiffness: 280 }}
              >
                <div className="t-dot" />
              </motion.div>

              <motion.div
                className="card p-5 flex items-start gap-4 cursor-default"
                whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: item.color }}
                  whileHover={{ rotate: 10, scale: 1.12, transition: { duration: 0.2 } }}
                >
                  {item.emoji}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="label-tag mb-1">{item.date}</div>
                  <div className="font-semibold text-[#2C2720] text-[15px] mb-1">{item.title}</div>
                  <div className="text-[13px] text-[#7C7267] leading-snug">{item.desc}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
