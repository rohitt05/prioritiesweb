'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import PhoneMockup from '@/components/PhoneMockup'
import AudienceSection from '@/components/AudienceSection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'
import FloatingOrbs from '@/components/FloatingOrbs'

export default function Home() {
  return (
    <main className="relative noise">
      <FloatingOrbs />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <PhoneMockup />
      <AudienceSection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
