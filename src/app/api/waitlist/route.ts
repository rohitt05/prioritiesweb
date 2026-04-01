import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

    if (!scriptUrl) {
      console.warn('[waitlist] GOOGLE_APPS_SCRIPT_URL not set — skipping')
      return NextResponse.json({ ok: true, note: 'dev mode — no sheet configured' })
    }

    const payload = JSON.stringify({
      email,
      submittedAt: new Date().toISOString(),
      source: 'website',
    })

    // Apps Script requires following the redirect — the actual doPost
    // runs AFTER the 302, not before it. redirect: 'follow' is correct here.
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      redirect: 'follow',
    })

    const text = await res.text()
    console.log('[waitlist] Apps Script response:', res.status, text)

    // Try to parse JSON response from doPost
    try {
      const json = JSON.parse(text)
      if (json.ok === true) {
        return NextResponse.json({ ok: true })
      }
      // doPost returned { ok: false, error: '...' }
      console.error('[waitlist] doPost error:', json.error)
      return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })
    } catch {
      // Non-JSON response — if status is ok-ish treat as success
      if (res.status >= 200 && res.status < 400) {
        return NextResponse.json({ ok: true })
      }
      console.error('[waitlist] unexpected response:', res.status, text)
      return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })
    }

  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
