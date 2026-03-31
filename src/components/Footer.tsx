'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#FDFCF0] border-t border-[rgba(67,61,53,0.07)] py-10 sm:py-14 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <span className="text-[22px] font-serif italic font-bold text-[#433D35]">priorities</span>
            <p className="text-[12px] text-[#A89F8D] mt-1">For the people who matter most.</p>
          </div>

          {/* Links — horizontal scroll on mobile */}
          <div className="flex gap-5 sm:gap-8 overflow-x-auto scrollbar-hide text-[12px] sm:text-[13px] text-[#A89F8D]">
            {['Films', 'Priorities', 'Timeline', 'Waitlist'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="hover:text-[#433D35] transition-colors whitespace-nowrap"
              >{l}</a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-2">
            {['Instagram', 'Twitter'].map(s => (
              <motion.a key={s} href="#"
                className="px-3 sm:px-4 py-2 rounded-xl bg-[#F7F4E9] border border-[rgba(67,61,53,0.09)] text-[11px] sm:text-[12px] text-[#7C7267] hover:text-[#433D35] transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
              >{s}</motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[rgba(67,61,53,0.05)] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[11px] text-[#A89F8D]">© 2026 Priorities. All rights reserved.</p>
          <p className="text-[12px] text-[#A89F8D] font-serif italic">
            Built with love, for love — by your loverr 🌸
          </p>
        </div>
      </div>
    </footer>
  )
}
