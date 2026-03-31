'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

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
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" ref={ref} className="relative z-10 py-32 px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(199,125,255,0.08), transparent)',
        }}
      />

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-glass border border-brand-mauve/20 mb-8"
        >
          <Sparkles size={14} className="text-brand-mauve" />
          <span className="text-sm text-white/60">Limited early access spots</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl font-display font-bold mb-6"
        >
          Be first in line.
          <br />
          <span className="gradient-text">Be first to connect.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-white/50 text-lg mb-10 leading-relaxed"
        >
          Join thousands already on the waitlist.
          Get early access when we launch — and shape what Priorities becomes.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 rounded-2xl card-glass border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-brand-mauve/40 transition-colors bg-transparent"
              />
              <motion.button
                type="submit"
                className="btn-primary flex items-center gap-2 justify-center min-w-[160px]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle2 size={48} className="text-brand-rose" />
              </motion.div>
              <h3 className="text-2xl font-display font-bold">You're on the list! 💜</h3>
              <p className="text-white/50">We'll reach out when it's your turn. Stay close.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xs text-white/30"
        >
          No spam. No noise. Just Priorities.
        </motion.p>
      </div>
    </section>
  )
}
