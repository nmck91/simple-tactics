# Styling Guidelines

**Approach**: Tailwind CSS with CSS custom properties (variables) for theme switching. No CSS-in-JS (styled-components/emotion) to save bundle size.

## Styling Approach

**Tailwind Utility-First with Theme Variables:**

```tsx
// Component uses Tailwind classes
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
  Click Me
</button>

// Theme colors defined in CSS variables (styles/themes.css)
[data-theme="superhero"] {
  --color-primary: #9C27B0; /* Hero Purple */
  --color-primary-dark: #7B1FA2;
}

[data-theme="professional"] {
  --color-primary: #1976D2; /* Pro Blue */
  --color-primary-dark: #1565C0;
}

// Tailwind config maps to CSS variables (tailwind.config.ts)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
      }
    }
  }
}
```

---

## Global Theme Variables

**styles/themes.css:**

```css
:root {
  /* Spacing */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */

  /* Typography */
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-heading: 'Inter', -apple-system, sans-serif;

  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}

/* Superhero Theme */
[data-theme="superhero"] {
  /* Primary Colors */
  --color-primary: #9C27B0;
  --color-primary-dark: #7B1FA2;
  --color-secondary: #2196F3;
  --color-accent: #FF9800;

  /* Category Colors */
  --color-pressing: #F44336;
  --color-passing: #FFEB3B;
  --color-defending: #4CAF50;
  --color-set-pieces: #9C27B0;

  /* Neutral Colors */
  --color-text: #212121;
  --color-text-secondary: #757575;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;

  /* Field */
  --color-field-grass: #32CD32;
  --color-field-lines: #FFFFFF;
  --field-line-width: 4px;

  /* Typography */
  --font-body: 'Nunito', sans-serif;
  --font-heading: 'Fredoka', sans-serif;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-card: 0 4px 8px rgba(156, 39, 176, 0.2);
  --shadow-button: 0 4px 12px rgba(33, 150, 243, 0.3);
}

/* Professional Theme */
[data-theme="professional"] {
  /* Primary Colors */
  --color-primary: #1976D2;
  --color-primary-dark: #1565C0;
  --color-secondary: #00897B;
  --color-accent: #0D47A1;

  /* Category Colors (Muted) */
  --color-pressing: #C62828;
  --color-passing: #1565C0;
  --color-defending: #2E7D32;
  --color-set-pieces: #6A1B9A;

  /* Neutral Colors */
  --color-text: #212121;
  --color-text-secondary: #616161;
  --color-background: #ECEFF1;
  --color-surface: #FFFFFF;
  --color-surface-dark: #2C2C2C;

  /* Field */
  --color-field-grass: #228B22;
  --color-field-lines: #FFFFFF;
  --field-line-width: 2px;

  /* Typography */
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* Shadows */
  --shadow-card: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-button: 0 2px 6px rgba(25, 118, 210, 0.2);
}

/* Dark Mode Support (Future) */
@media (prefers-color-scheme: dark) {
  [data-theme="professional"] {
    --color-background: #121212;
    --color-surface: #1E1E1E;
    --color-text: #E0E0E0;
  }
}
```

---

## Tailwind Configuration

**tailwind.config.ts:**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        pressing: 'var(--color-pressing)',
        passing: 'var(--color-passing)',
        defending: 'var(--color-defending)',
        'set-pieces': 'var(--color-set-pieces)',
        'field-grass': 'var(--color-field-grass)',
        'field-lines': 'var(--color-field-lines)',
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
    },
  },
  plugins: [],
}

export default config
```

---

## Component Styling Examples

**1. Theme-Aware Button:**

```tsx
<button className="bg-primary text-white px-4 py-2 rounded-md shadow-button hover:bg-primary-dark transition-colors duration-fast">
  Play Animation
</button>
```

**2. Category Badge:**

```tsx
<span className="bg-pressing text-white px-2 py-1 rounded-sm text-sm font-semibold">
  Pressing
</span>
```

**3. Field Canvas Container:**

```tsx
<div className="relative w-full aspect-[4/3] bg-field-grass rounded-lg overflow-hidden">
  <canvas ref={canvasRef} className="w-full h-full" />
</div>
```

---
