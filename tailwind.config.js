/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic role tokens — components consume these, never raw primitives.
        'surface-page': 'var(--surface-page)',
        'surface-raised': 'var(--surface-raised)',
        'surface-sunken': 'var(--surface-sunken)',
        'ink-primary': 'var(--ink-primary)',
        'ink-secondary': 'var(--ink-secondary)',
        'ink-tertiary': 'var(--ink-tertiary)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
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
