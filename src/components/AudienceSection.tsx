'use client'
import { useRef, useEffect, useRef as useAnimRef } from 'react'
import { motion, useInView, useAnimationFrame } from 'framer-motion'

const CENTER = { emoji: '🫵', label: 'You', color: '#FDFCF0', ring: true }

const RING1 = [
  { emoji: '💑', label: 'Jaanu', color: '#FAD1D8', angle: 270, dist: 108, size: 64 },
]

const RING2 = [
  { emoji: '👯', label: 'Bestie', color: '#DBC0E7', angle: 40, dist: 170, size: 54 },
  { emoji: '🤝', label: 'BFF',    color: '#C9E6EE', angle: 140, dist: 165, size: 50 },
]

const RING3 = [
  { emoji: '🏠', label: 'Fam',      color: '#D4E6D0', angle: 200, dist: 220, size: 44 },
  { emoji: '🎮', label: 'Homie',    color: '#F0E6C8', angle: 310, dist: 215, size: 40 },
  { emoji: '☕', label: 'Colleague', color: '#E8D5C4', angle: 70,  dist: 218, size: 38 },
]

const FADED = [
  { angle: 15,  dist: 270, size: 30, opacity: 0.18 },
  { angle: 100, dist: 260, size: 26, opacity: 0.12 },
  { angle: 175, dist: 275, size: 28, opacity: 0.15 },
  { angle: 245, dist: 265, size: 24, opacity: 0.10 },
  { angle: 330, dist: 272, size: 26, opacity: 0.13 },
  { angle: 55,  dist: 290, size: 22, opacity: 0.09 },
  { angle: 155, dist: 285, size: 20, opacity: 0.08 },
]

function toXY(angleDeg: number, dist: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: Math.cos(rad) * dist, y: Math.sin(rad) * dist }
}

export default function AudienceSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#FDFCF0] overflow-hidden">
      {/* Ghost text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4 }}
      >
        <span className="font-serif italic font-bold text-[clamp(70px,18vw,220px)] text-[rgba(67,61,53,0.04)] whitespace-nowrap leading-none">
          priorities
        </span>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="label-tag block mb-4">Built for</span>
          <h2 className="font-serif text-[clamp(34px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Real connections.
            <br />
            <em className="squiggle">Real people.</em>
          </h2>
        </motion.div>

        {/* Orbital constellation */}
        <motion.div
          className="relative mx-auto flex items-center justify-center"
          style={{ width: 620, height: 620, maxWidth: '100%' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Orbit rings (decorative) */}
          {[108, 168, 220].map((r, i) => (
            <div key={i} className="absolute rounded-full border border-dashed"
              style={{
                width: r * 2,
                height: r * 2,
                borderColor: `rgba(44,39,32,${0.06 - i * 0.015})`,
              }}
            />
          ))}

          {/* Faded crowd */}
          {FADED.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            return (
              <motion.div key={i}
                className="absolute rounded-full bg-[#C4B9A8]"
                style={{
                  width: a.size, height: a.size,
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                  opacity: a.opacity,
                  filter: 'blur(2px)',
                }}
                animate={{ opacity: [a.opacity, a.opacity * 1.6, a.opacity], scale: [1, 1.05, 1] }}
                transition={{ delay: i * 0.4, duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
              />
            )
          })}

          {/* Ring 3 */}
          {RING3.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            return (
              <motion.div key={i}
                className="absolute flex flex-col items-center gap-1"
                style={{
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 0.5, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.7 }}
              >
                <motion.div
                  className="rounded-full flex items-center justify-center text-sm shadow-sm"
                  style={{ width: a.size, height: a.size, background: a.color, border: '1.5px solid rgba(44,39,32,0.08)' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ delay: i * 1.1, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {a.emoji}
                </motion.div>
                <span className="text-[9px] text-[#A89F8D] font-medium tracking-wide" style={{ marginTop: 2 }}>{a.label}</span>
              </motion.div>
            )
          })}

          {/* Ring 2 */}
          {RING2.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            return (
              <motion.div key={i}
                className="absolute flex flex-col items-center gap-1"
                style={{
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 0.75, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
              >
                <motion.div
                  className="rounded-full flex items-center justify-center text-base shadow"
                  style={{ width: a.size, height: a.size, background: a.color, border: '2px solid rgba(44,39,32,0.1)' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ delay: i * 1.4, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {a.emoji}
                </motion.div>
                <span className="text-[10px] text-[#7C7267] font-medium tracking-wide" style={{ marginTop: 2 }}>{a.label}</span>
              </motion.div>
            )
          })}

          {/* Ring 1 — Jaanu */}
          {RING1.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            return (
              <motion.div key={i}
                className="absolute flex flex-col items-center gap-1"
                style={{
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.9 }}
              >
                {/* glow ring */}
                <motion.div className="absolute rounded-full"
                  style={{ width: a.size + 20, height: a.size + 20, top: -10, left: -10, background: '#FAD1D8', opacity: 0.35, filter: 'blur(8px)' }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="relative rounded-full flex items-center justify-center text-2xl shadow-lg"
                  style={{ width: a.size, height: a.size, background: a.color, border: '2.5px solid #FAD1D8' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {a.emoji}
                </motion.div>
                <span className="text-[11px] font-semibold text-[#2C2720] tracking-wide" style={{ marginTop: 4 }}>{a.label}</span>
              </motion.div>
            )
          })}

          {/* Center — You */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: 'calc(50% - 44px)', top: 'calc(50% - 44px)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* double glow */}
            <motion.div className="absolute rounded-full"
              style={{ width: 120, height: 120, top: -16, left: -16, background: 'radial-gradient(circle, #D4A373 0%, transparent 70%)', opacity: 0.18 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative rounded-full flex items-center justify-center text-3xl shadow-xl"
              style={{ width: 88, height: 88, background: '#FDFCF0', border: '3px solid #D4A373' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              🫵
            </motion.div>
            <span className="text-[12px] font-semibold text-[#2C2720] mt-2 tracking-wide">You</span>
          </motion.div>

          {/* Caption */}
          <motion.p
            className="absolute bottom-0 left-0 right-0 text-center text-[12px] text-[#A89F8D] italic"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Your world — exactly the people who matter.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
