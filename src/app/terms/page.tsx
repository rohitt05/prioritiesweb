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

        {/* Plain-language summary */}
        <div className="bg-[#F5F0E8] border border-[#E0DAD0] rounded-xl px-6 py-5 mb-12">
          <p className="text-[13px] font-semibold text-[#C17B6B] uppercase tracking-widest mb-2">Plain English Summary</p>
          <ul className="text-[15px] text-[#2C2720] space-y-1 leading-relaxed">
            <li>→ You own your content. We don&apos;t.</li>
            <li>→ Be respectful. Don&apos;t post harmful content.</li>
            <li>→ The 9-person limit is intentional and enforced.</li>
            <li>→ Films are stored on your profile for you and your priorities to revisit.</li>
            <li>→ You can delete your account and all data at any time.</li>
          </ul>
        </div>

        <div className="prose prose-stone max-w-none text-[#4A4540] leading-relaxed space-y-8">

          <Section title="1. Acceptance">
            <p>By downloading, installing, accessing, or using the Priorities app or website (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, please do not use the Service.</p>
            <p>These Terms form a legally binding agreement between you and Priorities. We may update them from time to time — we will always give you 14 days&apos; notice before material changes take effect.</p>
          </Section>

          <Section title="2. Eligibility">
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least 13 years of age to use Priorities</li>
              <li>Users between 13 and 18 require verifiable parental or guardian consent</li>
              <li>You must provide accurate, current, and complete information when creating an account</li>
              <li>You may not use the Service if you are prohibited from doing so under applicable law</li>
            </ul>
          </Section>

          <Section title="3. Your Account">
            <p>You are responsible for your account and everything that happens under it. You agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keep your login credentials confidential</li>
              <li>Notify us immediately at <a href="mailto:hello@getpriorities.app" className="text-[#C17B6B] hover:underline">hello@getpriorities.app</a> if you suspect unauthorised access</li>
              <li>Not share your account with others</li>
              <li>Not create multiple accounts for the same person</li>
            </ul>
          </Section>

          <Section title="4. The Core Concept — 9 Priorities">
            <p>Priorities is built around one deliberate constraint: you can have a maximum of 9 people as your &ldquo;priorities&rdquo; at any time. This is not a bug or a limitation — it is the entire point of the product.</p>
            <p>By using the Service, you accept this design. We enforce the 9-person limit at the technical level. We will not make exceptions.</p>
          </Section>

          <Section title="5. Your Content">
            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">5.1 Ownership</h3>
            <p>You own all content you create and post on Priorities. We do not claim any ownership over your photos, videos, voice notes, messages, or lists.</p>
            <p>By posting content, you grant us a limited, non-exclusive, royalty-free, worldwide licence to store, display, and transmit your content — but only for the purpose of operating the Service for you and your priorities. Nothing more.</p>

            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">5.2 What you may not post</h3>
            <p>You agree not to post content that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Is illegal, threatening, abusive, or harassing under Indian or applicable law</li>
              <li>Contains sexual content involving minors (CSAM) — zero tolerance, reported to authorities immediately</li>
              <li>Infringes another person&apos;s intellectual property, privacy, or dignity</li>
              <li>Is spam, phishing, or contains malware</li>
              <li>Impersonates any real person or entity in a misleading way</li>
              <li>Promotes or glorifies self-harm, suicide, or dangerous activities</li>
            </ul>

            <h3 className="font-semibold text-[#2C2720] mt-4 mb-2">5.3 Enforcement</h3>
            <p>We reserve the right to remove any content and suspend or terminate any account that violates these Terms. For severe violations (CSAM, credible threats), we act immediately and without prior notice. For lesser violations, we aim to warn first.</p>
          </Section>

          <Section title="6. Films">
            <p>&ldquo;Films&rdquo; are photo or video posts you share with your priority circle. Films are stored securely on our servers and are displayed on your Profile Film — a personal archive visible only to you and the people you have added as priorities.</p>
            <p>Films are not automatically deleted. They remain on your profile until you choose to remove them. You can delete any Film from within the app at any time, after which it will be permanently removed from our servers.</p>
            <p>We cannot prevent other users within your priority circle from taking screenshots or screen recordings of your Films. You are responsible for what you choose to share.</p>
          </Section>

          <Section title="7. Privacy">
            <p>Your privacy is fundamental to what Priorities stands for. Our <Link href="/privacy" className="text-[#C17B6B] hover:underline">Privacy Policy</Link> is incorporated into these Terms by reference. Please read it — it is written to be understood, not evaded.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>The Priorities name, logo, app design, interface, and all associated brand assets are our intellectual property. You may not reproduce, copy, modify, or create derivative works without our prior written permission.</p>
            <p>We respect the intellectual property of others. If you believe your work has been used without permission, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a>.</p>
          </Section>

          <Section title="9. Availability & Disclaimers">
            <p>We work hard to keep Priorities running reliably. However, the Service is provided &ldquo;as is&rdquo; and we do not guarantee uninterrupted or error-free operation. We may need to perform maintenance, apply updates, or respond to unexpected technical issues.</p>
            <p>We are not responsible for content posted by users, or for how users interact with each other through the platform.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>To the maximum extent permitted by applicable law, Priorities shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of data, profits, or goodwill — arising out of your use of the Service.</p>
            <p>Our total liability to you shall not exceed the amount you have paid us in the 12 months preceding the claim, or INR 1,000 if you have not made any payment.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by the laws of India. Any disputes arising from or relating to the Service shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</p>
          </Section>

          <Section title="12. Termination">
            <p>You can delete your account at any time from within the app. All your personal data will be permanently deleted from our servers within 30 days — except where retention is specifically required by Indian law.</p>
            <p>We may suspend or terminate accounts that violate these Terms. We will tell you why unless doing so would compromise a legal or security investigation.</p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>We will notify you of material changes by email and in-app notification at least 14 days before they take effect. If you continue using Priorities after changes take effect, you accept the updated Terms. If you disagree with a change, you may delete your account before it takes effect.</p>
          </Section>

          <Section title="14. Contact">
            <p>For legal matters:</p>
            <ul className="list-none space-y-2 mt-2">
              <li>📧 Legal: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C17B6B] hover:underline">{CONTACT_EMAIL}</a></li>
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
