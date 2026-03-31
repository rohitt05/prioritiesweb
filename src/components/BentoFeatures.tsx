'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cells = [
  { id:'priority', size:'col-span-2 row-span-2', bg:'#FAD1D8', title:'Priority List', sub:'Pinned · Always on top',      visual:'bubbles'  },
  { id:'films',    size:'col-span-1 row-span-1', bg:'#C9E6EE', title:'Films',          sub:'Your day, archived',           visual:'grid'     },
  { id:'audio',    size:'col-span-1 row-span-1', bg:'#DBC0E7', title:'Audio Notes',    sub:'Your voice, delivered',        visual:'waveform' },
  { id:'private',  size:'col-span-1 row-span-1', bg:'#A8E6CF', title:'Fully Private',  sub:'No algorithm. No strangers.',  visual:'lock'     },
  { id:'call',     size:'col-span-1 row-span-1', bg:'#FFD4B8', title:'Calls',           sub:'Voice & Video built-in',       visual:'call'     },
  { id:'timeline', size:'col-span-2 row-span-1', bg:'#E9DFB4', title:'Timeline',        sub:'Scroll back through your story', visual:'timeline' },
  { id:'reactions',size:'col-span-1 row-span-1', bg:'#FEC8D8', title:'Reactions',       sub:'Warm & personal',              visual:'emojis'   },
  { id:'dots',     size:'col-span-1 row-span-1', bg:'#B6E3F4', title:'Bubble Map',      sub:'Your day, visualised',         visual:'dots'     },
]

function Visual({ type }: { type: string }) {
  if (type === 'bubbles') return (
    <div className="flex gap-2 mt-4 items-end">
      {['#FAD1D8','#DBC0E7','#C9E6EE','#A8E6CF'].map((c,i) => (
        <motion.div key={i} className="rounded-full border-2 border-white"
          style={{ width:24+i*10, height:24+i*10, background:c }}
          animate={{ y:[0,-6,0] }}
          transition={{ delay:i*0.18, duration:2.8+i*0.3, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
  if (type === 'grid') return (
    <div className="grid grid-cols-2 gap-1.5 mt-4 w-16 sm:w-20">
      {['#C9E6EE','#FFD4B8','#FAD1D8','#B8C88D'].map((c,i) => (
        <motion.div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl" style={{ background:c }}
          animate={{ scale:[1,1.07,1] }}
          transition={{ delay:i*0.2, duration:2.5, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
  if (type === 'waveform') return (
    <div className="flex items-end gap-1 mt-4 h-8 sm:h-10">
      {[0.4,0.7,1,0.6,0.9,0.5,0.8,0.4,0.6,1,0.7,0.3].map((h,i) => (
        <motion.div key={i} className="w-1 sm:w-1.5 rounded-full bg-[#7C7267]"
          style={{ height:`${h*100}%` }}
          animate={{ scaleY:[1,h>0.7?1.35:0.65,1] }}
          transition={{ delay:i*0.07, duration:1.1, repeat:Infinity, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
  if (type === 'lock') return (
    <motion.div className="text-4xl sm:text-5xl mt-4"
      animate={{ rotate:[0,-6,6,0], scale:[1,1.1,1] }}
      transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
    >🔒</motion.div>
  )
  if (type === 'call') return (
    <div className="flex gap-2 sm:gap-3 mt-4">
      {['🎬','📞'].map(e => (
        <motion.div key={e} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 flex items-center justify-center text-xl sm:text-2xl shadow-sm"
          animate={{ scale:[1,1.07,1] }}
          transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}
        >{e}</motion.div>
      ))}
    </div>
  )
  if (type === 'timeline') return (
    <div className="flex items-center gap-1.5 sm:gap-2 mt-4 flex-wrap">
      {['Mar 30','Mar 29','Mar 28','Mar 27'].map((d,i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#433D35] opacity-50" />
          <span className="text-[10px] sm:text-[11px] font-medium text-[#433D35]">{d}</span>
          {i < 3 && <div className="w-3 sm:w-5 h-px bg-[rgba(67,61,53,0.2)]" />}
        </div>
      ))}
    </div>
  )
  if (type === 'emojis') return (
    <div className="flex gap-1.5 sm:gap-2 mt-4">
      {['🫶','😍','✨','💬'].map((e,i) => (
        <motion.span key={i} className="text-xl sm:text-2xl"
          animate={{ y:[0,-5,0], rotate:[0,8,-8,0] }}
          transition={{ delay:i*0.15, duration:2.3, repeat:Infinity, ease:'easeInOut' }}
        >{e}</motion.span>
      ))}
    </div>
  )
  if (type === 'dots') return (
    <div className="relative w-20 sm:w-24 h-14 sm:h-16 mt-4">
      {[{s:16,c:'#FAD1D8',t:'0%',l:'10%'},{s:12,c:'#DBC0E7',t:'20%',l:'40%'},{s:20,c:'#C9E6EE',t:'40%',l:'5%'},{s:14,c:'#A8E6CF',t:'10%',l:'65%'},{s:10,c:'#FFD4B8',t:'55%',l:'55%'}].map((b,i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width:b.s, height:b.s, background:b.c, top:b.t, left:b.l }}
          animate={{ y:[0,-5,0] }}
          transition={{ delay:i*0.22, duration:3, repeat:Infinity, ease:'easeInOut' }}
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
    <section id="features" ref={ref} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-[#F7F4E9]">
      <div className="max-w-5xl mx-auto">
        <div className="overflow-hidden mb-12 sm:mb-16">
          <motion.div
            initial={{ y: 100, skewY: 3, opacity: 0 }}
            animate={inView ? { y: 0, skewY: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-tag block mb-4">Features</span>
            <h2 className="font-serif text-[clamp(34px,6vw,72px)] font-bold text-[#2C2720] leading-[0.92] tracking-tight">
              Everything you need.
              <br />
              <em className="squiggle">Nothing you don&apos;t.</em>
            </h2>
          </motion.div>
        </div>

        {/* Bento — responsive: 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[130px] sm:auto-rows-[160px]">
          {cells.map((cell, i) => {
            const dirs = [{ x:-40, y:-40 }, { x:40, y:-40 }, { x:40, y:40 }, { x:-40, y:40 }]
            const dir  = dirs[i % 4]
            // On mobile collapse the big 2x2 to 2x1
            const mobileSize = cell.size.includes('row-span-2')
              ? 'col-span-2 row-span-1 sm:' + cell.size
              : 'col-span-1 sm:' + cell.size
            return (
              <motion.div
                key={cell.id}
                className={`${mobileSize} rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden relative group cursor-default`}
                style={{ background: cell.bg }}
                initial={{ opacity:0, x:dir.x, y:dir.y, scale:0.9 }}
                animate={inView ? { opacity:1, x:0, y:0, scale:1 } : {}}
                transition={{ delay:i*0.07, duration:0.75, ease:[0.16,1,0.3,1] }}
                whileHover={{ y:-5, scale:1.025, transition:{ duration:0.22 } }}
              >
                <Visual type={cell.visual} />
                <div>
                  <div className="font-semibold text-[#2C2720] text-[13px] sm:text-[15px] leading-snug">{cell.title}</div>
                  <div className="text-[11px] sm:text-[12px] text-[#7C7267] mt-0.5">{cell.sub}</div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                  style={{ background:'rgba(255,255,255,0)' }}
                  whileHover={{ background:'rgba(255,255,255,0.1)' }}
                  transition={{ duration:0.3 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
