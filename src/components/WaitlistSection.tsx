'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export default function WaitlistSection() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [mounted, setMounted]  = useState(false)
  const [email, setEmail]      = useState('')
  const [submitted, setSubmit] = useState(false)
  const [loading, setLoading]  = useState(false)
  const [error, setError]      = useState('')

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      await res.json()
      if (!res.ok) throw new Error('failed')
      setSubmit(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="waitlist"
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36 px-5 sm:px-8 bg-[#F7F4E9] overflow-hidden"
    >
      {['#FAD1D8','#DBC0E7','#C9E6EE','#A8E6CF','#FFD4B8'].map((c, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none hidden sm:block"
          style={{
            width: 100 + i * 60, height: 100 + i * 60,
            background: c, opacity: 0.3,
            top:   i % 2 === 0 ? '-12%' : '55%',
            left:  i < 2 ? `-${4+i*2}%` : undefined,
            right: i >= 2 ? `-${2+i*2}%` : undefined,
          }}
          animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
          transition={{ delay: i * 0.5, duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-lg mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(67,61,53,0.1)] shadow-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          <span className="text-[11px] sm:text-[12px] text-[#7C7267]">Limited early access spots</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(34px,8vw,80px)] font-bold text-[#2C2720] leading-[0.9] tracking-tight mb-5"
        >
          Be first in line.
          <br />
          <em className="squiggle">Be first to connect.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[14px] sm:text-[15px] text-[#7C7267] mb-8 leading-relaxed px-2"
        >
          Join thousands already waiting. Get early access at launch
          and help shape what Priorities becomes.
        </motion.p>

        {/* Form area — only rendered client-side to avoid hydration mismatch */}
        <div suppressHydrationWarning>
          {mounted && (
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-col gap-3 w-full"
                >
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 sm:px-5 py-4 rounded-2xl bg-white border border-[rgba(67,61,53,0.12)] text-[#2C2720] placeholder-[#A89F8D] text-[14px] outline-none focus:border-[#D4A373] transition-colors shadow-sm min-w-0"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-ink justify-center py-4 px-6 text-[14px] whitespace-nowrap"
                      style={{ transition: 'transform 0.15s ease, background 0.25s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
                      onMouseDown={e  => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
                      onMouseUp={e    => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)' }}
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-[#FDFCF0]/40 border-t-[#FDFCF0] animate-spin" />
                      ) : 'Join Waitlist →'}
                    </button>
                  </form>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[12px] text-red-400 text-left px-1"
                    >{error}</motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="card p-8 sm:p-10 flex flex-col items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-5xl"
                  >🫶</motion.div>
                  <h3 className="font-serif italic text-[22px] font-bold text-[#2C2720]">You&apos;re on the list!</h3>
                  <p className="text-[#7C7267] text-[14px]">We&apos;ll reach out when it&apos;s your turn. Stay close.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <p className="mt-5 text-[11px] text-[#A89F8D]">No spam. No noise. Just priorities.</p>
      </div>
    </section>
  )
}
