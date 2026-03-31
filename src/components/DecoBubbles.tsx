'use client'
import { motion } from 'framer-motion'

const bubbles = [
  { s:90,  c:'#FAD1D8', t:'12%', l:'4%',   d:0,   dur:7   },
  { s:56,  c:'#DBC0E7', t:'20%', l:'16%',  d:0.5, dur:6   },
  { s:40,  c:'#B8C88D', t:'7%',  l:'36%',  d:1,   dur:8   },
  { s:70,  c:'#C9E6EE', t:'16%', r:'20%',  d:0.3, dur:5.5 },
  { s:100, c:'#FFD4B8', t:'4%',  r:'6%',   d:0.7, dur:7.5 },
  { s:44,  c:'#A8E6CF', t:'38%', l:'7%',   d:1.2, dur:6   },
  { s:60,  c:'#E9DFB4', t:'42%', r:'4%',   d:0.4, dur:8   },
  { s:32,  c:'#FEC8D8', t:'28%', l:'52%',  d:1.5, dur:5   },
  { s:80,  c:'#C0AEDE', t:'58%', l:'2%',   d:0.8, dur:9   },
  { s:50,  c:'#B6E3F4', t:'64%', r:'10%',  d:0.2, dur:7   },
  { s:36,  c:'#FFF2CC', t:'72%', l:'24%',  d:1.3, dur:6   },
  { s:64,  c:'#FF9A9E', t:'76%', r:'28%',  d:0.6, dur:8   },
  { s:46,  c:'#CAFFBF', t:'83%', l:'9%',   d:1,   dur:7   },
  { s:52,  c:'#FFC8DD', t:'89%', r:'7%',   d:0.9, dur:6.5 },
]

export default function DecoBubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.s, height: b.s,
            background: b.c, opacity: 0.65,
            top: b.t,
            left:  (b as any).l,
            right: (b as any).r,
          }}
          animate={{
            y:      [0, -(b.s * 0.2), 0],
            x:      [0, (i % 2 === 0 ? 7 : -7), 0],
            rotate: [0, (i % 2 === 0 ? 5 : -5), 0],
          }}
          transition={{ delay: b.d, duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
