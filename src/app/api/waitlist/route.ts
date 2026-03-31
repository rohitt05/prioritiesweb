import { NextRequest, NextResponse } from 'next/server'

// -------------------------------------------------------
// Waitlist API — Google Apps Script webhook
// No SDK, no service account, no credit card.
//
// ENV VAR needed in .env.local + Vercel dashboard:
//   GOOGLE_APPS_SCRIPT_URL
//   e.g. https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
// -------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

    if (!scriptUrl) {
      // Dev mode — no sheet configured yet, still return ok so form works
      console.warn('[waitlist] GOOGLE_APPS_SCRIPT_URL not set — skipping sheet write')
      return NextResponse.json({ ok: true, note: 'dev mode' })
    }

    const res = await fetch(scriptUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        email,
        submittedAt: new Date().toISOString(),
        source: 'website',
      }),
      // Apps Script redirects — follow them
      redirect: 'follow',
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[waitlist] Apps Script error:', text)
      return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
