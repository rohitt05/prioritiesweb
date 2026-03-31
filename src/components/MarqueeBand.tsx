'use client'
import { motion } from 'framer-motion'

const items = [
  '📽️ Films of My Day',
  '📌 Priority List',
  '🎙️ Audio Notes',
  '📅 Shared Timeline',
  '📞 Voice & Video Calls',
  '🔒 Fully Private',
  '💬 Emoji Reactions',
  '🌸 No Algorithm',
  '📸 Rich Media',
  '🫶 Built for Love',
]

export default function MarqueeBand() {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-[rgba(67,61,53,0.08)] bg-[#F7F4E9] py-4">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-6 flex-shrink-0">
            <span className="text-[13px] font-medium text-[#433D35] whitespace-nowrap">{item}</span>
            <span className="w-1 h-1 rounded-full bg-[#D4A373] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
