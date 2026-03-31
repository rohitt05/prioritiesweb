'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const priorities = [
  { num: 1, color: '#FAD1D8', name: 'Jaanu 🌸',      callout: 'Your #1 · Always on top' },
  { num: 2, color: '#DBC0E7', name: 'Best Friend',    callout: 'Priority #2 · Pinned' },
  { num: 3, color: '#C9E6EE', name: 'Family',         callout: 'Priority #3 · Pinned' },
  { num: 4, color: '#A8E6CF', name: 'Close Circle',   callout: 'Priority #4' },
]

export default function PriorityCarousel() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="priorities" ref={ref} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#F7F4E9] overflow-hidden">
      {['#FFD4B8', '#DBC0E7', '#C9E6EE'].map((c, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none opacity-40"
          style={{
            width: 140 + i * 60, height: 140 + i * 60,
            background: c,
            top:   i === 0 ? '-8%' : i === 1 ? '55%' : '25%',
            right: i < 2 ? '-4%' : undefined,
            left:  i === 2 ? '-3%' : undefined,
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{ delay: i * 0.4, duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left text */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 60, rotate: 1.5 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-tag block mb-4">My Priorities</span>
            <h2 className="font-serif text-[clamp(34px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight mb-5">
              The people at the
              <br />
              <em className="squiggle">top of your list.</em>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#7C7267] leading-relaxed max-w-sm">
              Pin the people who matter most.
              They always appear first — numbered, ranked, always within reach.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="card mt-7 p-4 sm:p-5"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                    style={{ background: priorities[active].color }} />
                  <div className="min-w-0">
                    <div className="font-semibold text-[#2C2720] text-[14px] sm:text-[15px]">{priorities[active].name}</div>
                    <div className="text-[11px] sm:text-[12px] text-[#7C7267]">{priorities[active].callout}</div>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#D4A373] animate-pulse flex-shrink-0" />
                </div>
                <div className="flex gap-2 mt-3 sm:mt-4">
                  {['🎬 Video', '📞 Voice', '🎙️ Note'].map(btn => (
                    <div key={btn} className="flex-1 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F7F4E9] text-[10px] sm:text-[11px] font-medium text-[#7C7267] flex items-center justify-center text-center">{btn}</div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right bubbles + phone */}
          <div className="flex-1 w-full">
            <motion.div className="flex gap-4 sm:gap-6 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {priorities.map((p, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.7, type: 'spring', stiffness: 180, damping: 14 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <div className="relative">
                    <motion.div
                      className="rounded-full border-2 border-white cursor-pointer"
                      style={{
                        width:  active === i ? 80 : 64,
                        height: active === i ? 80 : 64,
                        background: p.color,
                        borderColor: active === i ? '#433D35' : '#fff',
                        borderWidth: active === i ? 3 : 2,
                        boxShadow: '0 6px 20px rgba(67,61,53,0.12)',
                      }}
                      animate={{ scale: active === i ? 1 : 0.93 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FDFCF0] border border-[rgba(67,61,53,0.12)] text-[10px] sm:text-[11px] font-bold text-[#433D35] flex items-center justify-center shadow-sm">
                      {p.num}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#7C7267] whitespace-nowrap">{p.name}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Phone card */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 18, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="card p-4 sm:p-5 max-w-[280px] sm:max-w-xs"
              style={{ transformStyle: 'preserve-3d', perspective: '900px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif italic text-[16px] sm:text-[18px] font-bold text-[#433D35]">priorities</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAD1D8] border-2 border-white shadow-sm" />
              </div>
              <div className="flex gap-1 mb-4 sm:mb-5 bg-[#F7F4E9] rounded-full p-1">
                {['home', 'timeline'].map((t, ti) => (
                  <div key={t} className={`flex-1 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium text-center ${
                    ti === 0 ? 'bg-white text-[#433D35] shadow-sm' : 'text-[#A89F8D]'
                  }`}>{t}</div>
                ))}
              </div>
              <div className="text-center mb-4">
                <span className="font-serif italic text-[22px] sm:text-[28px] font-bold text-[#2C2720]">
                  {priorities[active].name}
                </span>
              </div>
              <div className="flex justify-center mb-4">
                <motion.div
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
                  style={{ background: priorities[active].color }}
                  animate={{ scale: [1, 1.04, 1], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="flex justify-center gap-3">
                {['🎬', '📞'].map(icon => (
                  <div key={icon} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#F7F4E9] flex items-center justify-center text-base sm:text-lg">{icon}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
