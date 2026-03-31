'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const items = [
  { date:'Mar 30', title:'Gateway trip 🚢', desc:'2 films from the boat', color:'#C9E6EE', emoji:'⛵' },
  { date:'Mar 29', title:'Sunset at Marine Drive 🌅', desc:'9 films — videos, sunsets, late-night vibes', color:'#FFD4B8', emoji:'🌇' },
  { date:'Mar 28', title:'Quiet Sunday ☀️', desc:'Audio note + 3 photos from the balcony', color:'#A8E6CF', emoji:'🌿' },
  { date:'Mar 27', title:'Late-night voice call 🌙', desc:'2 hours. A photo of the sky.', color:'#DBC0E7', emoji:'🌙' },
  { date:'Mar 26', title:'Quick photo shared 📸', desc:'She sent a film from her morning', color:'#E9DFB4', emoji:'☕' },
]

export default function TimelineSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const lineH = useTransform(scrollYProgress, [0,1], ['0%','100%'])

  return (
    <section id="timeline" ref={ref} className="relative py-28 px-6 bg-[#FDFCF0]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8 }}
          className="mb-20"
        >
          <span className="label-tag block mb-4">Timeline</span>
          <h2 className="font-serif text-[clamp(38px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Every moment,
            <br />
            <em className="squiggle">remembered.</em>
          </h2>
        </motion.div>

        <div className="relative pl-10">
          {/* Line track */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[rgba(67,61,53,0.07)]">
            <motion.div className="absolute top-0 left-0 w-full bg-[#D4A373]" style={{ height: lineH }} />
          </div>

          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative mb-8"
              initial={{ opacity:0, x:-30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ delay:i*0.12, duration:0.75, ease:[0.16,1,0.3,1] }}
            >
              {/* Dot */}
              <motion.div
                className="absolute -left-10 top-3"
                initial={{ scale:0 }}
                animate={inView ? { scale:1 } : {}}
                transition={{ delay:i*0.12+0.2, type:'spring', stiffness:260 }}
              >
                <div className="t-dot" />
              </motion.div>

              {/* Card */}
              <motion.div
                className="card p-5 flex items-start gap-4 group cursor-default"
                whileHover={{ y:-4, scale:1.015, transition:{ duration:0.2 } }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: item.color }}
                  whileHover={{ rotate:8, scale:1.1 }}
                >
                  {item.emoji}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="label-tag mb-1">{item.date}</div>
                  <div className="font-semibold text-[#2C2720] text-[15px] mb-1">{item.title}</div>
                  <div className="text-[13px] text-[#7C7267] leading-snug">{item.desc}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
