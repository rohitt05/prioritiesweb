'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  { emoji: '💑', title: 'Couples',         sub: 'Especially long-distance', color: '#FAD1D8', desc: 'Share your day, your voice, your moments — without the noise of social media.' },
  { emoji: '✨', title: 'Best Friends',    sub: 'Your ride-or-dies',        color: '#DBC0E7', desc: 'A private space just for you two. The friendship that matters most.' },
  { emoji: '🏠', title: 'Trusted Circles', sub: 'Close-knit groups',        color: '#C9E6EE', desc: 'For small groups who want something more intentional than a group chat.' },
]

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              className="card p-6 sm:p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 60, rotate: i === 0 ? -3 : i === 1 ? 0 : 3, scale: 0.93 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.03, rotate: i === 0 ? -1 : i === 2 ? 1 : 0, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl"
                style={{ background: c.color }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ delay: i * 0.8, duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                {c.emoji}
              </motion.div>
              <div>
                <div className="font-serif italic font-bold text-[20px] sm:text-[22px] text-[#2C2720]">{c.title}</div>
                <div className="text-[11px] sm:text-[12px] text-[#A89F8D] mt-0.5 label-tag">{c.sub}</div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#7C7267] leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
