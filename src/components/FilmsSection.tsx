'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const filmDays = [
  {
    date: '30 mar',
    label: 'Today',
    films: [
      { c: '#C9E6EE', isVideo: true }, { c: '#DDB892' }, { c: '#FAD1D8' },
    ],
  },
  {
    date: '29 mar',
    label: 'Yesterday',
    films: [
      { c: '#FAD1D8' }, { c: '#B8C88D' }, { c: '#DBC0E7' },
      { c: '#E9DFB4', isVideo: true }, { c: '#C9E6EE' }, { c: '#FFD4B8' },
    ],
  },
  {
    date: '28 mar',
    label: '2 days ago',
    films: [
      { c: '#FEC8D8' }, { c: '#C0AEDE', isVideo: true }, { c: '#B6E3F4' }, { c: '#A8E6CF' },
    ],
  },
  {
    date: '27 mar',
    label: '3 days ago',
    films: [
      { c: '#E9DFB4' }, { c: '#FFD4B8' }, { c: '#DBC0E7' },
    ],
  },
]

// Individual film day row — each has its own scroll progress
function FilmDayRow({ day, index }: { day: typeof filmDays[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 30%'],
  })

  // Scroll-driven: starts below+blurred, rises up and sharpens
  const rawY   = useTransform(scrollYProgress, [0, 1], [80, 0])
  const rawOp  = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const rawBlur= useTransform(scrollYProgress, [0, 0.7], [12, 0])
  const rawSc  = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const rawRot = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -3 : 3, 0])

  const y    = useSpring(rawY,  { stiffness: 60, damping: 18 })
  const sc   = useSpring(rawSc, { stiffness: 60, damping: 18 })
  const blur = useSpring(rawBlur, { stiffness: 50, damping: 15 })
  const blurFilter = useTransform(blur, v => `blur(${v}px)`)

  const isRight = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-4 sm:gap-8 mb-12 sm:mb-16 ${
        isRight ? 'flex-row-reverse' : ''
      }`}
      style={{ y, opacity: rawOp, scale: sc, filter: blurFilter, rotate: rawRot }}
    >
      {/* Film grid */}
      <div className="flex-1">
        <div className={`grid grid-cols-3 gap-2 max-w-[220px] sm:max-w-[280px] ${
          isRight ? 'ml-auto' : ''
        }`}>
          {day.films.map((f, fi) => (
            <motion.div
              key={fi}
              className="aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer"
              style={{ background: f.c }}
              whileHover={{ scale: 1.1, rotate: 2, zIndex: 10, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              {f.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 flex items-center justify-center shadow">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-[#433D35] ml-0.5" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center dot + date */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0 z-10">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-[#D4A373] border-2 border-[#FDFCF0] shadow-[0_0_0_2px_#D4A373]"
          style={{ scale: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
        />
        <div className="text-center">
          <div className="text-[11px] font-bold text-[#433D35]">{day.date}</div>
          <div className="text-[9px] sm:text-[10px] text-[#A89F8D]">{day.label}</div>
        </div>
      </div>

      <div className="flex-1" />
    </motion.div>
  )
}

export default function FilmsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ['start 90%', 'start 20%'],
  })
  const headerY  = useSpring(useTransform(headerScroll, [0, 1], [60, 0]), { stiffness: 55, damping: 18 })
  const headerOp = useTransform(headerScroll, [0, 0.6], [0, 1])

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: lineScroll } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScale = useTransform(lineScroll, [0.05, 0.95], [0, 1])

  return (
    <section id="films" ref={sectionRef} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#FDFCF0]">
      <div className="max-w-4xl mx-auto">

        {/* Header — scroll-driven reveal */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <motion.div style={{ y: headerY, opacity: headerOp }}>
            <span className="label-tag block mb-4">Films of My Day</span>
            <h2 className="font-serif text-[clamp(36px,7vw,80px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
              Your days,
              <br />
              <em className="squiggle">beautifully archived.</em>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[16px] text-[#7C7267] max-w-sm leading-relaxed">
              Every photo and video becomes a film — day by day,
              visible only to those you choose.
            </p>
          </motion.div>
        </div>

        {/* Timeline with scroll-driven row reveals */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[rgba(67,61,53,0.08)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D4A373] origin-top"
              style={{ scaleY: lineScale, height: '100%' }}
            />
          </div>

          {filmDays.map((day, di) => (
            <FilmDayRow key={di} day={day} index={di} />
          ))}
        </div>

        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="label-tag">FILMS</span>
          <span className="w-7 h-7 rounded-full bg-[#433D35] text-[#FDFCF0] text-[11px] font-bold flex items-center justify-center">16</span>
        </motion.div>
      </div>
    </section>
  )
}
