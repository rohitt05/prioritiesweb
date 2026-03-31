'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, TrendingUp, Bell, Eye } from 'lucide-react'

const problems = [
  {
    icon: Users,
    stat: '1,000+',
    label: 'followers',
    description: 'But how many do you actually talk to?',
  },
  {
    icon: TrendingUp,
    stat: 'Algorithm',
    label: 'controlled',
    description: 'Your feed is designed for engagement, not connection.',
  },
  {
    icon: Bell,
    stat: '87',
    label: 'notifications',
    description: 'The people you love get buried in the noise.',
  },
  {
    icon: Eye,
    stat: 'Public',
    label: 'performance',
    description: 'Every post is a show. Authenticity dies.',
  },
]

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-rose/80 mb-4 block">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            Social media was built for<br />
            <span className="gradient-text">audiences, not relationships.</span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              className="card-glass rounded-2xl p-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,77,109,0.12)' }}>
                <p.icon size={18} className="text-brand-rose" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold gradient-text">{p.stat}</div>
                <div className="text-sm text-white/40">{p.label}</div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px origin-left"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(199,125,255,0.4), transparent)' }}
        />
      </div>
    </section>
  )
}
