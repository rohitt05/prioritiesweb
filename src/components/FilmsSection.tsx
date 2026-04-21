'use client'
import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

const FILM_COLORS = [
  ['#C9E6EE', '#DDB892', '#FAD1D8'],
  ['#FAD1D8', '#B8C88D', '#DBC0E7', '#E9DFB4', '#C9E6EE', '#FFD4B8'],
  ['#FEC8D8', '#C0AEDE', '#B6E3F4', '#A8E6CF'],
  ['#E9DFB4', '#FFD4B8', '#DBC0E7'],
]

const VIDEO_SLOTS = [[0], [3], [1], []]

function getFilmDays() {
  const today = new Date()
  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toLowerCase()
    const label = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : `${i} days ago`
    const films = FILM_COLORS[i].map((c, fi) => ({ c, isVideo: VIDEO_SLOTS[i].includes(fi) }))
    return { date, label, films }
  })
}

// ─── Spring config: iPhone-level smoothness ────────────────────────────────
// High stiffness + high damping = instant response, zero wobble.
// This is the same feel as UIKit spring animations.
const SPRING = { stiffness: 180, damping: 28, mass: 0.6 }

function FilmDayRow({ day, index }: { day: ReturnType<typeof getFilmDays>[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  // ─── Scroll range: give more breathing room on mobile
  // 'start 100%' = card just entered viewport (bottom edge of screen)
  // 'start 45%'  = card's top is at 45% — plenty of scroll distance on mobile
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 100%', 'start 40%'],
  })

  // ─── Raw transforms (no spring — pure scroll-linked)
  const rawY = useTransform(scrollYProgress, [0, 1], [55, 0])
  const rawOp = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const rawSc = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  // Subtle rotation — reduced to ±1.5° (was ±3°, too visible on mobile)
  const rawRot = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1.5 : 1.5, 0])
  // Dot scale — extracted OUT of JSX (fixes hook-in-JSX bug)
  const dotSc = useTransform(scrollYProgress, [0, 0.45], [0, 1])

  // ─── Springs: only on Y and Scale. NO blur, NO spring on opacity.
  // Opacity should be raw (instant) — spring on opacity causes the
  // "fading too slow" artifact on mobile especially.
  const y = useSpring(rawY, SPRING)
  const sc = useSpring(rawSc, SPRING)
  // Rotation: no spring needed, raw transform is subtle enough
  // Spring on rotation causes micro-wobble that looks odd on a timeline

  const isRight = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-4 sm:gap-8 mb-10 sm:mb-14 ${isRight ? 'flex-row-reverse' : ''
        }`}
      // ─── KEY CHANGE: no filter here. Blur removed entirely.
      // GPU compositing is preserved → silky on all devices.
      style={{ y, opacity: rawOp, scale: sc, rotate: rawRot }}
    >
      {/* Film grid */}
      <div className="flex-1">
        <div className={`grid grid-cols-3 gap-1.5 sm:gap-2 max-w-[200px] sm:max-w-[280px] ${isRight ? 'ml-auto' : ''
          }`}>
          {day.films.map((f, fi) => (
            <motion.div
              key={fi}
              className="aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer"
              style={{ background: f.c }}
              // whileHover only fires on devices with hover (desktop)
              // no transform on mobile = better tap feel
              whileHover={{ scale: 1.08, rotate: 2, zIndex: 10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.94 }}
            >
              {f.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-[#433D35] ml-0.5" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center dot + date */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0 z-10">
        {/* dotSc is computed above the JSX — no hook inside render */}
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-[#D4A373] border-2 border-[#FDFCF0] shadow-[0_0_0_2px_#D4A373]"
          style={{ scale: dotSc }}
        />
        <div className="text-center">
          <div className="text-[11px] font-bold text-[#433D35]">{day.date}</div>
          <div className="text-[9px] sm:text-[10px] text-[#A89F8D]">{day.label}</div>
        </div>
      </div>

      <div className="flex-1" />
    </motion.div>
  )
}

export default function FilmsSection() {
  const filmDays = useMemo(() => getFilmDays(), [])

  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Header: useInView instead of scroll-spring for simpler, crisper entrance
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  // Timeline line: raw transform, no spring — line should track scroll 1:1
  const { scrollYProgress: lineScroll } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 15%'],
  })
  // NO spring on the line — direct scroll-linked drawing looks most natural
  const lineScaleY = useTransform(lineScroll, [0, 1], [0, 1])

  return (
    <section id="films" ref={sectionRef} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#FDFCF0]">
      <div className="max-w-4xl mx-auto">

        {/* Header — useInView entrance, clean and instant */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-tag block mb-4">Films of My Day</span>
            <h2 className="font-serif text-[clamp(36px,7vw,80px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
              Your days,
              <br />
              <em className="squiggle">beautifully archived.</em>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[16px] text-[#7C7267] max-w-sm leading-relaxed">
              Every photo and video becomes a film — day by day,
              visible only to those you choose.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[rgba(67,61,53,0.08)]">
            {/* Direct scaleY — no spring, tracks scroll 1:1 */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D4A373] origin-top"
              style={{ scaleY: lineScaleY, height: '100%' }}
            />
          </div>

          {filmDays.map((day, di) => (
            <FilmDayRow key={di} day={day} index={di} />
          ))}
        </div>

        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="label-tag">FILMS</span>
          <span className="w-7 h-7 rounded-full bg-[#433D35] text-[#FDFCF0] text-[11px] font-bold flex items-center justify-center">16</span>
        </motion.div>
      </div>
    </section>
  )
}