'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Each bento cell has a visual demo element, not just text
const cells = [
  {
    id: 'priority',
    size: 'col-span-2 row-span-2',
    bg: '#FAD1D8',
    title: 'Priority List',
    sub: 'Pinned · Always on top',
    visual: 'bubbles',
  },
  {
    id: 'films',
    size: 'col-span-1 row-span-1',
    bg: '#C9E6EE',
    title: 'Films',
    sub: 'Your day, archived',
    visual: 'grid',
  },
  {
    id: 'audio',
    size: 'col-span-1 row-span-1',
    bg: '#DBC0E7',
    title: 'Audio Notes',
    sub: 'Your voice, delivered',
    visual: 'waveform',
  },
  {
    id: 'private',
    size: 'col-span-1 row-span-1',
    bg: '#A8E6CF',
    title: 'Fully Private',
    sub: 'No algorithm. No strangers.',
    visual: 'lock',
  },
  {
    id: 'call',
    size: 'col-span-1 row-span-1',
    bg: '#FFD4B8',
    title: 'Calls',
    sub: 'Voice & Video built-in',
    visual: 'call',
  },
  {
    id: 'timeline',
    size: 'col-span-2 row-span-1',
    bg: '#E9DFB4',
    title: 'Shared Timeline',
    sub: 'Scroll back through your story',
    visual: 'timeline',
  },
  {
    id: 'reactions',
    size: 'col-span-1 row-span-1',
    bg: '#FEC8D8',
    title: 'Reactions',
    sub: 'Warm & personal',
    visual: 'emojis',
  },
  {
    id: 'bubbles',
    size: 'col-span-1 row-span-1',
    bg: '#B6E3F4',
    title: 'Bubble Map',
    sub: 'Your day, visualised',
    visual: 'dots',
  },
]

function Visual({ type, color }: { type: string; color: string }) {
  if (type === 'bubbles') return (
    <div className="flex gap-2 mt-4">
      {['#FAD1D8','#DBC0E7','#C9E6EE','#A8E6CF'].map((c,i) => (
        <motion.div key={i}
          className="rounded-full border-2 border-white"
          style={{ width:32+i*8, height:32+i*8, background:c, marginBottom: i*4 }}
          animate={{ y:[0,-5,0] }}
          transition={{ delay:i*0.2, duration:3, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
  if (type === 'grid') return (
    <div className="grid grid-cols-2 gap-1.5 mt-4 w-20">
      {['#C9E6EE','#FFD4B8','#FAD1D8','#B8C88D'].map((c,i) => (
        <div key={i} className="w-8 h-8 rounded-xl" style={{ background:c }} />
      ))}
    </div>
  )
  if (type === 'waveform') return (
    <div className="flex items-end gap-1 mt-4 h-10">
      {[0.4,0.7,1,0.6,0.9,0.5,0.8,0.4,0.6,1,0.7,0.3].map((h,i) => (
        <motion.div key={i}
          className="w-1.5 rounded-full"
          style={{ background:'#7C7267', height: `${h*100}%` }}
          animate={{ scaleY:[1, h>0.7?1.3:0.7, 1] }}
          transition={{ delay:i*0.08, duration:1.2, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
  if (type === 'lock') return (
    <motion.div
      className="text-5xl mt-4"
      animate={{ rotate:[0,-5,5,0], scale:[1,1.08,1] }}
      transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
    >🔒</motion.div>
  )
  if (type === 'call') return (
    <div className="flex gap-3 mt-4">
      {['🎬','📞'].map(e => (
        <motion.div key={e}
          className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-2xl shadow-sm"
          animate={{ scale:[1,1.06,1] }}
          transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
        >{e}</motion.div>
      ))}
    </div>
  )
  if (type === 'timeline') return (
    <div className="flex items-center gap-3 mt-4">
      {['Mar 30','Mar 29','Mar 28','Mar 27'].map((d,i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#433D35] opacity-60" />
          <span className="text-[11px] font-medium text-[#433D35]">{d}</span>
          {i < 3 && <div className="w-6 h-px bg-[rgba(67,61,53,0.2)]" />}
        </div>
      ))}
    </div>
  )
  if (type === 'emojis') return (
    <div className="flex gap-2 mt-4">
      {['🫶','😍','✨','💬'].map((e,i) => (
        <motion.span key={i}
          className="text-2xl"
          animate={{ y:[0,-5,0], rotate:[0,8,-8,0] }}
          transition={{ delay:i*0.15, duration:2.5, repeat:Infinity, ease:'easeInOut' }}
        >{e}</motion.span>
      ))}
    </div>
  )
  if (type === 'dots') return (
    <div className="relative w-24 h-16 mt-4">
      {[
        {s:20,c:'#FAD1D8',t:'0%',l:'10%'},
        {s:14,c:'#DBC0E7',t:'20%',l:'40%'},
        {s:24,c:'#C9E6EE',t:'40%',l:'5%'},
        {s:16,c:'#A8E6CF',t:'10%',l:'65%'},
        {s:12,c:'#FFD4B8',t:'55%',l:'55%'},
      ].map((b,i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ width:b.s, height:b.s, background:b.c, top:b.t, left:b.l }}
          animate={{ y:[0,-4,0] }}
          transition={{ delay:i*0.25, duration:3, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
  return null
}

export default function BentoFeatures() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="relative py-28 px-6 bg-[#F7F4E9]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8 }}
          className="mb-16"
        >
          <span className="label-tag block mb-4">Features</span>
          <h2 className="font-serif text-[clamp(38px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
            Everything you need.
            <br />
            <em className="squiggle">Nothing you don&apos;t.</em>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-4 grid-rows-4 gap-4 auto-rows-[160px]">
          {cells.map((cell, i) => (
            <motion.div
              key={cell.id}
              className={`${cell.size} rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group cursor-default`}
              style={{ background: cell.bg }}
              initial={{ opacity:0, y:30, scale:0.95 }}
              animate={inView ? { opacity:1, y:0, scale:1 } : {}}
              transition={{ delay:i*0.06, duration:0.7, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-5, scale:1.02, transition:{ duration:0.22 } }}
            >
              {/* Visual element */}
              <Visual type={cell.visual} color={cell.bg} />

              {/* Text */}
              <div>
                <div className="font-semibold text-[#2C2720] text-[15px] leading-snug">{cell.title}</div>
                <div className="text-[12px] text-[#7C7267] mt-0.5">{cell.sub}</div>
              </div>

              {/* Hover overlay glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
