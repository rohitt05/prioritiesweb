import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'priorities — for the people who matter most',
  description: 'A private space for your closest connections. Films, memories, and moments — shared only with those who matter.',
  keywords: ['private social app', 'close friends', 'long distance', 'priorities app', 'films of my day'],
  openGraph: {
    title: 'priorities — for the people who matter most',
    description: 'A private space for your closest connections.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
