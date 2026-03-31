# Priorities — Web Landing Page

> **"For the people who matter most."**

This is the official landing/waitlist website for the **Priorities** mobile app — a private social space built for your closest connections.

## Tech Stack

- **Next.js 14** (App Router)
- **Framer Motion 11** — advanced 3D scroll animations, spring physics, stagger reveals
- **Tailwind CSS** — dark theme, custom design tokens
- **TypeScript**
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, fonts, metadata
│   ├── page.tsx         # Page composition
│   └── globals.css      # Design tokens, utility classes
└── components/
    ├── FloatingOrbs.tsx  # Animated background orbs
    ├── Navbar.tsx        # Sticky nav with scroll blur
    ├── HeroSection.tsx   # 3D character-by-character headline
    ├── ProblemSection.tsx
    ├── FeaturesSection.tsx
    ├── PhoneMockup.tsx   # 3D scroll-reactive phone
    ├── AudienceSection.tsx
    ├── WaitlistSection.tsx
    └── Footer.tsx
```

## Features of the Website

- ✨ **3D character animation** on the hero headline (rotateX per character)
- 🌊 **Scroll-driven parallax** on hero and phone mockup
- 🎴 **Floating feature cards** that drift independently
- 📱 **Interactive 3D phone mockup** that rotates with scroll
- 🌟 **Ambient animated orbs** as background
- ✅ **Waitlist form** with animated success state
- 🔮 **Glass morphism** card design throughout
- 🎨 **Custom brand palette** — rose, mauve, purple, dark
