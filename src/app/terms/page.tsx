import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Priorities',
  description: 'The terms and conditions governing your use of the Priorities app.',
}

const EFFECTIVE_DATE = 'April 1, 2026'
const CONTACT_EMAIL = 'legal@getpriorities.app'

export default function TermsOfService() {
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
          <h1 className="font-serif text-[42px] font-bold text-[#2C2720] leading-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-[#8A8278]">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-stone max-w-none text-[#4A4540] leading-relaxed space-y-8">

          <Section title="1. Acceptance of Terms">
            <p>By downloading, installing, or using the Priorities app or website (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use the Service.</p>
            <p>These Terms constitute a legally binding agreement between you and Priorities. We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="2. Eligibility">
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least 13 years of age to use Priorities</li>
              <li>Users under 18 must have parental or guardian consent</li>
              <li>You must provide accurate, current, and complete account information</li>
              <li>You may not use the Service if you are prohibited from doing so by applicable law</li>
            </ul>
          </Section>

          <Section title="3. Your Account">
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use a strong, unique password</li>
              <li>Notify us immediately of any unauthorised use of your account</li>
              <li>Not share your account with any other person</li>
              <li>Not create more than one personal account</li>
            </ul>
          </Section>

          <Section title="4. The Priorities Model — 9 People">
            <p>The core concept of Priorities is that you maintain a maximum of 9 &ldquo;priorities&rdquo; — people who are closest to you. By using the Service, you acknowledge and agree to this fundamental design constraint.</p>
            <p>This limit is intentional and non-negotiable. It is what makes Priorities different from other social apps. We reserve the right to enforce this limit at a technical level.</p>
          </Section>

          <Section title="5. Content & Conduct">
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">5.1 Your content</h3>
            <p>You retain ownership of all content you post on Priorities. By posting content, you grant us a limited, non-exclusive, royalty-free licence to display, store, and transmit your content solely for the purpose of providing the Service.</p>
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">5.2 Prohibited content</h3>
            <p>You agree NOT to post content that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Is illegal, harmful, threatening, abusive, or harassing</li>
              <li>Contains nudity, sexual content involving minors, or graphic violence</li>
              <li>Violates another person&apos;s intellectual property, privacy, or rights</li>
              <li>Is spam, phishing, or malware</li>
              <li>Impersonates any person or entity</li>
              <li>Promotes self-harm, suicide, eating disorders, or dangerous activities</li>
            </ul>
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">5.3 Enforcement</h3>
            <p>We reserve the right to remove content and suspend or terminate accounts that violate these Terms, at our sole discretion and without prior notice.</p>
          </Section>

          <Section title="6. Films (24-Hour Content)">
            <p>&ldquo;Films&rdquo; are photo or video posts that are automatically deleted after 24 hours. While we will delete this content from our servers after 24 hours, we cannot prevent other users from capturing screenshots or recordings. You are responsible for the content you choose to share.</p>
          </Section>

          <Section title="7. Privacy">
            <p>Your use of Priorities is also governed by our <Link href="/privacy" className="text-[#C17B6B] hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. Please read it carefully.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>The Priorities name, logo, app design, and all associated intellectual property are owned by us. You may not reproduce, distribute, modify, or create derivative works without our written permission.</p>
            <p>You retain all rights to content you create. We do not claim ownership of your personal content.</p>
          </Section>

          <Section title="9. Disclaimers">
            <p>THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Any errors or defects will be corrected</li>
              <li>The Service is free of viruses or harmful components</li>
            </ul>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PRIORITIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, PROFITS, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.</p>
            <p>Our total aggregate liability to you shall not exceed the amount you paid us in the 12 months preceding the claim (or INR 1,000 if you have not paid us anything).</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</p>
            <p>If you are located outside India, you consent to the transfer of your data to India and to the application of Indian law to any dispute.</p>
          </Section>

          <Section title="12. Termination">
            <p>You may delete your account at any time from within the app. Upon termination, your content will be deleted from our servers within 30 days (except where retention is required by law).</p>
            <p>We may suspend or terminate your access if you violate these Terms, at our discretion, with or without notice.</p>
          </Section>

          <Section title="13. Changes to Terms">
            <p>We may modify these Terms at any time. We will notify you of significant changes via email or in-app notification at least 14 days before they take effect. Your continued use of the Service after changes take effect constitutes acceptance.</p>
          </Section>

          <Section title="14. Contact">
            <p>For legal inquiries:</p>
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
