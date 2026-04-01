import dynamic from 'next/dynamic'

const TallyEmbed = dynamic(() => import('./TallyEmbed'), { ssr: false })

export default function CareersPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0e0d0b',
        color: '#F5F0E8',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 96px) 24px 48px',
        }}
      >
        {/* Back link */}
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#4A4540',
            textDecoration: 'none',
            marginBottom: '48px',
            letterSpacing: '0.02em',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          back to priorities
        </a>

        {/* Brand */}
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '15px',
            color: '#C17B6B',
            marginBottom: '16px',
            letterSpacing: '0.01em',
          }}
        >
          priorities
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.1,
            color: '#F5F0E8',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          Work at Priorities
        </h1>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#6B6560',
            maxWidth: '480px',
            marginBottom: '12px',
          }}
        >
          We care about 3 things:
        </p>

        {/* 3 value pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {['Talent', 'Ownership', 'Hunger to build'].map((v) => (
            <span
              key={v}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(193,123,107,0.25)',
                color: '#C17B6B',
                fontSize: '13px',
                letterSpacing: '0.03em',
                background: 'rgba(193,123,107,0.06)',
              }}
            >
              {v}
            </span>
          ))}
        </div>

        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#4A4540', maxWidth: '480px' }}>
          No resume required. Just show us what you&apos;ve built and tell us why you care.
        </p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: '1px', background: '#1c1b19' }} />
      </div>

      {/* Tally form — fully client-side, no SSR */}
      <TallyEmbed />

      {/* Footer note */}
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '32px 24px 64px',
          borderTop: '1px solid #1c1b19',
        }}
      >
        <p style={{ fontSize: '12px', color: '#2E2C29', fontStyle: 'italic' }}>
          We read every submission personally. If it feels right, we&apos;ll reach out within a week. ❤️
        </p>
      </div>
    </main>
  )
}
