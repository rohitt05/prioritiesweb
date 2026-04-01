'use client'

import Navbar              from '@/components/Navbar'
import HeroSection         from '@/components/HeroSection'
import MarqueeBand         from '@/components/MarqueeBand'
import FilmsSection        from '@/components/FilmsSection'
import CinematicSection    from '@/components/CinematicSection'
import PriorityCarousel    from '@/components/PriorityCarousel'
import TimelineSection     from '@/components/TimelineSection'
import BentoFeatures       from '@/components/BentoFeatures'
import PositioningSection  from '@/components/PositioningSection'
import AudienceSection     from '@/components/AudienceSection'
import WaitlistSection     from '@/components/WaitlistSection'
import Footer              from '@/components/Footer'

export default function Home() {
  return (
    // NO overflow-x-hidden on main — it breaks position:sticky
    // overflow clipping is handled per-section instead
    <main className="relative bg-[#FDFCF0] paper">
      <div className="overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <MarqueeBand />
        <FilmsSection />
      </div>
      {/* CinematicSection must NOT be inside an overflow:hidden parent */}
      <CinematicSection />
      <div className="overflow-x-hidden">
        <PriorityCarousel />
        <TimelineSection />
        <BentoFeatures />
        <PositioningSection />
        <AudienceSection />
        <WaitlistSection />
        <Footer />
      </div>
    </main>
  )
}
