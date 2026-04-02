import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Priorities',
  description: 'How Priorities collects, uses, and protects your personal information.',
}

const EFFECTIVE_DATE = 'April 1, 2026'
const CONTACT_EMAIL = 'privacy@getpriorities.app'

export default function PrivacyPolicy() {
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
          <h1 className="font-serif text-[42px] font-bold text-[#2C2720] leading-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#8A8278]">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        {/* Trust statement */}
        <div className="bg-[#F5F0E8] border border-[#E0DAD0] rounded-xl px-6 py-5 mb-12">
          <p className="text-[15px] text-[#2C2720] leading-relaxed font-medium">
            Priorities is built on the premise that your closest relationships deserve privacy. We collect only what we need, we never sell your data, and we design every feature with your safety in mind. This policy explains exactly how.
          </p>
        </div>

        <div className="prose prose-stone max-w-none text-[#4A4540] leading-relaxed space-y-8">

          <Section title="1. Who We Are">
            <p>Priorities is a private social networking app built for intimate, close-knit connections. We are based in India and operate under Indian law. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our mobile application and website (collectively, the &ldquo;Service&rdquo;).</p>
            <p>Questions? Reach us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a>.</p>
          </Section>

          <Section title="2. What We Collect">
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">2.1 What you give us</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account details: name, username, email address, phone number, date of birth, gender</li>
              <li>Profile information: avatar, bio, partner connections</li>
              <li>Content you create: Films (photos/videos), voice notes, messages, priority lists</li>
              <li>Your email address when you join our waitlist</li>
            </ul>
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">2.2 What we collect automatically</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Device information: model, OS version, unique identifiers</li>
              <li>Usage data: features used, session duration, interactions</li>
              <li>Log data: IP address, browser type, pages visited, timestamps</li>
              <li>Camera and microphone — only when you actively use those features, never in the background</li>
            </ul>
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">2.3 From third parties</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>If you sign in with Google or Apple, we receive basic profile data from those providers</li>
              <li>Aggregated, anonymised analytics data from our infrastructure providers</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Deliver and operate the Priorities app and all its features</li>
              <li>Send you service notifications — never unsolicited marketing</li>
              <li>Contact you when Priorities launches (waitlist only)</li>
              <li>Improve, personalise, and fix bugs in the Service</li>
              <li>Detect and prevent abuse, fraud, and security threats</li>
              <li>Meet our legal obligations under applicable law</li>
            </ul>
            <div className="mt-4 bg-[#F5F0E8] border border-[#E0DAD0] rounded-lg px-4 py-3">
              <p className="font-semibold text-[#2C2720]">We do not sell your personal data. We never have and we never will.</p>
            </div>
          </Section>

          <Section title="4. Who We Share It With">
            <p>We share your data only in these specific, limited situations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Your 9 Priorities:</strong> Content you share is visible exclusively to people you have added — no one else</li>
              <li><strong>Infrastructure providers:</strong> Supabase (database and storage), subject to strict data processing agreements and bound by GDPR-equivalent standards</li>
              <li><strong>Legal obligations:</strong> Only when required by Indian law, a valid court order, or a government authority</li>
              <li><strong>Business continuity:</strong> In the event of a merger or acquisition, your data rights under this policy remain fully intact and binding on any successor entity</li>
            </ul>
            <p className="mt-3">That&apos;s the complete list. No advertising networks. No data brokers. No &ldquo;partners&rdquo; with hidden purposes.</p>
          </Section>

          <Section title="5. How We Protect Your Data">
            <p>We take security seriously and have built protection in at every layer:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Encryption in transit:</strong> All data transmitted between your device and our servers uses TLS 1.2 or higher</li>
              <li><strong>Encryption at rest:</strong> Your data is encrypted at the database level on Supabase-managed PostgreSQL infrastructure</li>
              <li><strong>Row-Level Security (RLS):</strong> Database policies ensure each user can only access their own data — this is enforced at the database level, not just the application layer</li>
              <li><strong>Access controls:</strong> Strict internal access controls mean only essential personnel can access production systems</li>
              <li><strong>Regular audits:</strong> We conduct security reviews and act promptly on vulnerabilities</li>
            </ul>
            <p className="mt-3">We hold ourselves to a high standard and continuously improve our security practices as the product grows.</p>
          </Section>

          <Section title="6. Content & Retention">
            <p><strong>Messages & Voice Notes:</strong> Stored securely and accessible only to the conversation participants. You can delete any message from within the app at any time.</p>
            <p><strong>Profile data:</strong> Retained while your account is active. Deleted within 30 days of account deletion.</p>
            <p><strong>Waitlist emails:</strong> Used solely to notify you at launch. You can unsubscribe at any time.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have full control over your data. At any time, you can:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Access:</strong> Request a complete copy of the personal data we hold about you</li>
              <li><strong>Correct:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Delete:</strong> Request permanent deletion of your account and all associated data</li>
              <li><strong>Export:</strong> Request your data in a portable, machine-readable format</li>
              <li><strong>Restrict:</strong> Ask us to limit how we process your data in certain circumstances</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent, you can withdraw it at any time without affecting prior lawful processing</li>
            </ul>
            <p className="mt-3">Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a> and we will respond within 30 days. No bureaucracy, no runaround.</p>
          </Section>

          <Section title="8. Children">
            <p>Priorities is not intended for children under 13. We do not knowingly collect data from anyone under 13. If we discover this has occurred, we delete the data immediately and close the account.</p>
            <p>Users between 13 and 18 must have verifiable parental consent to use the Service.</p>
          </Section>

          <Section title="9. Cookies">
            <p>Our website uses a minimal set of cookies. See our <Link href="/cookies" className="text-[#C17B6B] hover:underline">Cookie Policy</Link> for the full details — it&apos;s short and plain-English.</p>
          </Section>

          <Section title="10. International Users">
            <p>Priorities is operated from India. If you access the Service from outside India, your data will be transferred to and processed in India. By using the Service, you consent to this transfer. We apply the same privacy protections regardless of where you are located.</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>If we make material changes to this policy, we will notify you by email and via an in-app notice at least 14 days before changes take effect. The &ldquo;Effective date&rdquo; at the top will always show the current version. For minor changes (grammar, clarity), we may update without advance notice.</p>
          </Section>

          <Section title="12. Contact">
            <p>We&apos;re real people and we respond personally.</p>
            <ul className="list-none space-y-2 mt-2">
              <li>📧 Privacy: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a></li>
              <li>📧 General: <a href="mailto:hello@getpriorities.app" className="text-[#C17B6B] hover:underline">hello@getpriorities.app</a></li>
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
