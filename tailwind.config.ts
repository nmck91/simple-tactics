import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors (mapped to CSS variables)
        theme: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          background: 'var(--color-background)',
          text: 'var(--color-text)',
        },
      },
    },
  },
  plugins: [],
}

export default config
