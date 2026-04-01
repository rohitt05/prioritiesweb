export default function CareersLoading() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0e0d0b',
        color: '#F5F0E8',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 96px) 24px 48px',
        }}
      >
        {/* Back link skeleton */}
        <div style={{
          width: '120px', height: '13px', borderRadius: '6px',
          marginBottom: '48px',
          background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s ease-in-out infinite',
        }} />

        {/* Brand skeleton */}
        <div style={{
          width: '80px', height: '14px', borderRadius: '5px',
          marginBottom: '16px',
          background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s ease-in-out 0.1s infinite',
        }} />

        {/* Heading skeleton */}
        <div style={{
          width: '70%', height: '48px', borderRadius: '8px',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s ease-in-out 0.15s infinite',
        }} />

        {/* Subtext skeleton */}
        <div style={{
          width: '140px', height: '14px', borderRadius: '5px',
          marginBottom: '16px',
          background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s ease-in-out 0.2s infinite',
        }} />

        {/* Pill skeletons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {[80, 100, 150].map((w, i) => (
            <div key={i} style={{
              width: `${w}px`, height: '30px', borderRadius: '999px',
              background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
              backgroundSize: '200% 100%',
              animation: `shimmer 1.6s ease-in-out ${0.25 + i * 0.05}s infinite`,
            }} />
          ))}
        </div>

        {/* Body text skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[90, 70].map((pct, i) => (
            <div key={i} style={{
              width: `${pct}%`, height: '13px', borderRadius: '5px',
              background: 'linear-gradient(90deg, #1e1d1b 25%, #2a2927 50%, #1e1d1b 75%)',
              backgroundSize: '200% 100%',
              animation: `shimmer 1.6s ease-in-out ${0.3 + i * 0.05}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </main>
  )
}
