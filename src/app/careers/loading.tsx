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
        <div style={{ width: 120, height: 14, borderRadius: 6, background: '#1c1b19', marginBottom: 48 }} />

        {/* Brand skeleton */}
        <div style={{ width: 72, height: 14, borderRadius: 6, background: '#1c1b19', marginBottom: 20 }} />

        {/* Heading skeleton */}
        <div style={{ width: '70%', height: 52, borderRadius: 8, background: '#1c1b19', marginBottom: 20 }} />

        {/* Subtext skeleton */}
        <div style={{ width: 180, height: 14, borderRadius: 6, background: '#1c1b19', marginBottom: 16 }} />

        {/* Pills skeleton */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
          {[72, 90, 120].map((w, i) => (
            <div key={i} style={{ width: w, height: 32, borderRadius: 999, background: '#1c1b19' }} />
          ))}
        </div>

        {/* Body text skeleton */}
        <div style={{ width: '90%', height: 12, borderRadius: 6, background: '#1c1b19', marginBottom: 10 }} />
        <div style={{ width: '75%', height: 12, borderRadius: 6, background: '#1c1b19' }} />
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: '#1c1b19' }} />
      </div>

      {/* Form skeleton */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px 0' }}>
        {[['30%', 40], ['50%', 40], ['100%', 100], ['40%', 40]].map(([w, h], i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <div style={{ width: '30%', height: 12, borderRadius: 6, background: '#1c1b19', marginBottom: 10 }} />
            <div style={{ width: w as string, height: h as number, borderRadius: 8, background: '#1c1b19' }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { opacity: 0.4; }
          50%  { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        main > * > div[style] { animation: shimmer 1.6s ease-in-out infinite; }
      `}</style>
    </main>
  )
}
