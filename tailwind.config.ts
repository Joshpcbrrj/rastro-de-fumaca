import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050A12',
          900: '#071525',
          800: '#0D2033',
        },
        military: {
          900: '#10150F',
          800: '#28351F',
          700: '#52643A',
        },
        gold: {
          500: '#C7A35A',
          400: '#E0C984',
        },
        paper: {
          100: '#F8F4EA',
          200: '#EEE6D2',
          300: '#D8C9A6',
        },
        steel: {
          700: '#263747',
          500: '#AEB7BD',
        },
      },
      boxShadow: {
        cockpit: '0 24px 80px rgba(0,0,0,0.35)',
        panel: '0 18px 55px rgba(0,0,0,0.18)',
      },
      borderRadius: {
        panel: '22px',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      keyframes: {
        'radar-scan': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'radar-scan': 'radar-scan 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        typing: 'typing 3s steps(40) forwards',
      },
    },
  },
  plugins: [],
}

export default config
