'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Heart, Mic, Camera, Phone } from 'lucide-react'

export default function PhoneMockup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10])
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 15 })
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 15 })

  return (
    <section ref={ref} className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-rose/80 mb-4 block">The Experience</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Designed for
            <br />
            <span className="gradient-text">intimacy.</span>
          </h2>
          <p className="text-white/50 leading-relaxed mb-8 text-lg">
            Every interaction in Priorities is crafted to feel close, warm, and personal.
            From the pinned priority list to the shared memories timeline —
            it's all designed to make distance feel smaller.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: Heart, text: 'Your most important people, always on top' },
              { icon: Camera, text: 'Rich media — photos, video, audio notes' },
              { icon: Phone, text: 'Voice & video calls built in' },
              { icon: Mic, text: 'Audio messages that feel like presence' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 text-sm text-white/60"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,77,109,0.1)' }}>
                  <item.icon size={14} className="text-brand-rose" />
                </div>
                {item.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Phone mockup */}
        <motion.div
          className="flex-1 flex justify-center"
          style={{ perspective: '1000px' }}
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            style={{
              rotateY: springRotateY,
              rotateX: springRotateX,
              y,
              transformStyle: 'preserve-3d',
            }}
            className="relative"
          >
            {/* Phone frame */}
            <div
              className="relative w-[260px] h-[540px] rounded-[44px] overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Status bar */}
              <div className="flex justify-between items-center px-6 pt-4 pb-2">
                <span className="text-xs text-white/40">9:41</span>
                <div className="w-20 h-5 rounded-full" style={{ background: '#1A1A24' }} />
                <span className="text-xs text-white/40">100%</span>
              </div>

              {/* App header */}
              <div className="px-5 pb-3">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-display font-bold">Priorities</span>
                  <Heart size={20} className="text-brand-rose" fill="#FF4D6D" />
                </div>

                {/* Priority contacts */}
                {['You & Her 💜', 'Best Friend ✨', 'Family 🏠'].map((name, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 mb-3 p-2.5 rounded-2xl"
                    style={{ background: i === 0 ? 'rgba(255,77,109,0.12)' : 'rgba(255,255,255,0.04)' }}
                    animate={{ x: [0, 2, 0] }}
                    transition={{ delay: i * 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: i === 0 ? 'linear-gradient(135deg, #FF4D6D, #C77DFF)' : 'rgba(255,255,255,0.08)' }}
                    >
                      {name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">{name}</div>
                      {i === 0 && <div className="text-[10px] text-white/40">Tap to open ↗</div>}
                    </div>
                    {i === 0 && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-brand-rose"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Memory cards */}
              <div className="px-5">
                <div className="text-xs text-white/30 mb-2 uppercase tracking-widest">Recent</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: '📸 Photo', color: 'rgba(255,77,109,0.15)' },
                    { label: '🎙️ Voice', color: 'rgba(199,125,255,0.15)' },
                    { label: '🎞️ Video', color: 'rgba(255,143,163,0.15)' },
                    { label: '💌 Note', color: 'rgba(123,47,190,0.15)' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className="h-16 rounded-2xl flex items-center justify-center text-xs"
                      style={{ background: card.color }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ delay: i * 0.3, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {card.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-6 py-4" style={{ background: 'rgba(13,13,18,0.9)', backdropFilter: 'blur(20px)' }}>
                {[Heart, Camera, Mic, Phone].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-xl"
                    style={{ background: i === 0 ? 'linear-gradient(135deg, #FF4D6D22, #C77DFF22)' : 'transparent' }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <Icon size={16} className={i === 0 ? 'text-brand-rose' : 'text-white/30'} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Glow behind phone */}
            <div
              className="absolute inset-0 rounded-[44px] -z-10 blur-3xl opacity-30"
              style={{ background: 'linear-gradient(135deg, #FF4D6D, #C77DFF)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
