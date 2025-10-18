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
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',

        // Category colors
        pressing: 'var(--color-pressing)',
        passing: 'var(--color-passing)',
        defending: 'var(--color-defending)',
        'set-pieces': 'var(--color-set-pieces)',

        // Field colors
        'field-grass': 'var(--color-field-grass)',
        'field-lines': 'var(--color-field-lines)',

        // Text colors
        'text-primary': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',

        // Surface colors
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-dark': 'var(--color-surface-dark)',
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        button: 'var(--shadow-button)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
    },
  },
  plugins: [],
}

export default config
