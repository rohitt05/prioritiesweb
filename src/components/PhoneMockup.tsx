'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Mic, Camera, Phone, MoreHorizontal } from 'lucide-react'

const homeContacts = [
  { name: 'Jaanu', sub: 'Priority #1', emoji: '💑', active: true, color: '#FAD1D8' },
  { name: 'Aryan', sub: 'Priority #2', emoji: '✨', active: false, color: '#DBC0E7' },
  { name: 'Close Circle', sub: 'Priority #4', emoji: '🏠', active: false, color: '#C9E6EE' },
]

const timelinePosts = [
  { size: 'large', bg: 'linear-gradient(160deg,#DBC0E7,#C9E6EE)', emoji: '🌸', label: 'Jaanu' },
  { size: 'small', bg: 'linear-gradient(160deg,#FAD1D8,#F0E6C8)', emoji: '🌿', label: 'Aryan' },
  { size: 'small', bg: 'linear-gradient(160deg,#C9E6EE,#D4E6D0)', emoji: '☁️', label: 'Bestie' },
]

export default function PhoneMockup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10])
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 15 })
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 15 })
  const [activeTab, setActiveTab] = useState<'home' | 'timeline'>('home')

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
            it&apos;s all designed to make distance feel smaller.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: Heart,  text: 'Your most important people, always on top' },
              { icon: Camera, text: 'Rich media — photos, video, audio notes' },
              { icon: Phone,  text: 'Voice & video calls built in' },
              { icon: Mic,    text: 'Audio messages that feel like presence' },
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
              className="relative w-[260px] h-[560px] rounded-[44px] overflow-hidden"
              style={{
                background: '#F4F1EA',
                border: '1px solid rgba(44,39,32,0.12)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              {/* Status bar */}
              <div className="flex justify-between items-center px-5 pt-4 pb-1">
                <span className="text-[10px] text-[#5C5347] font-medium">11:01</span>
                <div className="w-14 h-4 rounded-full bg-[#E8E4DB]" />
                <span className="text-[10px] text-[#5C5347] font-medium">●●●</span>
              </div>

              {/* App header */}
              <div className="flex items-center justify-between px-5 pt-2 pb-3">
                <span className="font-serif italic font-bold text-[18px] text-[#2C2720] tracking-tight">priorities</span>
                <div className="w-7 h-7 rounded-full bg-[#E8E4DB] flex items-center justify-center">
                  <span className="text-[10px]">👤</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center px-5 mb-4 gap-1">
                {(['home', 'timeline'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative flex-1 py-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200"
                    style={{ color: activeTab === tab ? '#2C2720' : '#A89F8D' }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2"
                        style={{ width: 28, height: 3, borderRadius: 999 }}
                        animate={{
                          background: ['#D4A373', '#FAD1D8', '#D4A373']
                        }}
                        transition={{ background: { duration: 3, repeat: Infinity } }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="relative px-4 overflow-hidden" style={{ height: 380 }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'home' ? (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Name + large circle */}
                      <div className="text-center mb-3">
                        <div className="relative inline-block">
                          <span className="font-serif font-bold text-[22px] text-[#2C2720] opacity-15 absolute -top-1 left-0 right-0 text-center select-none">Jaanu</span>
                          <span className="font-serif font-bold text-[22px] text-[#2C2720] relative">Jaanu</span>
                        </div>
                      </div>
                      {/* Large circle film */}
                      <motion.div
                        className="rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden relative"
                        style={{ width: 160, height: 160, background: 'linear-gradient(160deg,#FAD1D8,#DBC0E7)', border: '3px solid rgba(212,163,115,0.3)' }}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <span className="text-5xl">💑</span>
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                          <MoreHorizontal size={10} className="text-[#5C5347]" />
                        </div>
                        <span className="absolute bottom-2 right-2 text-[8px] text-white/60 font-medium bg-black/20 px-1.5 py-0.5 rounded-full">SEEN</span>
                      </motion.div>
                      {/* Action buttons */}
                      <div className="flex gap-2 justify-center mb-4">
                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 shadow-sm">
                          <Camera size={14} className="text-[#5C5347]" />
                          <Phone size={14} className="text-[#5C5347]" />
                        </div>
                      </div>
                      {/* Other priorities strip */}
                      <div className="flex gap-2">
                        {homeContacts.slice(1).map((c, i) => (
                          <motion.div key={i}
                            className="flex-1 rounded-2xl p-2.5 flex flex-col items-center gap-1"
                            style={{ background: c.color + '55', border: `1px solid ${c.color}` }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ delay: i * 0.5, duration: 3, repeat: Infinity }}
                          >
                            <span className="text-lg">{c.emoji}</span>
                            <span className="text-[9px] text-[#5C5347] font-medium">{c.name}</span>
                          </motion.div>
                        ))}
                      </div>
                      {/* Watch films bar */}
                      <div className="mt-3 py-2 text-center">
                        <span className="text-[9px] tracking-[0.18em] uppercase text-[#A89F8D] font-semibold">Watch Films</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Large circle post */}
                      <motion.div
                        className="rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden relative"
                        style={{ width: 200, height: 200, background: timelinePosts[0].bg }}
                        animate={{ scale: [1, 1.015, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        <span className="text-5xl">{timelinePosts[0].emoji}</span>
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/70 flex items-center justify-center">
                          <MoreHorizontal size={10} className="text-[#5C5347]" />
                        </div>
                      </motion.div>
                      {/* Two small circles */}
                      <div className="flex gap-3">
                        {timelinePosts.slice(1).map((p, i) => (
                          <motion.div key={i}
                            className="flex-1 rounded-full flex items-center justify-center overflow-hidden relative"
                            style={{ aspectRatio: '1', background: p.bg }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ delay: i * 0.5, duration: 4, repeat: Infinity }}
                          >
                            <span className="text-2xl">{p.emoji}</span>
                            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/70 flex items-center justify-center">
                              <MoreHorizontal size={8} className="text-[#5C5347]" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom camera FAB */}
              <div className="absolute bottom-10 right-4">
                <motion.div
                  className="w-9 h-9 rounded-full bg-[#2C2720] flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Camera size={14} className="text-white" />
                </motion.div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                <div className="w-16 h-1 rounded-full bg-[#2C2720]/20" />
              </div>
            </div>

            {/* Glow behind phone */}
            <div
              className="absolute inset-0 rounded-[44px] -z-10 blur-3xl opacity-20"
              style={{ background: 'linear-gradient(135deg, #FAD1D8, #DBC0E7)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
