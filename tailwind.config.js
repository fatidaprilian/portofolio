/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Light / warm palette (body sections) ----
        background: '#F5E9D8',
        surface: '#F0DFCA',
        panel: '#EBD7BF',
        text: '#3E2C23',
        muted: '#7B6253',
        accent: {
          DEFAULT: '#A56A43',
          hover: '#8B5637',
          soft: '#C88E66'
        },
        // ---- Dark palette (hero section) ----
        dark: {
          bg: '#0d0b0a',
          surface: '#171311',
          border: 'rgba(255,255,255,0.08)',
          text: '#f0ebe4',
          muted: 'rgba(240,235,228,0.45)',
          accent: '#c88e66',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        editorial: ['Fraunces', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.8s ease-out both',
        'float-soft': 'floatSoft 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-18px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
