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

        <div className="prose prose-stone max-w-none text-[#4A4540] leading-relaxed space-y-8">

          <Section title="1. Who We Are">
            <p>Priorities (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a private social networking app built for intimate, close-knit connections. We are based in India. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the &ldquo;Service&rdquo;).</p>
            <p>If you have questions, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a>.</p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">2.1 Information you provide</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account details: name, username, email address, phone number, date of birth</li>
              <li>Profile information: avatar, bio, partner connections</li>
              <li>Content you create: Films (photos/videos), voice notes, messages, priority lists</li>
              <li>Waitlist sign-up email address</li>
            </ul>
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">2.2 Information collected automatically</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Device information: model, OS version, unique device identifiers</li>
              <li>Usage data: features used, time spent, interactions</li>
              <li>Log data: IP address, browser type, pages visited, timestamps</li>
              <li>Camera and microphone access (only when you actively use these features)</li>
            </ul>
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">2.3 Information from third parties</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Authentication providers if you use social login (Google, Apple)</li>
              <li>Analytics providers (aggregated, anonymised data only)</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, operate, and maintain the Priorities app</li>
              <li>Enable core features: messaging, Films, voice notes, video calls, priority lists</li>
              <li>Send you service-related notifications (not marketing spam)</li>
              <li>Process your waitlist sign-up and notify you at launch</li>
              <li>Improve and personalise the Service</li>
              <li>Detect, prevent, and address technical issues and abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3 font-medium text-[#2C2720]">We do not sell your personal data. Ever.</p>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>We do not sell, trade, or rent your personal data to third parties. We may share information only in these limited cases:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>With your 9 Priorities:</strong> Content you share is visible only to people you explicitly add as priorities</li>
              <li><strong>Service providers:</strong> Hosting (Supabase), analytics, and infrastructure partners under strict data processing agreements</li>
              <li><strong>Legal requirements:</strong> If required by law, court order, or government authority</li>
              <li><strong>Business transfers:</strong> In the event of a merger or acquisition, your data will remain protected under this policy</li>
            </ul>
          </Section>

          <Section title="5. Data Storage & Security">
            <p>Your data is stored on secure servers provided by Supabase (PostgreSQL). We use industry-standard security measures including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Encryption in transit (TLS/HTTPS) and at rest</li>
              <li>Row-Level Security (RLS) policies ensuring you only access your own data</li>
              <li>Regular security audits and access controls</li>
            </ul>
            <p>No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
          </Section>

          <Section title="6. Media & Content Retention">
            <p><strong>Films (Stories):</strong> Content posted as a Film is automatically deleted after 24 hours from our servers.</p>
            <p><strong>Messages & Voice Notes:</strong> Stored securely and accessible only to conversation participants. You may delete your content at any time from within the app.</p>
            <p><strong>Profile data:</strong> Retained until you delete your account.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain types of processing</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent, withdraw it at any time</li>
            </ul>
            <p>To exercise any right, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>Priorities is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us personal information, we will delete it immediately.</p>
            <p>Users under 18 require parental consent to use the Service.</p>
          </Section>

          <Section title="9. Cookies & Tracking">
            <p>Our website uses cookies and similar tracking technologies. Please see our <Link href="/cookies" className="text-[#C17B6B] hover:underline">Cookie Policy</Link> for full details.</p>
          </Section>

          <Section title="10. Third-Party Links">
            <p>Our Service may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or an in-app notification. The &ldquo;Effective date&rdquo; at the top will always reflect the latest version.</p>
          </Section>

          <Section title="12. Contact Us">
            <p>For privacy-related questions or requests:</p>
            <ul className="list-none space-y-1">
              <li>📧 <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a></li>
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
