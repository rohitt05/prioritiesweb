'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Avatar face renderers ───────────────────────────────────────────────────
const FACES = [
  // 0: girl light skin, bun
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FAD1D8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><ellipse cx="32" cy="18" rx="13" ry="10" fill="#3D2314"/><ellipse cx="20" cy="22" rx="5" ry="7" fill="#3D2314"/><ellipse cx="44" cy="22" rx="5" ry="7" fill="#3D2314"/><circle cx="26" cy="30" r="1.2" fill="#3D2314"/><circle cx="38" cy="30" r="1.2" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#C17B6B" strokeWidth="1.5" strokeLinecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/></svg>),
  // 1: boy medium skin, short hair
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#DBC0E7"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><rect x="19" y="15" width="26" height="14" rx="6" fill="#2C1A0E"/><circle cx="26" cy="30" r="1.3" fill="#2C1A0E"/><circle cx="38" cy="30" r="1.3" fill="#2C1A0E"/><path d="M28 37 Q32 39 36 37" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
  // 2: girl dark skin, curly
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#C9E6EE"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#8D5524"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#8D5524"/><circle cx="22" cy="22" r="8" fill="#1C0A00"/><circle cx="32" cy="18" r="9" fill="#1C0A00"/><circle cx="42" cy="22" r="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 40 36 37" stroke="#6B3A2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#C17B6B" opacity="0.4"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#C17B6B" opacity="0.4"/></svg>),
  // 3: boy light skin, wavy
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#D4E6D0"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/><path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#6B3F1E"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 39 36 37" stroke="#C17B6B" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
  // 4: girl medium skin, ponytail
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#F0E6C8"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#C68642"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#C68642"/><ellipse cx="32" cy="17" rx="14" ry="8" fill="#5C3317"/><rect x="28" y="10" width="8" height="16" rx="4" fill="#5C3317"/><circle cx="26" cy="30" r="1.3" fill="#3D2314"/><circle cx="38" cy="30" r="1.3" fill="#3D2314"/><path d="M28 37 Q32 40 36 37" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" fill="none"/><ellipse cx="24" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/><ellipse cx="40" cy="36" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.5"/></svg>),
  // 5: boy dark skin, fade
  (s: number, k: string) => (<svg key={k} width={s} height={s} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#E8D5C4"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#4A2912"/><ellipse cx="32" cy="28" rx="13" ry="13" fill="#4A2912"/><ellipse cx="32" cy="19" rx="13" ry="8" fill="#1C0A00"/><circle cx="26" cy="30" r="1.3" fill="#1C0A00"/><circle cx="38" cy="30" r="1.3" fill="#1C0A00"/><path d="M28 37 Q32 39 36 37" stroke="#6B3A2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
]

function YouAvatar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#FDFCF0"/>
      <ellipse cx="32" cy="38" rx="16" ry="14" fill="#FDDBB4"/>
      <ellipse cx="32" cy="28" rx="13" ry="13" fill="#FDDBB4"/>
      <path d="M19 26 Q18 16 32 15 Q46 16 45 26 Q43 18 32 18 Q21 18 19 26Z" fill="#4A2912"/>
      <circle cx="26" cy="30" r="1.5" fill="#2C1A0E"/>
      <circle cx="38" cy="30" r="1.5" fill="#2C1A0E"/>
      <path d="M27 36 Q32 40 37 36" stroke="#C17B6B" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <ellipse cx="24" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/>
      <ellipse cx="40" cy="35" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.45"/>
    </svg>
  )
}

// ─── 9 active contacts: 3 concentric rings (Apple Watch style) ────────────────
// Ring 1 (r=120): 3 closest contacts
// Ring 2 (r=195): 4 mid contacts  
// Ring 3 (r=265): 2 further contacts
const ACTIVE_9 = [
  // Ring 1 — 3 contacts, 120° apart
  { label: 'Jaanu 🌸', faceIdx: 0, angle: 270,  dist: 118, size: 66, isJaanu: true },
  { label: 'Diya',    faceIdx: 2, angle: 30,   dist: 118, size: 58 },
  { label: 'Karan',   faceIdx: 3, angle: 150,  dist: 118, size: 58 },
  // Ring 2 — 4 contacts, 90° apart
  { label: 'Aryan',   faceIdx: 1, angle: 315,  dist: 192, size: 54 },
  { label: 'Riya',    faceIdx: 4, angle: 45,   dist: 192, size: 52 },
  { label: 'Nisha',   faceIdx: 0, angle: 135,  dist: 192, size: 50 },
  { label: 'Maa',     faceIdx: 2, angle: 225,  dist: 192, size: 50 },
  // Ring 3 — 2 contacts
  { label: 'Raj',     faceIdx: 5, angle: 200,  dist: 258, size: 46 },
  { label: 'Zara',    faceIdx: 4, angle: 340,  dist: 258, size: 46 },
]

// ─── Full-section scattered ghost avatars ─────────────────────────────────────
// These use percentage-based positions so they fill the entire section
const GHOST_AVATARS = [
  // Top area
  { top: 4,  left: 5,  size: 44, opacity: 0.32, faceIdx: 1 },
  { top: 6,  left: 22, size: 38, opacity: 0.28, faceIdx: 3 },
  { top: 3,  left: 42, size: 42, opacity: 0.30, faceIdx: 0 },
  { top: 7,  left: 60, size: 36, opacity: 0.26, faceIdx: 2 },
  { top: 5,  left: 78, size: 40, opacity: 0.29, faceIdx: 5 },
  { top: 4,  left: 92, size: 34, opacity: 0.24, faceIdx: 4 },
  // Upper-mid area
  { top: 18, left: 2,  size: 40, opacity: 0.30, faceIdx: 2 },
  { top: 15, left: 14, size: 34, opacity: 0.25, faceIdx: 4 },
  { top: 20, left: 30, size: 36, opacity: 0.27, faceIdx: 1 },
  { top: 16, left: 72, size: 38, opacity: 0.28, faceIdx: 3 },
  { top: 19, left: 86, size: 34, opacity: 0.24, faceIdx: 0 },
  { top: 14, left: 96, size: 40, opacity: 0.30, faceIdx: 5 },
  // Middle left & right (flanking the active zone)
  { top: 34, left: 1,  size: 46, opacity: 0.34, faceIdx: 5 },
  { top: 42, left: 3,  size: 38, opacity: 0.28, faceIdx: 0 },
  { top: 50, left: 2,  size: 42, opacity: 0.31, faceIdx: 3 },
  { top: 35, left: 94, size: 44, opacity: 0.33, faceIdx: 1 },
  { top: 44, left: 96, size: 36, opacity: 0.27, faceIdx: 4 },
  { top: 52, left: 93, size: 40, opacity: 0.30, faceIdx: 2 },
  // Lower-mid area
  { top: 66, left: 6,  size: 38, opacity: 0.28, faceIdx: 4 },
  { top: 70, left: 20, size: 34, opacity: 0.24, faceIdx: 2 },
  { top: 68, left: 36, size: 36, opacity: 0.26, faceIdx: 5 },
  { top: 72, left: 65, size: 38, opacity: 0.27, faceIdx: 1 },
  { top: 67, left: 80, size: 34, opacity: 0.23, faceIdx: 3 },
  { top: 71, left: 93, size: 40, opacity: 0.30, faceIdx: 0 },
  // Bottom area
  { top: 83, left: 4,  size: 40, opacity: 0.28, faceIdx: 1 },
  { top: 88, left: 18, size: 34, opacity: 0.22, faceIdx: 0 },
  { top: 85, left: 35, size: 36, opacity: 0.25, faceIdx: 4 },
  { top: 86, left: 52, size: 38, opacity: 0.26, faceIdx: 3 },
  { top: 84, left: 68, size: 34, opacity: 0.22, faceIdx: 5 },
  { top: 87, left: 82, size: 36, opacity: 0.24, faceIdx: 2 },
  { top: 83, left: 94, size: 40, opacity: 0.28, faceIdx: 0 },
]

// ─── Deco bubbles scattered across the full section ───────────────────────────
const DECO_BUBBLES = [
  { top: 10, left: 10, size: 16, color: '#FAD1D8', opacity: 0.55 },
  { top: 25, left: 8,  size: 10, color: '#DBC0E7', opacity: 0.45 },
  { top: 10, left: 50, size: 12, color: '#C9E6EE', opacity: 0.50 },
  { top: 12, left: 70, size: 14, color: '#D4E6D0', opacity: 0.48 },
  { top: 8,  left: 88, size: 10, color: '#F0E6C8', opacity: 0.42 },
  { top: 35, left: 7,  size: 8,  color: '#FAD1D8', opacity: 0.38 },
  { top: 45, left: 92, size: 12, color: '#DBC0E7', opacity: 0.44 },
  { top: 55, left: 5,  size: 10, color: '#C9E6EE', opacity: 0.40 },
  { top: 60, left: 90, size: 14, color: '#FAD1D8', opacity: 0.46 },
  { top: 75, left: 10, size: 12, color: '#D4E6D0', opacity: 0.42 },
  { top: 78, left: 50, size: 10, color: '#DBC0E7', opacity: 0.38 },
  { top: 80, left: 75, size: 16, color: '#C9E6EE', opacity: 0.48 },
  { top: 92, left: 28, size: 10, color: '#FAD1D8', opacity: 0.36 },
  { top: 90, left: 60, size: 12, color: '#D4A373', opacity: 0.30 },
  { top: 93, left: 88, size: 8,  color: '#DBC0E7', opacity: 0.32 },
]

function toXY(angleDeg: number, dist: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: Math.cos(rad) * dist, y: Math.sin(rad) * dist }
}

export default function AudienceSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#FDFCF0] overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* ── Full-section watermark ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
      >
        <span
          className="font-serif italic font-bold whitespace-nowrap"
          style={{ fontSize: 'clamp(100px, 26vw, 320px)', color: 'rgba(67,61,53,0.05)', lineHeight: 1 }}
        >
          9 priorities
        </span>
      </motion.div>

      {/* ── Full-section scattered ghost avatars ── */}
      {GHOST_AVATARS.map((a, i) => (
        <motion.div
          key={`ghost-${i}`}
          className="absolute rounded-full overflow-hidden pointer-events-none"
          style={{
            width: a.size,
            height: a.size,
            top: `${a.top}%`,
            left: `${a.left}%`,
            opacity: a.opacity,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? {
            opacity: [a.opacity, Math.min(a.opacity * 1.5, 0.65), a.opacity],
            scale: [1, 1.06, 1],
          } : {}}
          transition={{ delay: i * 0.15, duration: 5 + (i % 5), repeat: Infinity, ease: 'easeInOut' }}
        >
          {FACES[a.faceIdx](a.size, `ghost-${i}`)}
        </motion.div>
      ))}

      {/* ── Deco bubbles scattered across section ── */}
      {DECO_BUBBLES.map((b, i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size, height: b.size,
            top: `${b.top}%`, left: `${b.left}%`,
            background: b.color,
            opacity: b.opacity,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [b.opacity, b.opacity * 1.4, b.opacity] }}
          transition={{ delay: i * 0.4, duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Header ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="label-tag block mb-4">Built for</span>
          <h2 className="font-serif text-[clamp(32px,5.5vw,68px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Real connections.
            <br />
            <em className="squiggle">Real people.</em>
          </h2>
        </motion.div>

        {/* ── Apple Watch-style constellation ── */}
        <motion.div
          className="relative mx-auto"
          style={{ width: 620, height: 620, maxWidth: '100%' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Concentric orbit rings */}
          {[120, 195, 262].map((r, i) => (
            <div key={i} className="absolute rounded-full border border-dashed"
              style={{
                width: r * 2, height: r * 2,
                top: `calc(50% - ${r}px)`, left: `calc(50% - ${r}px)`,
                borderColor: `rgba(44,39,32,${0.07 - i * 0.015})`,
              }}
            />
          ))}

          {/* 9 active priority contacts */}
          {ACTIVE_9.map((a, i) => {
            const { x, y } = toXY(a.angle, a.dist)
            const isJaanu = !!(a as { isJaanu?: boolean }).isJaanu
            return (
              <motion.div key={`contact-${i}`}
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(50% + ${x}px - ${a.size / 2}px)`,
                  top:  `calc(50% + ${y}px - ${a.size / 2}px)`,
                  zIndex: 20,
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {isJaanu && (
                  <motion.div className="absolute rounded-full"
                    style={{ width: a.size + 28, height: a.size + 28, top: -14, left: -14, background: '#FAD1D8', opacity: 0.42, filter: 'blur(12px)' }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.42, 0.62, 0.42] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <motion.div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: a.size, height: a.size,
                    border: isJaanu ? '2.5px solid #FAD1D8' : '1.5px solid rgba(44,39,32,0.09)',
                    boxShadow: isJaanu
                      ? '0 4px 20px rgba(250,209,216,0.50)'
                      : '0 2px 10px rgba(44,39,32,0.10)',
                  }}
                  animate={{ y: [0, isJaanu ? -9 : -4, 0] }}
                  transition={{ delay: i * 0.9, duration: isJaanu ? 3.8 : 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {FACES[a.faceIdx](a.size, `ac-${i}`)}
                </motion.div>
                <span style={{ fontSize: isJaanu ? 10 : 8, color: isJaanu ? '#2C2720' : '#A89F8D', marginTop: 3, whiteSpace: 'nowrap', fontWeight: isJaanu ? 600 : 400 }}>
                  {a.label}
                </span>
              </motion.div>
            )
          })}

          {/* Center — YOU (bigger: 130px) */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: 'calc(50% - 65px)', top: 'calc(50% - 65px)', zIndex: 30 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Golden pulse glow */}
            <motion.div className="absolute rounded-full"
              style={{
                width: 180, height: 180, top: -25, left: -25,
                background: 'radial-gradient(circle, rgba(212,163,115,0.35) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative rounded-full overflow-hidden"
              style={{
                width: 130, height: 130,
                border: '3.5px solid #D4A373',
                boxShadow: '0 8px 32px rgba(212,163,115,0.40), 0 2px 8px rgba(44,39,32,0.12)',
              }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <YouAvatar size={130} />
            </motion.div>
            <span className="text-[13px] font-bold text-[#2C2720] mt-2 tracking-wider">You</span>
          </motion.div>

          {/* Bottom caption */}
          <motion.p
            className="absolute -bottom-8 left-0 right-0 text-center text-[11px] text-[#B0A898] italic"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            9 people who actually matter — everyone else just fades away.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
