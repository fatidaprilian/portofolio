/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface-page': 'var(--canvas-bg)',
        'surface-panel': 'var(--surface-panel)',
        'comic-ink': 'var(--comic-ink)',
        'comic-border': 'var(--comic-border)',
        'brand-coral': 'var(--brand-coral)',
        'brand-mint': 'var(--brand-mint)',
        'brand-sun': 'var(--brand-sun)',
        'brand-sky': 'var(--brand-sky)',
        'ink-primary': 'var(--ink-primary)',
        'ink-muted': 'var(--ink-muted)',
        'ink-subtle': 'var(--ink-subtle)',
        rule: 'var(--comic-border)',
        accent: 'var(--brand-coral)',
      },
      boxShadow: {
        'comic': '3px 3px 0px var(--comic-border)',
        'comic-lg': '5px 5px 0px var(--comic-border)',
        'comic-sm': '2px 2px 0px var(--comic-border)',
        'comic-btn': '2.5px 2.5px 0px var(--comic-border)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        editorial: ['"Fraunces Variable"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
