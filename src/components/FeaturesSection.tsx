'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    color: '#FAD1D8',
    emoji: '📌',
    title: 'Priority List',
    description: 'Pin your people. Numbered, ranked, always at the top of your world.',
  },
  {
    color: '#C9E6EE',
    emoji: '🎬',
    title: 'Films',
    description: 'Share photos and videos that become beautiful day-by-day films.',
  },
  {
    color: '#A8E6CF',
    emoji: '🎙️',
    title: 'Audio Notes',
    description: 'Record a voice message. Sometimes your voice says more than words.',
  },
  {
    color: '#DBC0E7',
    emoji: '📅',
    title: 'Timeline',
    description: 'Every moment archived in a shared timeline. Scroll back through your story.',
  },
  {
    color: '#FFD4B8',
    emoji: '📞',
    title: 'Voice & Video',
    description: 'Call the people you love — built right inside the app.',
  },
  {
    color: '#B8C88D',
    emoji: '🔒',
    title: 'Fully Private',
    description: 'No algorithms. No public feed. Your connections, completely yours.',
  },
  {
    color: '#E9DFB4',
    emoji: '🌟',
    title: 'Bubble Map',
    description: 'See your day visualized as beautiful colour bubbles — memories floating.',
  },
  {
    color: '#FEC8D8',
    emoji: '💬',
    title: 'Reactions',
    description: 'Emoji reactions and quick replies that feel warm and personal.',
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="relative py-24 px-6 bg-[#F7F4E9]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="label-tag block mb-3">Features</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2720] leading-tight">
            Everything you need.
            <br />
            <span className="italic squiggle">Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card-paper p-6 cursor-default"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ background: f.color }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {f.emoji}
              </motion.div>
              <h3 className="font-semibold text-[#2C2720] mb-2">{f.title}</h3>
              <p className="text-sm text-[#7C7267] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
