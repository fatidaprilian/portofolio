/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7',
        'paper-warm': '#F0EDE3',
        ink: '#1A1A16',
        'ink-muted': '#6B6B60',
        'accent-red': '#A56A43',
        'accent-blue': '#2A3B4C',
        'accent-yellow': '#E3D8B0',
        rule: '#D4D0C4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        editorial: ['Playfair Display', 'serif'],
      },
      animation: {
        'line-draw': 'lineDraw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'word-up': 'wordUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'diagonal-split': 'diagonalSplit 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        lineDraw: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        wordUp: {
          '0%': { opacity: '0', transform: 'translateY(110%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        diagonalSplit: {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)' },
        },
      },
    },
  },
  plugins: [],
}
