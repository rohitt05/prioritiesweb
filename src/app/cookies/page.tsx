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

        {/* Short and honest summary */}
        <div className="bg-[#F5F0E8] border border-[#E0DAD0] rounded-xl px-6 py-5 mb-12">
          <p className="text-[15px] text-[#2C2720] leading-relaxed font-medium">
            We use a minimal number of cookies — only what is necessary to make the site work and understand basic usage patterns. We do not use advertising cookies. We do not track you across other websites.
          </p>
        </div>

        <div className="prose prose-stone max-w-none text-[#4A4540] leading-relaxed space-y-8">

          <Section title="1. What Cookies Are">
            <p>Cookies are small text files that a website stores on your device. They help the site remember who you are between page loads, understand how people use the site, and work correctly.</p>
            <p>This policy also covers similar technologies such as session storage and pixel tags, where applicable.</p>
          </Section>

          <Section title="2. Cookies We Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-[#F3EFE8]">
                    <th className="text-left px-3 py-2 font-semibold text-[#2C2720] border border-[#E0DAD0]">Type</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#2C2720] border border-[#E0DAD0]">Purpose</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#2C2720] border border-[#E0DAD0]">Required?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Essential</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Session management and basic site security. The site cannot function without these.</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Yes — always on</td>
                  </tr>
                  <tr className="bg-[#FDFCF9]">
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Functional</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Remembering your preferences so you don&apos;t have to reset them on every visit.</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Optional — you can opt out</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Analytics</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Understanding which pages people visit and how they navigate. All data is anonymised and aggregated — no individual is identified.</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Optional — you can opt out</td>
                  </tr>
                  <tr className="bg-[#FDFCF9]">
                    <td className="px-3 py-2 border border-[#E0DAD0] font-medium">Advertising</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">We do <strong>not</strong> use advertising or retargeting cookies of any kind.</td>
                    <td className="px-3 py-2 border border-[#E0DAD0]">Not applicable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. How to Control Cookies">
            <p>You are always in control. You can manage or delete cookies at any time through your browser settings:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#C17B6B] hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-3">Note: disabling essential cookies may prevent parts of the site from working correctly.</p>
          </Section>

          <Section title="4. Do Not Track">
            <p>Some browsers send a &ldquo;Do Not Track&rdquo; signal. We currently do not alter our behaviour in response to this signal — but because we do not use advertising or cross-site tracking cookies, the practical impact on your privacy is minimal.</p>
          </Section>

          <Section title="5. Updates">
            <p>If we change how we use cookies in a meaningful way, we will update this policy and revise the &ldquo;Effective date&rdquo; at the top. We will not silently expand our cookie usage.</p>
          </Section>

          <Section title="6. Questions">
            <p>If you have questions about how we use cookies:</p>
            <ul className="list-none space-y-2 mt-2">
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
