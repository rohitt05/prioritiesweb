'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const filmDays = [
  {
    date: '30 mar', side: 'left',
    films: [
      { c: '#C9E6EE', isVideo: true }, { c: '#DDB892' },
    ],
  },
  {
    date: '29 mar', side: 'right',
    films: [
      { c: '#FAD1D8' }, { c: '#B8C88D' }, { c: '#DBC0E7' },
      { c: '#E9DFB4', isVideo: true }, { c: '#C9E6EE' }, { c: '#FFD4B8' },
      { c: '#A8E6CF' },
    ],
  },
  {
    date: '28 mar', side: 'left',
    films: [
      { c: '#FEC8D8' }, { c: '#C0AEDE', isVideo: true }, { c: '#B6E3F4' },
    ],
  },
]

export default function FilmsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section id="films" ref={ref} className="relative py-28 px-6 bg-[#FDFCF0]">
      <div className="max-w-4xl mx-auto">

        {/* Header — slide in from left with clip */}
        <div className="overflow-hidden mb-20">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-tag block mb-4">Films of My Day</span>
            <h2 className="font-serif text-[clamp(40px,7vw,80px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
              Your days,
              <br />
              <em className="squiggle">beautifully archived.</em>
            </h2>
            <p className="mt-6 text-[16px] text-[#7C7267] max-w-sm leading-relaxed">
              Every photo and video becomes a film — day by day,
              visible only to those you choose.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[rgba(67,61,53,0.08)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D4A373] origin-top"
              style={{ scaleY: lineScale, height: '100%' }}
            />
          </div>

          {filmDays.map((day, di) => (
            <motion.div
              key={di}
              className={`relative flex items-center gap-6 mb-14 ${
                day.side === 'right' ? 'flex-row-reverse' : ''
              }`}
              // Alternating: left slides from left, right slides from right
              initial={{ opacity: 0, x: day.side === 'left' ? -60 : 60, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.2 + di * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Grid */}
              <div className="flex-1">
                <div className={`grid grid-cols-3 gap-2 max-w-[260px] ${
                  day.side === 'right' ? 'ml-auto' : ''
                }`}>
                  {day.films.slice(0, 6).map((f, fi) => (
                    <motion.div
                      key={fi}
                      className="aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{ background: f.c }}
                      // Each film tile pops in with a spring
                      initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{
                        delay: 0.35 + di * 0.2 + fi * 0.06,
                        duration: 0.55,
                        type: 'spring',
                        stiffness: 200,
                        damping: 16,
                      }}
                      whileHover={{ scale: 1.08, rotate: 2, transition: { duration: 0.2 } }}
                    >
                      {f.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-[#433D35] ml-0.5" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Center dot */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0 z-10">
                <motion.div
                  className="t-dot"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + di * 0.2, type: 'spring', stiffness: 280 }}
                />
                <span className="text-[12px] font-semibold text-[#433D35] whitespace-nowrap">{day.date}</span>
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Films counter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center gap-3 mt-4"
        >
          <span className="label-tag">FILMS</span>
          <span className="w-7 h-7 rounded-full bg-[#433D35] text-[#FDFCF0] text-[11px] font-bold flex items-center justify-center">12</span>
        </motion.div>
      </div>
    </section>
  )
}
