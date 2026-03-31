'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#FDFCF0] border-t border-[rgba(67,61,53,0.07)] py-12 sm:py-14 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <span className="text-[22px] sm:text-[24px] font-serif italic font-bold text-[#433D35]">priorities</span>
            <p className="text-[12px] text-[#A89F8D] mt-1">For the people who matter most.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-[12px] sm:text-[13px] text-[#A89F8D]">
            {['Films', 'Priorities', 'Timeline', 'Waitlist'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#433D35] transition-colors">{l}</a>
            ))}
          </div>

          <div className="flex gap-2">
            {['Instagram', 'Twitter'].map(s => (
              <motion.a key={s} href="#"
                className="px-3 sm:px-4 py-2 rounded-xl bg-[#F7F4E9] border border-[rgba(67,61,53,0.09)] text-[11px] sm:text-[12px] text-[#7C7267] hover:text-[#433D35] transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
              >{s}</motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[rgba(67,61,53,0.05)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#A89F8D]">© 2026 Priorities. All rights reserved.</p>
          <p className="text-[11px] text-[#A89F8D] font-serif italic">built by your loverr 🌸</p>
        </div>
      </div>
    </footer>
  )
}
