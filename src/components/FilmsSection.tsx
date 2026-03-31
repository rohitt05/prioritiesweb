'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Simulated films data — colored placeholders mimicking real app thumbnails
const filmDays = [
  {
    date: '30 mar',
    films: [
      { color: '#C9E6EE', label: '🎬', isVideo: true },
      { color: '#DDB892', label: '🌅' },
    ],
    side: 'left',
  },
  {
    date: '29 mar',
    films: [
      { color: '#FAD1D8', label: '🏛️' },
      { color: '#B8C88D', label: '🌿' },
      { color: '#DBC0E7', label: '🌇' },
      { color: '#E9DFB4', label: '🎬', isVideo: true },
      { color: '#C9E6EE', label: '🌃' },
      { color: '#FFD4B8', label: '🌺' },
      { color: '#A8E6CF', label: '🌙' },
    ],
    side: 'right',
  },
]

export default function FilmsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="films" ref={ref} className="relative py-24 px-6 bg-[#FDFCF0]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="label-tag block mb-3">Films of My Day</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2720] leading-tight">
            Your days,
            <br />
            <span className="italic squiggle">beautifully archived.</span>
          </h2>
          <p className="mt-4 text-[#7C7267] max-w-md leading-relaxed">
            Every photo and video you share becomes a film —
            organized by day, visible only to those you choose.
          </p>
        </motion.div>

        {/* Timeline view */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[rgba(67,61,53,0.1)]"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
          />

          {filmDays.map((day, di) => (
            <motion.div
              key={di}
              className={`relative flex items-start gap-8 mb-12 ${
                day.side === 'right' ? 'flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: day.side === 'left' ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: di * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Films grid */}
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-2 max-w-[280px] ml-auto">
                  {day.films.slice(0, 6).map((film, fi) => (
                    <motion.div
                      key={fi}
                      className="film-thumb aspect-square flex items-center justify-center text-2xl relative"
                      style={{ background: film.color }}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: di * 0.2 + fi * 0.06 }}
                    >
                      {film.label}
                      {film.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-[#433D35] ml-0.5" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Center dot + date */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 relative z-10">
                <div className="timeline-dot" />
                <span className="text-sm font-medium text-[#433D35] whitespace-nowrap">{day.date}</span>
              </div>

              {/* Spacer for opposite side */}
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>

        {/* FILMS counter badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center gap-3"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#A89F8D]">FILMS</span>
          <span className="w-7 h-7 rounded-full bg-[#433D35] text-[#FDFCF0] text-xs font-bold flex items-center justify-center">12</span>
        </motion.div>
      </div>
    </section>
  )
}
