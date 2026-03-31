'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#F7F4E9] border-t border-[rgba(67,61,53,0.08)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-serif italic font-bold text-[#433D35] tracking-tight">priorities</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[#A89F8D]">
            {['Films', 'Priorities', 'Timeline', 'Waitlist'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#433D35] transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {['Instagram', 'Twitter'].map(s => (
              <motion.a
                key={s}
                href="#"
                className="px-4 py-2 rounded-xl bg-white border border-[rgba(67,61,53,0.1)] text-xs text-[#7C7267] hover:text-[#433D35] transition-colors"
                whileHover={{ scale: 1.05, y: -1 }}
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[rgba(67,61,53,0.06)] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#A89F8D]">© 2026 Priorities. All rights reserved.</p>
          <p className="text-xs text-[#A89F8D] font-serif italic">Built with love, for love — by Rohit</p>
        </div>
      </div>
    </footer>
  )
}
