import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers — Priorities',
  description: "We care about 3 things: talent, ownership, and the hunger to build. If that's you — say hello.",
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
