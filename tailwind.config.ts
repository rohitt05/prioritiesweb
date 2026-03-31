import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        primary:    '#433D35',
        secondary:  '#A89F8D',
        accent:     '#D4A373',
        bg:         '#FDFCF0',
        surface:    '#FFFFFF',
        surfaceLight:'#F7F4E9',
        ink:        '#2C2720',
        inkFaded:   '#7C7267',
        border:     'rgba(67,61,53,0.10)',
        sage:       '#82937D',
        sand:       '#DDB892',
        // palette bubbles
        padua:      '#A8E6CF',
        romantic:   '#FFD4B8',
        azalea:     '#FAD1D8',
        prelude:    '#DBC0E7',
        jaggedIce:  '#C9E6EE',
        chromeWhite:'#DDEDC4',
        pineGlade:  '#B8C88D',
        raffia:     '#E9DFB4',
        wildWater:  '#FF667D',
        petalPink:  '#FEC8D8',
        lilacMist:  '#C0AEDE',
        sugarPink:  '#FFC8DD',
        skySoft:    '#B6E3F4',
        butterGlow: '#FFF2CC',
        coralBlush: '#FF9A9E',
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float-slow':  'floatSlow 7s ease-in-out infinite',
        'float-med':   'floatMed 5s ease-in-out infinite',
        'float-fast':  'floatFast 4s ease-in-out infinite',
        'squiggle':    'squiggle 2s ease-in-out infinite',
        'drift':       'drift 12s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-16px) rotate(3deg)' },
        },
        floatMed: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-10px) rotate(-2deg)' },
        },
        floatFast: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        squiggle: {
          '0%,100%': { transform: 'scaleX(1)' },
          '50%':     { transform: 'scaleX(1.05)' },
        },
        drift: {
          '0%':    { transform: 'translate(0,0) rotate(0deg)' },
          '25%':   { transform: 'translate(8px,-12px) rotate(2deg)' },
          '50%':   { transform: 'translate(-6px,-20px) rotate(-1deg)' },
          '75%':   { transform: 'translate(-12px,-8px) rotate(3deg)' },
          '100%':  { transform: 'translate(0,0) rotate(0deg)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
export default config
