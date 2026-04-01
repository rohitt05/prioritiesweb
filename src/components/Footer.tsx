import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1A1814] text-[#9A9589] py-16 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Top row: brand + tagline */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-14">
          <div className="max-w-xs">
            <span className="font-serif italic text-[28px] font-bold text-[#F5F0E8] block mb-2">priorities</span>
            <p className="text-sm leading-relaxed text-[#6B6560]">
              The private social app built for people who actually matter to you.
              9 people. Real moments. No noise.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {/* Product */}
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-3 text-xs tracking-widest uppercase">Product</p>
              <ul className="space-y-2">
                <li><a href="/#about" className="hover:text-[#F5F0E8] transition-colors">About</a></li>
                <li><a href="/#features" className="hover:text-[#F5F0E8] transition-colors">Features</a></li>
                <li><a href="/#waitlist" className="hover:text-[#F5F0E8] transition-colors">Join Waitlist</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-3 text-xs tracking-widest uppercase">Company</p>
              <ul className="space-y-2">
                <li><a href="mailto:hello@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Contact</a></li>
                <li><a href="mailto:support@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Support</a></li>
                <li><a href="mailto:press@getpriorities.app" className="hover:text-[#F5F0E8] transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[#F5F0E8] font-semibold mb-3 text-xs tracking-widest uppercase">Legal</p>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#F5F0E8] transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-[#F5F0E8] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2C2820] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#5A554F]">
          <p>© {year} Priorities. All rights reserved. Made with 🌸 in India.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-[#9A9589] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#9A9589] transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-[#9A9589] transition-colors">Cookies</Link>
            <a href="mailto:hello@getpriorities.app" className="hover:text-[#9A9589] transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
