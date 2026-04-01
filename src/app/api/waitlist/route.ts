import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('\n====== [waitlist] POST hit ======')

  try {
    const body = await req.json()
    console.log('[waitlist] body received:', body)

    const { email } = body

    if (!email || !email.includes('@')) {
      console.log('[waitlist] invalid email:', email)
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    console.log('[waitlist] scriptUrl:', scriptUrl ? scriptUrl.slice(0, 60) + '...' : 'UNDEFINED — env not loaded!')

    if (!scriptUrl) {
      console.warn('[waitlist] ⚠️  GOOGLE_APPS_SCRIPT_URL is not set — check .env.local')
      return NextResponse.json({ ok: true, note: 'dev mode — no sheet configured' })
    }

    const payload = JSON.stringify({
      email,
      submittedAt: new Date().toISOString(),
      source: 'website',
    })
    console.log('[waitlist] sending payload:', payload)

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      redirect: 'follow',
    })

    const text = await res.text()
    console.log('[waitlist] Apps Script status:', res.status)
    console.log('[waitlist] Apps Script response:', text)

    try {
      const json = JSON.parse(text)
      if (json.ok === true) {
        console.log('[waitlist] ✅ Sheet write SUCCESS')
        return NextResponse.json({ ok: true })
      }
      console.error('[waitlist] ❌ doPost returned error:', json.error)
      return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })
    } catch {
      if (res.status >= 200 && res.status < 400) {
        console.log('[waitlist] ✅ Non-JSON but ok status — treating as success')
        return NextResponse.json({ ok: true })
      }
      console.error('[waitlist] ❌ unexpected response:', res.status, text)
      return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })
    }

  } catch (err) {
    console.error('[waitlist] ❌ CRASH:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
