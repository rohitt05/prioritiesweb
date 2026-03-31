import { NextRequest, NextResponse } from 'next/server'

// -------------------------------------------------------
// Google Sheets Waitlist API
// Uses the Google Sheets REST API (no SDK needed)
//
// ENV VARS needed in .env.local AND Vercel/hosting dashboard:
//   GOOGLE_SHEETS_SPREADSHEET_ID   — the ID from the sheet URL
//   GOOGLE_SERVICE_ACCOUNT_EMAIL   — service account email
//   GOOGLE_PRIVATE_KEY             — service account private key (with \n)
// -------------------------------------------------------

async function getAccessToken(): Promise<string> {
  const email      = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
  const rawKey     = process.env.GOOGLE_PRIVATE_KEY!
  const privateKey = rawKey.replace(/\\n/g, '\n')

  const now = Math.floor(Date.now() / 1000)
  const header  = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss:   email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud:   'https://oauth2.googleapis.com/token',
    iat:   now,
    exp:   now + 3600,
  }

  // Base64url encode
  const enc = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url')

  const signingInput = `${enc(header)}.${enc(payload)}`

  // Sign with RSA-SHA256 using WebCrypto
  const keyData = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')
  const binaryKey  = Buffer.from(keyData, 'base64')
  const cryptoKey  = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sigBuffer  = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(signingInput),
  )
  const signature  = Buffer.from(sigBuffer).toString('base64url')
  const jwt        = `${signingInput}.${signature}`

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion:  jwt,
    }),
  })
  const tokenData = await tokenRes.json()
  return tokenData.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    if (!spreadsheetId) {
      // If not configured yet, still succeed silently (dev mode)
      console.warn('[waitlist] GOOGLE_SHEETS_SPREADSHEET_ID not set — skipping sheet write')
      return NextResponse.json({ ok: true, note: 'dev mode — no sheet configured' })
    }

    const accessToken = await getAccessToken()
    const range       = 'Priorities Waitlist!A:C'
    const values      = [[email, new Date().toISOString(), 'website']]

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method:  'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      },
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('[waitlist] Sheets API error:', err)
      return NextResponse.json({ error: 'Sheet write failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
