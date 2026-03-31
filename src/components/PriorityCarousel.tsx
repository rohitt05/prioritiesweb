'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const priorities = [
  { num: 1, color: '#FAD1D8', name: 'Your Partner',   callout: 'Your #1 · Always on top' },
  { num: 2, color: '#DBC0E7', name: 'Best Friend',    callout: 'Priority #2 · Pinned' },
  { num: 3, color: '#C9E6EE', name: 'Family',         callout: 'Priority #3 · Pinned' },
  { num: 4, color: '#A8E6CF', name: 'Close Circle',   callout: 'Priority #4' },
]

export default function PriorityCarousel() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="priorities" ref={ref} className="relative py-28 px-6 bg-[#F7F4E9] overflow-hidden">
      {['#FFD4B8', '#DBC0E7', '#C9E6EE'].map((c, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none opacity-40"
          style={{ width: 180 + i * 50, height: 180 + i * 50, background: c,
            top: i === 0 ? '-8%' : i === 1 ? '55%' : '25%',
            right: i < 2 ? '-4%' : undefined, left: i === 2 ? '-3%' : undefined }}
          animate={{ y: [0, -14, 0] }}
          transition={{ delay: i * 0.4, duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left text — sweeps up from bottom with slight rotation */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 60, rotate: 1.5 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-tag block mb-4">My Priorities</span>
            <h2 className="font-serif text-[clamp(38px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight mb-6">
              The people at the
              <br />
              <em className="squiggle">top of your list.</em>
            </h2>
            <p className="text-[15px] text-[#7C7267] leading-relaxed max-w-sm">
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
                className="card mt-8 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    style={{ background: priorities[active].color }} />
                  <div>
                    <div className="font-semibold text-[#2C2720] text-[15px]">{priorities[active].name}</div>
                    <div className="text-[12px] text-[#7C7267]">{priorities[active].callout}</div>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
                </div>
                <div className="flex gap-2 mt-4">
                  {['🎬 Video', '📞 Voice', '🎙️ Note'].map(btn => (
                    <div key={btn} className="flex-1 py-2.5 rounded-2xl bg-[#F7F4E9] text-[11px] font-medium text-[#7C7267] flex items-center justify-center">{btn}</div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right — staggered bubbles cascade in */}
          <div className="flex-1">
            <motion.div className="flex gap-6 mb-8 scroll-x pb-2">
              {priorities.map((p, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2.5 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.12,
                    duration: 0.7,
                    type: 'spring',
                    stiffness: 180,
                    damping: 14,
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <div className="relative">
                    <motion.div
                      className="p-bubble"
                      style={{
                        width: active === i ? 92 : 72,
                        height: active === i ? 92 : 72,
                        background: p.color,
                        borderColor: active === i ? '#433D35' : '#fff',
                        borderWidth: active === i ? 3 : 2,
                      }}
                      animate={{ scale: active === i ? 1 : 0.93 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FDFCF0] border border-[rgba(67,61,53,0.12)] text-[11px] font-bold text-[#433D35] flex items-center justify-center shadow-sm">
                      {p.num}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#7C7267]">{p.name}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Simulated phone card — 3D rotate in from right */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 18, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="card p-5 max-w-xs"
              style={{ transformStyle: 'preserve-3d', perspective: '900px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif italic text-[18px] font-bold text-[#433D35]">priorities</span>
                <div className="w-8 h-8 rounded-full bg-[#FAD1D8] border-2 border-white shadow-sm" />
              </div>
              <div className="flex gap-1 mb-5 bg-[#F7F4E9] rounded-full p-1">
                {['home', 'timeline'].map((t, ti) => (
                  <div key={t} className={`flex-1 py-1.5 rounded-full text-[11px] font-medium text-center ${
                    ti === 0 ? 'bg-white text-[#433D35] shadow-sm' : 'text-[#A89F8D]'
                  }`}>{t}</div>
                ))}
              </div>
              <div className="text-center mb-4">
                <span className="font-serif italic text-[28px] font-bold text-[#2C2720]">
                  {priorities[active].name}
                </span>
              </div>
              <div className="flex justify-center mb-4">
                <motion.div
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  style={{ background: priorities[active].color }}
                  animate={{ scale: [1, 1.04, 1], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="flex justify-center gap-3">
                {['🎬', '📞'].map(icon => (
                  <div key={icon} className="w-11 h-11 rounded-2xl bg-[#F7F4E9] flex items-center justify-center text-lg">{icon}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
