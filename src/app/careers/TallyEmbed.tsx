'use client'
import { useState } from 'react'

export default function TallyEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        padding: '48px 24px 0',
        minHeight: '700px',
        position: 'relative',
      }}
    >
      {/* Skeleton — shown until iframe fires onLoad */}
      {!loaded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '8px' }}>
          {/* Section label */}
          <div style={{
            width: '120px', height: '12px', borderRadius: '6px',
            background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s ease-in-out infinite',
          }} />

          {/* Input rows */}
          {[240, 180, 260, 200, 240].map((w, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                width: `${w}px`, height: '11px', borderRadius: '5px',
                background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
                backgroundSize: '200% 100%',
                animation: `shimmer 1.6s ease-in-out ${i * 0.1}s infinite`,
              }} />
              <div style={{
                width: '100%', height: '44px', borderRadius: '10px',
                background: 'linear-gradient(90deg, #1a1918 25%, #242220 50%, #1a1918 75%)',
                backgroundSize: '200% 100%',
                animation: `shimmer 1.6s ease-in-out ${i * 0.1}s infinite`,
                border: '1px solid #222120',
              }} />
            </div>
          ))}

          {/* Textarea */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              width: '200px', height: '11px', borderRadius: '5px',
              background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.6s ease-in-out 0.5s infinite',
            }} />
            <div style={{
              width: '100%', height: '120px', borderRadius: '10px',
              background: 'linear-gradient(90deg, #1a1918 25%, #242220 50%, #1a1918 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.6s ease-in-out 0.5s infinite',
              border: '1px solid #222120',
            }} />
          </div>

          {/* Submit button */}
          <div style={{
            width: '120px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s ease-in-out 0.6s infinite',
          }} />

          <style>{`
            @keyframes shimmer {
              0%   { background-position: -200% 0; }
              100% { background-position:  200% 0; }
            }
          `}</style>
        </div>
      )}

      {/* Actual Tally iframe — invisible until loaded */}
      <iframe
        src="https://tally.so/embed/MeYzLp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="800"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Work at Priorities — Application Form"
        onLoad={() => setLoaded(true)}
        style={{
          display: loaded ? 'block' : 'none',
          width: '100%',
          border: 'none',
          background: 'transparent',
          transition: 'opacity 0.4s ease',
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  )
}
