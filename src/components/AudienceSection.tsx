'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const audiences = [
  {
    emoji: '💑',
    title: 'Couples',
    subtitle: 'Especially long-distance',
    description: 'A shared world that bridges the gap. Share your day, your voice, your thoughts — without the noise of social media.',
    gradient: 'from-brand-rose/20 to-transparent',
  },
  {
    emoji: '✨',
    title: 'Best Friends',
    subtitle: 'Your ride-or-dies',
    description: 'A private space just for you two. No group chats, no drama — just the friendship that matters most.',
    gradient: 'from-brand-mauve/20 to-transparent',
  },
  {
    emoji: '🏠',
    title: 'Trusted Circles',
    subtitle: 'Close-knit groups',
    description: 'For small groups who want something more intentional than a group chat. Shared memories, shared moments.',
    gradient: 'from-brand-purple/20 to-transparent',
  },
]

export default function AudienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="for-who" ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-pink/80 mb-4 block">For Who</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Built for real
            <br />
            <span className="gradient-text">connections.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={i}
              className={`card-glass rounded-3xl p-8 bg-gradient-to-b ${a.gradient} relative overflow-hidden group`}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
            >
              <motion.div
                className="text-5xl mb-5"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ delay: i, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {a.emoji}
              </motion.div>
              <h3 className="text-xl font-display font-bold mb-1">{a.title}</h3>
              <div className="text-sm text-white/40 mb-4">{a.subtitle}</div>
              <p className="text-sm text-white/60 leading-relaxed">{a.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
