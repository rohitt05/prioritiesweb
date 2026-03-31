'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const contrasts = [
  {
    them: 'Built for everyone',
    us:   'Built for someone specific',
    color: '#FAD1D8',
  },
  {
    them: 'More followers, more reach',
    us:   'Fewer people, deeper presence',
    color: '#DBC0E7',
  },
  {
    them: 'Algorithm decides what you see',
    us:   'You decide who is in your world',
    color: '#C9E6EE',
  },
  {
    them: 'Public performance',
    us:   'Private honesty',
    color: '#A8E6CF',
  },
  {
    them: 'Scroll forever',
    us:   'Stay with what matters',
    color: '#E9DFB4',
  },
]

export default function PositioningSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#2C2720] overflow-hidden">
      {/* Parallax warm tone orbs */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {['#FAD1D8', '#DBC0E7', '#D4A373'].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 120,
              height: 300 + i * 120,
              background: c,
              opacity: 0.06,
              top:   i === 0 ? '-20%' : i === 1 ? '40%' : '60%',
              left:  i === 0 ? '-10%' : undefined,
              right: i !== 0 ? '-10%' : undefined,
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ delay: i * 0.6, duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#A89F8D] block mb-4">A different kind of app</span>
          <h2 className="font-serif text-[clamp(38px,6vw,80px)] font-bold text-[#FDFCF0] leading-[0.9] tracking-tight">
            The world has apps
            <br />
            <em className="text-[#D4A373]">for the crowd.</em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-[17px] text-[#A89F8D] max-w-md mx-auto leading-relaxed"
          >
            We&apos;re not here to replace them.
            You can keep all of that.
            Priorities is for the ones who already have your heart —
            the private, the real, the less-is-more.
          </motion.p>
        </motion.div>

        {/* Contrast rows */}
        <div className="flex flex-col gap-4">
          {contrasts.map((row, i) => (
            <motion.div
              key={i}
              className="flex items-stretch gap-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* "The world" side */}
              <div className="flex-1 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center">
                <span className="text-[14px] text-white/30 line-through">{row.them}</span>
              </div>

              {/* Arrow */}
              <motion.div
                className="w-8 flex items-center justify-center flex-shrink-0"
                animate={{ x: [0, 4, 0] }}
                transition={{ delay: i * 0.2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[#D4A373] text-lg">→</span>
              </motion.div>

              {/* Priorities side */}
              <motion.div
                className="flex-1 px-5 py-4 rounded-2xl flex items-center"
                style={{ background: row.color + '22', border: `1px solid ${row.color}44` }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <span className="text-[14px] font-semibold text-[#FDFCF0]">{row.us}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom manifesto line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <p className="font-serif italic text-[clamp(22px,4vw,42px)] text-[#FDFCF0]/80 leading-snug max-w-2xl mx-auto">
            &ldquo;You already have apps for the world.
            <br />
            <span className="text-[#D4A373]">Priorities is for the ones who are your world.</span>&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
