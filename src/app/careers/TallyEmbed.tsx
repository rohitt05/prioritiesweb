'use client'

export default function TallyEmbed() {
  return (
    <div style={{ width: '100%', minHeight: '700px' }}>
      <iframe
        src="https://tally.so/embed/MeYzLp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="800"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Work at Priorities — Application Form"
        style={{
          display: 'block',
          width: '100%',
          border: 'none',
          background: 'transparent',
        }}
      />
    </div>
  )
}
