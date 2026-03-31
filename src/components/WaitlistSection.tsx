'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export default function WaitlistSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" ref={ref} className="relative py-32 px-6 bg-[#FDFCF0] overflow-hidden">
      {/* Big bubble deco */}
      {['#FAD1D8','#DBC0E7','#C9E6EE','#A8E6CF'].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-40 pointer-events-none"
          style={{
            width: 180 + i * 60,
            height: 180 + i * 60,
            background: c,
            top: i % 2 === 0 ? '-10%' : '60%',
            left: i < 2 ? '-5%' : undefined,
            right: i >= 2 ? '-5%' : undefined,
          }}
          animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
          transition={{ delay: i * 0.5, duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F4E9] border border-[rgba(67,61,53,0.1)] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          <span className="text-xs text-[#7C7267]">Limited early access</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif font-bold text-[#2C2720] mb-5 leading-tight"
        >
          Be first in line.
          <br />
          <span className="italic squiggle">Be first to connect.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[#7C7267] mb-10 leading-relaxed"
        >
          Join the waitlist and get early access when we launch.
          Help shape what Priorities becomes.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 rounded-2xl bg-[#F7F4E9] border border-[rgba(67,61,53,0.12)] text-[#2C2720] placeholder-[#A89F8D] text-sm outline-none focus:border-[#D4A373] transition-colors"
              />
              <motion.button
                type="submit"
                className="btn-ink flex items-center gap-2 justify-center min-w-[160px]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-[#FDFCF0]/40 border-t-[#FDFCF0]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                ) : 'Join Waitlist →'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="card-paper p-8 flex flex-col items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-5xl"
              >
                🩷
              </motion.div>
              <h3 className="text-2xl font-serif font-bold text-[#2C2720]">You&apos;re on the list!</h3>
              <p className="text-[#7C7267] text-sm">We&apos;ll reach out when it&apos;s your turn. Stay close.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-[#A89F8D]"
        >
          No spam. No noise. Just priorities.
        </motion.p>
      </div>
    </section>
  )
}
