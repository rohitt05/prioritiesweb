'use client'

import { motion } from 'framer-motion'

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary rose orb */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,77,109,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mauve orb right */}
      <motion.div
        className="absolute top-[10%] right-[-15%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(199,125,255,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Center bottom purple */}
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(123,47,190,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
