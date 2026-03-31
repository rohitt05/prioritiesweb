'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const priorities = [
  { num: 1, color: '#FAD1D8', name: 'Mehak', note: 'Mine 💬', active: true },
  { num: 2, color: '#DBC0E7', name: 'Best Friend', note: '✨' },
  { num: 3, color: '#C9E6EE', name: 'Family', note: '🏠' },
  { num: 4, color: '#A8E6CF', name: 'Close Circle', note: '🌿' },
]

export default function PriorityCarousel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section id="priorities" ref={ref} className="relative py-24 px-6 bg-[#F7F4E9] overflow-hidden">
      {/* Subtle deco bubbles for this section */}
      {['#FFD4B8','#DBC0E7','#C9E6EE'].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-50 pointer-events-none"
          style={{
            width: 120 + i * 40,
            height: 120 + i * 40,
            background: c,
            top: i === 0 ? '-5%' : i === 1 ? '60%' : '20%',
            right: i === 0 ? '-3%' : i === 1 ? '-5%' : undefined,
            left: i === 2 ? '-3%' : undefined,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ delay: i * 0.4, duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="label-tag block mb-3">My Priorities</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2720] leading-tight">
            The people at the
            <br />
            <span className="italic squiggle">top of your list.</span>
          </h2>
          <p className="mt-4 text-[#7C7267] max-w-md leading-relaxed">
            Pin the people who matter most. They always appear first —
            numbered, ranked, always within reach.
          </p>
        </motion.div>

        {/* Horizontal scrollable priority bubbles — exactly like the app */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-10"
        >
          <div className="scroll-x flex gap-4 pb-2">
            {priorities.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                {/* Bubble */}
                <div className="relative">
                  <motion.div
                    className="priority-bubble"
                    style={{
                      width: active === i ? 88 : 74,
                      height: active === i ? 88 : 74,
                      background: p.color,
                      borderWidth: active === i ? 3 : 2,
                      borderColor: active === i ? '#433D35' : 'white',
                    }}
                    animate={{ scale: active === i ? 1 : 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Number badge */}
                  <div
                    className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#FDFCF0] border border-[rgba(67,61,53,0.15)] flex items-center justify-center text-xs font-bold text-[#433D35]"
                  >
                    {p.num}
                  </div>
                </div>
                <span className="text-xs font-medium text-[#7C7267]">{p.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Active priority detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="card-paper p-6 max-w-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-2xl"
                style={{ background: priorities[active].color }}
              />
              <div>
                <div className="font-semibold text-[#2C2720]">{priorities[active].name}</div>
                <div className="text-sm text-[#7C7267] mt-0.5">Priority #{priorities[active].num}</div>
              </div>
              {priorities[active].active && (
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
                </div>
              )}
            </div>
            {priorities[active].note && (
              <div className="mt-4 px-4 py-3 bg-[#F7F4E9] rounded-2xl">
                <span className="text-sm text-[#7C7267] italic">{priorities[active].note}</span>
              </div>
            )}
            <div className="mt-4 flex gap-3">
              <div className="flex-1 h-10 rounded-2xl bg-[#F7F4E9] flex items-center justify-center gap-2 text-sm text-[#7C7267]">
                🎬 Video call
              </div>
              <div className="flex-1 h-10 rounded-2xl bg-[#F7F4E9] flex items-center justify-center gap-2 text-sm text-[#7C7267]">
                📞 Voice call
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
