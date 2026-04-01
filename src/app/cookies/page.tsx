import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — Priorities',
  description: 'How Priorities uses cookies and similar tracking technologies.',
}

const EFFECTIVE_DATE = 'April 1, 2026'
const CONTACT_EMAIL = 'privacy@getpriorities.app'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      <header className="sticky top-0 z-50 bg-[#FDFCF0]/90 backdrop-blur-sm border-b border-[#E8E2D6] px-5 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif italic text-[22px] font-bold text-[#2C2720]">priorities</Link>
          <Link href="/" className="text-sm text-[#8A8278] hover:text-[#2C2720] transition-colors">← Back to home</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C17B6B] block mb-3">Legal</span>
          <h1 className="font-serif text-[42px] font-bold text-[#2C2720] leading-tight mb-3">Cookie Policy</h1>
          <p className="text-sm text-[#8A8278]">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-stone max-w-none text-[#4A4540] leading-relaxed space-y-8">

          <Section title="1. What Are Cookies">
            <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences, understanding how you use our site, and keeping you signed in.</p>
            <p>Similar technologies include local storage, session storage, and pixel tags — this policy covers all of these.</p>
          </Section>

          <Section title="2. Cookies We Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-[#F3EFE8]">
                    <th className="text-left px-3 py-2 font-semibold text-[#2C2720] border border-[#E0DAD0]">Category</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#2C2720] border border-[#E0DAD0]">Purpose</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#2C2720] border border-[#E0DAD0]">Can opt out?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Essential</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Required for the site to function — session management, security tokens, load balancing</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">No (required)</td>
                  </tr>
                  <tr className="bg-[#FDFCF9]">
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Functional</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Remember your preferences like theme and last-visited section</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Analytics</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Understand how visitors use our site. Data is anonymised and aggregated — no personal information is stored.</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Yes</td>
                  </tr>
                  <tr className="bg-[#FDFCF9]">
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Marketing</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">We currently do <strong>not</strong> use marketing or advertising cookies.</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. Managing Cookies">
            <p>You can control and delete cookies through your browser settings. Note that disabling essential cookies may affect site functionality.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Apple Safari</a></li>
            </ul>
          </Section>

          <Section title="4. Do Not Track">
            <p>Some browsers transmit &ldquo;Do Not Track&rdquo; signals. Our website currently does not respond to these signals, but we minimise tracking to anonymised and aggregated analytics only.</p>
          </Section>

          <Section title="5. Updates to This Policy">
            <p>We may update this Cookie Policy periodically. When we do, we will revise the &ldquo;Effective date&rdquo; at the top.</p>
          </Section>

          <Section title="6. Contact">
            <p>Questions about our cookie practices?</p>
            <ul className="list-none space-y-1">
              <li>📧 <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a></li>
            </ul>
          </Section>

        </div>
      </main>

      <LegalFooter />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[20px] font-bold text-[#2C2720] mb-3 mt-2">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function LegalFooter() {
  return (
    <footer className="border-t border-[#E8E2D6] mt-16 py-8 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89F8D]">
        <p>© {new Date().getFullYear()} Priorities. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-[#2C2720] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#2C2720] transition-colors">Terms</Link>
          <Link href="/cookies" className="hover:text-[#2C2720] transition-colors">Cookies</Link>
          <Link href="/" className="hover:text-[#2C2720] transition-colors">Home</Link>
        </div>
      </div>
    </footer>
  )
}
