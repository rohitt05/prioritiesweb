'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const timelineItems = [
  {
    date: 'Mar 30',
    title: 'Gateway trip 🚢',
    desc: 'Shared 2 films from the boat',
    color: '#C9E6EE',
    emoji: '⛵',
  },
  {
    date: 'Mar 29',
    title: 'Sunset at Marine Drive 🌅',
    desc: '9 films shared — videos, sunsets, and late-night moments',
    color: '#FFD4B8',
    emoji: '🌇',
  },
  {
    date: 'Mar 28',
    title: 'Quiet Sunday morning ☀️',
    desc: 'Audio note + 3 photos from the balcony',
    color: '#A8E6CF',
    emoji: '🌿',
  },
  {
    date: 'Mar 27',
    title: 'Late-night voice call 🌙',
    desc: 'Called for 2 hours. Shared a photo of the sky.',
    color: '#DBC0E7',
    emoji: '🌙',
  },
]

export default function TimelineSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" ref={ref} className="relative py-24 px-6 bg-[#FDFCF0]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="label-tag block mb-3">Timeline</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2720] leading-tight">
            Every moment,
            <br />
            <span className="italic squiggle">remembered.</span>
          </h2>
          <p className="mt-4 text-[#7C7267] max-w-md leading-relaxed">
            Your shared history — organized, beautiful, and always there
            to scroll back through.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Animated vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[rgba(67,61,53,0.08)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D4A373]"
              style={{ height: lineHeight }}
            />
          </div>

          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              className="relative mb-10"
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Dot on the line */}
              <motion.div
                className="absolute -left-8 top-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="timeline-dot" />
              </motion.div>

              {/* Card */}
              <motion.div
                className="card-paper p-5 cursor-default group"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: item.color }}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-semibold tracking-widest uppercase text-[#A89F8D] mb-1">{item.date}</div>
                    <div className="font-semibold text-[#2C2720] text-base mb-1">{item.title}</div>
                    <div className="text-sm text-[#7C7267] leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
