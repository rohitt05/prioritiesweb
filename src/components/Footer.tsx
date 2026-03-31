'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF4D6D, #C77DFF)' }}
            >
              <Heart size={13} fill="white" color="white" />
            </div>
            <span className="font-display font-bold">Priorities</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#waitlist" className="hover:text-white transition-colors">Waitlist</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="w-9 h-9 rounded-xl card-glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Instagram size={16} />
            </motion.a>
            <motion.a
              href="#"
              className="w-9 h-9 rounded-xl card-glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Twitter size={16} />
            </motion.a>
          </div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs text-white/20">
            © 2026 Priorities. All rights reserved.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Built with <Heart size={10} className="text-brand-rose" fill="#FF4D6D" /> for love, by Rohit
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
