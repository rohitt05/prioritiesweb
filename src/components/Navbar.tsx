'use client'
import { useState, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Films',      href: '#films' },
  { label: 'Priorities', href: '#priorities' },
  { label: 'Timeline',   href: '#timeline' },
  { label: 'Features',   href: '#features' },
]

function NavLink({ label, href, onClose }: { label: string; href: string; onClose?: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-[13px] font-medium text-[#7C7267] hover:text-[#2C2720] transition-colors duration-200 py-1 px-0.5"
    >
      {label}
      {/* Underline slide */}
      <motion.span
        className="absolute bottom-0 left-0 h-[1.5px] bg-[#433D35] rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60))

  // Logo letters for hover animation
  const logoLetters = 'priorities'.split('')

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: scrolled ? '10px' : '18px', transition: 'padding 0.4s ease' }}
      >
        {/* Floating pill */}
        <motion.div
          animate={{
            width: scrolled ? '92%' : '100%',
            maxWidth: scrolled ? '820px' : '100%',
            borderRadius: scrolled ? '999px' : '0px',
            paddingLeft: scrolled ? '20px' : '32px',
            paddingRight: scrolled ? '20px' : '32px',
            paddingTop: scrolled ? '10px' : '14px',
            paddingBottom: scrolled ? '10px' : '14px',
            backgroundColor: scrolled ? 'rgba(253,252,240,0.88)' : 'rgba(253,252,240,0)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            boxShadow: scrolled
              ? '0 2px 24px rgba(67,61,53,0.08), 0 0 0 1px rgba(67,61,53,0.06)'
              : 'none',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between w-full"
        >
          {/* ── Logo ── */}
          <motion.a
            href="#"
            className="flex items-baseline gap-[1px] cursor-pointer select-none"
            whileHover="hovered"
          >
            {logoLetters.map((l, i) => (
              <motion.span
                key={i}
                variants={{
                  hovered: {
                    y: [0, -5, 0],
                    transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="text-[20px] sm:text-[22px] font-serif italic font-bold text-[#433D35] tracking-tight leading-none"
              >
                {l}
              </motion.span>
            ))}
          </motion.a>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {links.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i + 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink label={item.label} href={item.href} />
              </motion.div>
            ))}
          </div>

          {/* ── Right: CTA + hamburger ── */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#waitlist"
              className="btn-ink text-[12px] sm:text-[13px] py-2 sm:py-2.5 px-4 sm:px-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Join Waitlist
            </motion.a>

            {/* Hamburger — morphs to X */}
            <motion.button
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="absolute w-[18px] h-[1.5px] bg-[#433D35] rounded-full"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute w-[18px] h-[1.5px] bg-[#433D35] rounded-full"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* ─────────────────────────────────────────
           Mobile full-screen overlay drawer
         ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 36px) 36px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#FDFCF0] flex flex-col justify-center items-center md:hidden"
          >
            {/* Big staggered nav links */}
            <nav className="flex flex-col items-center gap-2 mb-12">
              {links.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08 + 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-[clamp(40px,12vw,72px)] font-bold text-[#2C2720] leading-tight tracking-tight hover:text-[#C4A882] transition-colors duration-200"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="btn-ink px-8 py-3 text-[14px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Join Waitlist
            </motion.a>

            {/* Decorative blobs */}
            <div className="absolute bottom-16 left-8 w-32 h-32 rounded-full bg-[#FAD1D8] opacity-30 blur-2xl pointer-events-none" />
            <div className="absolute top-20 right-8 w-24 h-24 rounded-full bg-[#DBC0E7] opacity-25 blur-2xl pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
