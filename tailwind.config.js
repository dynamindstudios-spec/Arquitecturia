/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: 'var(--brand-dark, #121212)',
          deep: 'var(--brand-deep, #0a0a0a)',
          surface: 'var(--brand-surface, #181818)',
          'surface-hover': 'var(--brand-surface-hover, #222222)',
          mint: 'var(--brand-mint, #b8ded8)',
          'mint-light': 'var(--brand-mint-light, #d3ece7)',
          'mint-dark': 'var(--brand-mint-dark, #8fb8b1)',
          bronze: 'var(--brand-bronze, #c5a880)',
          gray: 'var(--brand-gray, #666666)',
          light: 'var(--brand-light, #f5f5f5)'
        }
      },
      fontFamily: {
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
        'body': ['Montserrat', 'system-ui', 'sans-serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'architectural': '0.15em'
      }
    },
  },
  plugins: [],
}
