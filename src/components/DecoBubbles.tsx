'use client'

import { motion } from 'framer-motion'

const bubbles = [
  { size: 80,  color: '#FAD1D8', top: '12%',  left: '5%',   delay: 0,   duration: 7 },
  { size: 54,  color: '#DBC0E7', top: '22%',  left: '18%',  delay: 0.5, duration: 6 },
  { size: 44,  color: '#B8C88D', top: '8%',   left: '38%',  delay: 1,   duration: 8 },
  { size: 66,  color: '#C9E6EE', top: '18%',  right: '22%', delay: 0.3, duration: 5.5 },
  { size: 88,  color: '#FFD4B8', top: '5%',   right: '8%',  delay: 0.7, duration: 7.5 },
  { size: 40,  color: '#A8E6CF', top: '35%',  left: '8%',   delay: 1.2, duration: 6 },
  { size: 56,  color: '#E9DFB4', top: '40%',  right: '5%',  delay: 0.4, duration: 8 },
  { size: 34,  color: '#FEC8D8', top: '28%',  left: '50%',  delay: 1.5, duration: 5 },
  { size: 72,  color: '#C0AEDE', top: '55%',  left: '3%',   delay: 0.8, duration: 9 },
  { size: 48,  color: '#B6E3F4', top: '62%',  right: '12%', delay: 0.2, duration: 7 },
  { size: 38,  color: '#FFF2CC', top: '70%',  left: '25%',  delay: 1.3, duration: 6 },
  { size: 60,  color: '#FF9A9E', top: '75%',  right: '30%', delay: 0.6, duration: 8 },
  { size: 44,  color: '#CAFFBF', top: '82%',  left: '10%',  delay: 1,   duration: 7 },
  { size: 50,  color: '#FFC8DD', top: '88%',  right: '8%',  delay: 0.9, duration: 6.5 },
]

export default function DecoBubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-70"
          style={{
            width: b.size,
            height: b.size,
            background: b.color,
            top: b.top,
            left: (b as any).left,
            right: (b as any).right,
          }}
          animate={{
            y: [0, -b.size * 0.18, 0],
            x: [0, (i % 2 === 0 ? 6 : -6), 0],
            rotate: [0, (i % 2 === 0 ? 4 : -4), 0],
          }}
          transition={{
            delay: b.delay,
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
