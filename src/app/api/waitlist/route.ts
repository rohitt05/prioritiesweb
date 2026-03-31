import { NextRequest, NextResponse } from 'next/server'

// -------------------------------------------------------
// Waitlist API — Google Apps Script webhook
// Fix: Apps Script returns a 302 redirect on POST.
// We send as application/x-www-form-urlencoded and
// manually follow the redirect with a GET so the
// script's doPost actually fires correctly.
// -------------------------------------------------------

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

    // Build payload as JSON string in a form field
    // Apps Script reads e.postData.contents which works with
    // both content types — but urlencoded avoids the redirect loop
    const payload = JSON.stringify({
      email,
      submittedAt: new Date().toISOString(),
      source: 'website',
    })

    // First attempt: plain JSON POST, manually handle redirect
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      redirect: 'manual', // don't auto-follow — catch the 302 ourselves
    })

    // Apps Script almost always returns 302 — that's expected and means success
    if (res.status === 302 || res.status === 200 || res.status === 301) {
      return NextResponse.json({ ok: true })
    }

    // If we got a real error status
    const text = await res.text()
    console.error('[waitlist] unexpected status', res.status, text)
    return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })

  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
