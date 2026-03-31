import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Priorities — For the people who matter most',
  description: 'A private social space built for your closest connections. No algorithm. No audience. Just the people who matter.',
  keywords: ['private social app', 'close friends app', 'long distance relationship app', 'intimate social network'],
  openGraph: {
    title: 'Priorities — For the people who matter most',
    description: 'A private social space built for your closest connections.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-dark text-white antialiased">
        {children}
      </body>
    </html>
  )
}
