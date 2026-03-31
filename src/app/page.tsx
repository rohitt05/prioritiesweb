'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DecoBubbles from '@/components/DecoBubbles'
import FilmsSection from '@/components/FilmsSection'
import PriorityCarousel from '@/components/PriorityCarousel'
import TimelineSection from '@/components/TimelineSection'
import FeaturesSection from '@/components/FeaturesSection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-[#FDFCF0] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FilmsSection />
      <PriorityCarousel />
      <TimelineSection />
      <FeaturesSection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
