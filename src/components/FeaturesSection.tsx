'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Pin, Camera, Mic, CalendarDays, Phone, Heart, Zap, Lock
} from 'lucide-react'

const features = [
  {
    icon: Pin,
    color: '#FF4D6D',
    title: 'Priority List',
    description: 'Pin the people that matter. They always appear first — no scrolling, no searching.',
  },
  {
    icon: Camera,
    color: '#C77DFF',
    title: 'Rich Media Sharing',
    description: 'Share photos, videos, and audio notes with full camera controls — flash, zoom, focus.',
  },
  {
    icon: Mic,
    color: '#FF8FA3',
    title: 'Audio Notes',
    description: 'Sometimes a voice says more than words. Record and share audio moments instantly.',
  },
  {
    icon: CalendarDays,
    color: '#7B2FBE',
    title: 'Shared Memories',
    description: 'A timeline of your moments together. Scroll back through what you\'ve built.',
  },
  {
    icon: Phone,
    color: '#FF4D6D',
    title: 'Voice & Video Calls',
    description: 'Stay close no matter the distance. Crystal-clear calls built into the app.',
  },
  {
    icon: Heart,
    color: '#C77DFF',
    title: 'Emoji Reactions',
    description: 'Quick, expressive reactions that feel personal — not just a like button.',
  },
  {
    icon: Zap,
    color: '#FF8FA3',
    title: 'No Algorithm',
    description: 'You decide what you see. Chronological, personal, and always authentic.',
  },
  {
    icon: Lock,
    color: '#7B2FBE',
    title: 'Private by Design',
    description: 'Your circle is yours. No strangers, no public feeds, no data harvesting.',
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="features" ref={containerRef} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-mauve/80 mb-4 block">Features</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Everything you need.
            <br />
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card-glass rounded-2xl p-6 cursor-default group"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -8,
                scale: 1.03,
                borderColor: f.color + '33',
                transition: { duration: 0.25 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: f.color + '18' }}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </motion.div>
              <h3 className="font-semibold text-base mb-2 group-hover:text-white transition-colors">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
