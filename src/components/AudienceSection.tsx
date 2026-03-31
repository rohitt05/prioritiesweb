'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  { emoji:'💑', title:'Couples',        sub:'Especially long-distance', color:'#FAD1D8', desc:'Share your day, your voice, your moments — without the noise of social media.' },
  { emoji:'✨', title:'Best Friends',   sub:'Your ride-or-dies',        color:'#DBC0E7', desc:'A private space just for you two. The friendship that matters most.' },
  { emoji:'🏠', title:'Trusted Circles',sub:'Close-knit groups',        color:'#C9E6EE', desc:'For small groups who want something more intentional than a group chat.' },
]

export default function AudienceSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-28 px-6 bg-[#FDFCF0] overflow-hidden">
      {/* Giant ghost text — fades in slowly */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <span className="font-serif italic font-bold text-[clamp(80px,20vw,240px)] text-[rgba(67,61,53,0.04)] whitespace-nowrap leading-none">
          priorities
        </span>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header — each word reveals with a mask */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="label-tag block mb-4">Built for</span>
          <h2 className="font-serif text-[clamp(38px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Real connections.
            <br />
            <em className="squiggle">Real people.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              className="card p-8 flex flex-col gap-4"
              // Each card fans in from slightly different angles
              initial={{ opacity: 0, y: 60, rotate: i === 0 ? -3 : i === 1 ? 0 : 3, scale: 0.93 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.03, rotate: i === 0 ? -1 : i === 2 ? 1 : 0, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl"
                style={{ background: c.color }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ delay: i * 0.8, duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                {c.emoji}
              </motion.div>
              <div>
                <div className="font-serif italic font-bold text-[22px] text-[#2C2720]">{c.title}</div>
                <div className="text-[12px] text-[#A89F8D] mt-0.5 label-tag">{c.sub}</div>
              </div>
              <p className="text-[14px] text-[#7C7267] leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
