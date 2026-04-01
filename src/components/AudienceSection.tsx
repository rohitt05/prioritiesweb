'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// SVG avatar faces — boy/girl variants with different skin tones & hair
const FACE_VARIANTS = [
  // girl - light skin, dark hair bun
  (size: number, key: string) => (
    <svg key={key} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#FAD1D8"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/>
      <ellipse cx="32" cy="18" rx="13" ry="10" fill="#3D2314"/>
      <ellipse cx="20" cy="22" rx="5" ry="7" fill="#3D2314"/>
      <ellipse cx="44" cy="22" rx="5" ry="7" fill="#3D2314"/>
      <ellipse cx="32" cy="14" rx="8" ry="7" fill="#3D2314"/>
      <ellipse cx="26" cy="30" rx="2.5" ry="3" fill="#8B4513" opacity="0.5"/>
      <ellipse cx="38" cy="30" rx="2.5" ry="3" fill="#8B4513" opacity="0.5"/>
      <circle cx="26" cy="30" r="1.2" fill="#3D2314"/>
      <circle cx="38" cy="30" r="1.2" fill="#3D2314"/>
      <path d="M28 37 Q32 40 36 37" stroke="#C17B6B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/>
      <ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/>
    </svg>
  ),
  // boy - medium skin, short dark hair
  (size: number, key: string) => (
    <svg key={key} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#DBC0E7"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/>
      <rect x="19" y="15" width="26" height="14" rx="6" fill="#2C1A0E"/>
      <ellipse cx="26" cy="30" rx="2.5" ry="3" fill="#8B6914" opacity="0.5"/>
      <ellipse cx="38" cy="30" rx="2.5" ry="3" fill="#8B6914" opacity="0.5"/>
      <circle cx="26" cy="30" r="1.3" fill="#2C1A0E"/>
      <circle cx="38" cy="30" r="1.3" fill="#2C1A0E"/>
      <path d="M28 37 Q32 39 36 37" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  // girl - dark skin, curly hair
  (size: number, key: string) => (
    <svg key={key} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#C9E6EE"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#8D5524"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#8D5524"/>
      <circle cx="22" cy="22" r="8" fill="#1C0A00"/>
      <circle cx="32" cy="18" r="9" fill="#1C0A00"/>
      <circle cx="42" cy="22" r="8" fill="#1C0A00"/>
      <circle cx="26" cy="30" r="1.3" fill="#1C0A00"/>
      <circle cx="38" cy="30" r="1.3" fill="#1C0A00"/>
      <path d="M28 37 Q32 40 36 37" stroke="#6B3A2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#C17B6B" opacity="0.4"/>
      <ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#C17B6B" opacity="0.4"/>
    </svg>
  ),
  // boy - light skin, wavy brown hair
  (size: number, key: string) => (
    <svg key={key} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#D4E6D0"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/>
      <path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#6B3F1E"/>
      <circle cx="26" cy="30" r="1.3" fill="#3D2314"/>
      <circle cx="38" cy="30" r="1.3" fill="#3D2314"/>
      <path d="M28 37 Q32 39 36 37" stroke="#C17B6B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  // girl - medium skin, ponytail
  (size: number, key: string) => (
    <svg key={key} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#F0E6C8"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/>
      <ellipse cx="32" cy="17" rx="14" ry="8" fill="#5C3317"/>
      <rect x="28" y="10" width="8" height="16" rx="4" fill="#5C3317"/>
      <circle cx="26" cy="30" r="1.3" fill="#3D2314"/>
      <circle cx="38" cy="30" r="1.3" fill="#3D2314"/>
      <path d="M28 37 Q32 40 36 37" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/>
      <ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/>
    </svg>
  ),
  // boy - dark skin, fade cut
  (size: number, key: string) => (
    <svg key={key} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#E8D5C4"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#4A2912"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#4A2912"/>
      <ellipse cx="32" cy="19" rx="13" ry="8" fill="#1C0A00"/>
      <circle cx="26" cy="30" r="1.3" fill="#1C0A00"/>
      <circle cx="38" cy="30" r="1.3" fill="#1C0A00"/>
      <path d="M28 37 Q32 39 36 37" stroke="#6B3A2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
]

// Center "You" avatar
function YouAvatar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#FDFCF0"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/>
      <path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#4A2912"/>
      <circle cx="26" cy="30" r="1.4" fill="#2C1A0E"/>
      <circle cx="38" cy="30" r="1.4" fill="#2C1A0E"/>
      <path d="M27 36 Q32 40 37 36" stroke="#C17B6B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <ellipse cx="24" cy="35" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.4"/>
      <ellipse cx="40" cy="35" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.4"/>
    </svg>
  )
}

// 9 active priority contacts around "You"
const ACTIVE_9 = [
  { label: 'Jaanu 🌸', faceIdx: 0, angle: 270, dist: 110, size: 60, color: '#FAD1D8', ring: true },
  { label: 'Aryan',    faceIdx: 1, angle: 210, dist: 110, size: 54, color: '#DBC0E7' },
  { label: 'Diya',     faceIdx: 2, angle: 330, dist: 110, size: 54, color: '#C9E6EE' },
  { label: 'Nisha',    faceIdx: 4, angle: 150, dist: 185, size: 50, color: '#F0E6C8' },
  { label: 'Karan',    faceIdx: 3, angle: 30,  dist: 185, size: 48, color: '#D4E6D0' },
  { label: 'Riya',     faceIdx: 0, angle: 90,  dist: 185, size: 46, color: '#FAD1D8', opacity: 0.85 },
  { label: 'Maa',      faceIdx: 2, angle: 200, dist: 255, size: 44, color: '#E8D5C4', opacity: 0.75 },
  { label: 'Raj',      faceIdx: 5, angle: 320, dist: 255, size: 42, color: '#DBC0E7', opacity: 0.7  },
  { label: 'Zara',     faceIdx: 4, angle: 70,  dist: 255, size: 40, color: '#C9E6EE', opacity: 0.65 },
]

// Ghost/faded background avatars (the world)
const GHOST_AVATARS = [
  { angle: 10,  dist: 310, size: 34, opacity: 0.13, faceIdx: 1 },
  { angle: 55,  dist: 295, size: 28, opacity: 0.10, faceIdx: 3 },
  { angle: 100, dist: 320, size: 32, opacity: 0.11, faceIdx: 0 },
  { angle: 140, dist: 300, size: 26, opacity: 0.09, faceIdx: 2 },
  { angle: 175, dist: 315, size: 30, opacity: 0.12, faceIdx: 5 },
  { angle: 235, dist: 295, size: 28, opacity: 0.10, faceIdx: 4 },
  { angle: 280, dist: 310, size: 32, opacity: 0.11, faceIdx: 1 },
  { angle: 350, dist: 305, size: 26, opacity: 0.09, faceIdx: 3 },
  // Extra ghost decorative plain circles
  { angle: 25,  dist: 340, size: 22, opacity: 0.07, faceIdx: -1 },
  { angle: 80,  dist: 350, size: 18, opacity: 0.06, faceIdx: -1 },
  { angle: 120, dist: 345, size: 20, opacity: 0.07, faceIdx: -1 },
  { angle: 200, dist: 335, size: 24, opacity: 0.08, faceIdx: -1 },
  { angle: 260, dist: 345, size: 18, opacity: 0.06, faceIdx: -1 },
  { angle: 305, dist: 340, size: 20, opacity: 0.07, faceIdx: -1 },
]

function toXY(angleDeg: number, dist: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: Math.cos(rad) * dist, y: Math.sin(rad) * dist }
}

export default function AudienceSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#FDFCF0] overflow-hidden">
      {/* Ghost watermark text — "priorities" repeated 9 times */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.6 }}
      >
        {Array.from({ length: 9 }).map((_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          return (
            <span
              key={i}
              className="font-serif italic font-bold text-[clamp(40px,9vw,110px)] text-[rgba(67,61,53,0.035)] absolute whitespace-nowrap leading-none"
              style={{
                top:  `${15 + row * 33}%`,
                left: `${-5 + col * 35}%`,
                transform: `rotate(-8deg)`,
              }}
            >
              priorities
            </span>
          )
        })}
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="label-tag block mb-4">Built for</span>
          <h2 className="font-serif text-[clamp(34px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Real connections.
            <br />
            <em className="squiggle">Real people.</em>
          </h2>
        </motion.div>

        {/* Avatar constellation */}
        <motion.div
          className="relative mx-auto flex items-center justify-center"
          style={{ width: 680, height: 680, maxWidth: '100%' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Subtle orbit rings */}
          {[110, 185, 255].map((r, i) => (
            <div key={i} className="absolute rounded-full border border-dashed"
              style={{
                width: r * 2,
                height: r * 2,
                borderColor: `rgba(44,39,32,${0.05 - i * 0.01})`,
              }}
            />
          ))}

          {/* Ghost / faded world avatars */}
          {GHOST_AVATARS.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            return (
              <motion.div key={`ghost-${i}`}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                  opacity: a.opacity,
                  filter: 'blur(1.5px)',
                }}
                animate={{ opacity: [a.opacity, a.opacity * 1.5, a.opacity] }}
                transition={{ delay: i * 0.5, duration: 6 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
              >
                {a.faceIdx >= 0 ? (
                  <div className="rounded-full overflow-hidden" style={{ width: a.size, height: a.size }}>
                    {FACE_VARIANTS[a.faceIdx](a.size, `gf-${i}`)}
                  </div>
                ) : (
                  <div className="rounded-full bg-[#C4B9A8]" style={{ width: a.size, height: a.size }} />
                )}
              </motion.div>
            )
          })}

          {/* 9 active priority avatars */}
          {ACTIVE_9.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            const opacityVal = a.opacity ?? 1
            const isJaanu = i === 0
            return (
              <motion.div key={`active-${i}`}
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: opacityVal, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Glow for Jaanu */}
                {isJaanu && (
                  <motion.div className="absolute rounded-full"
                    style={{ width: a.size + 24, height: a.size + 24, top: -12, left: -12, background: '#FAD1D8', opacity: 0.35, filter: 'blur(10px)' }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <motion.div
                  className="relative rounded-full overflow-hidden shadow-md"
                  style={{
                    width: a.size, height: a.size,
                    border: isJaanu ? '2.5px solid #FAD1D8' : '1.5px solid rgba(44,39,32,0.1)',
                    boxShadow: isJaanu ? '0 4px 16px rgba(250,209,216,0.4)' : '0 2px 8px rgba(44,39,32,0.08)',
                  }}
                  animate={{ y: [0, isJaanu ? -8 : -4, 0] }}
                  transition={{ delay: i * 0.8, duration: isJaanu ? 4 : 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {FACE_VARIANTS[a.faceIdx](a.size, `av-${i}`)}
                </motion.div>
                <span
                  className="font-medium text-center leading-tight"
                  style={{
                    fontSize: isJaanu ? 11 : 9,
                    color: isJaanu ? '#2C2720' : '#A89F8D',
                    marginTop: 3,
                    maxWidth: a.size + 10,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.label}
                </span>
              </motion.div>
            )
          })}

          {/* Center — You */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: 'calc(50% - 52px)', top: 'calc(50% - 52px)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Gold glow ring */}
            <motion.div className="absolute rounded-full"
              style={{ width: 140, height: 140, top: -18, left: -18, background: 'radial-gradient(circle, #D4A373 0%, transparent 70%)', opacity: 0.22 }}
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative rounded-full overflow-hidden shadow-xl"
              style={{ width: 104, height: 104, border: '3px solid #D4A373', boxShadow: '0 6px 24px rgba(212,163,115,0.35)' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <YouAvatar size={104} />
            </motion.div>
            <span className="text-[12px] font-bold text-[#2C2720] mt-2 tracking-wide">You</span>
          </motion.div>

          {/* Caption */}
          <motion.p
            className="absolute bottom-0 left-0 right-0 text-center text-[12px] text-[#A89F8D] italic"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            9 people who actually matter — everyone else just fades away.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
