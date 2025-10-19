# State Management

**Approach**: React Context API + localStorage for global state. No Redux/Zustand needed - only 3 global states (theme, format, player names).

## Store Structure

**Global State Architecture:**

```
┌─────────────────────────────────────┐
│         App Layout (Root)           │
│  ┌───────────────────────────────┐  │
│  │      ThemeProvider            │  │
│  │  (Superhero/Professional)     │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   FormatProvider        │  │  │
│  │  │   (5v5/7v7/9v9)         │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │   Page Content    │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

LocalStorage (Persistence):
  - simple-tactics-theme: "superhero" | "professional"
  - simple-tactics-format: "5v5" | "7v7" | "9v9"
  - simple-tactics-player-names: { [tacticId]: { [position]: string } }
```

**State Locations:**

| State | Where | Type | Persistence |
|-------|-------|------|-------------|
| Theme | ThemeContext | `'superhero' \| 'professional'` | localStorage |
| Format | FormatContext | `'5v5' \| '7v7' \| '9v9'` | localStorage |
| Player Names | Component state + localStorage | `Record<string, string>` | localStorage |
| Animation State | Component state (useTacticAnimation) | `{ isPlaying, progress }` | None |
| Explanation Expanded | Component state | `boolean` | None |

---

## State Management Templates

**1. Theme Context (lib/theme-context.tsx):**

```tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'superhero' | 'professional'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('superhero')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('simple-tactics-theme') as Theme | null
    if (saved === 'superhero' || saved === 'professional') {
      setThemeState(saved)
    }
  }, [])

  // Save to localStorage on change
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('simple-tactics-theme', newTheme)
    // Update data-theme attribute for CSS
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**2. Format Context (lib/format-context.tsx):**

```tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Format = '5v5' | '7v7' | '9v9'

interface FormatContextType {
  format: Format
  setFormat: (format: Format) => void
}

export const FormatContext = createContext<FormatContextType | undefined>(undefined)

export const FormatProvider = ({ children }: { children: ReactNode }) => {
  const [format, setFormatState] = useState<Format>('7v7') // Default to 7v7

  useEffect(() => {
    const saved = localStorage.getItem('simple-tactics-format') as Format | null
    if (saved === '5v5' || saved === '7v7' || saved === '9v9') {
      setFormatState(saved)
    }
  }, [])

  const setFormat = (newFormat: Format) => {
    setFormatState(newFormat)
    localStorage.setItem('simple-tactics-format', newFormat)
  }

  return (
    <FormatContext.Provider value={{ format, setFormat }}>
      {children}
    </FormatContext.Provider>
  )
}
```

**3. useLocalStorage Hook (hooks/useLocalStorage.ts):**

```tsx
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }, [key])

  // Save to localStorage when value changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue]
}
```

**Usage:**
```tsx
// In PlayerCustomization component
const [playerNames, setPlayerNames] = useLocalStorage<Record<string, string>>(
  `simple-tactics-player-names-${tactic.id}`,
  {}
)
```

---

## State Update Patterns

**1. Context Updates (Synchronous):**

```tsx
// components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/hooks/useTheme'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'superhero' ? 'professional' : 'superhero')
  }

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'superhero' ? '🦸 Superhero' : '👔 Professional'}
    </button>
  )
}
```

**2. LocalStorage Updates (via Hook):**

```tsx
// components/PlayerCustomization.tsx
'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'

export const PlayerCustomization = ({ tacticId }: { tacticId: string }) => {
  const [playerNames, setPlayerNames] = useLocalStorage<Record<string, string>>(
    `simple-tactics-player-names-${tacticId}`,
    {}
  )

  const updatePlayerName = (position: string, name: string) => {
    setPlayerNames({
      ...playerNames,
      [position]: name,
    })
  }

  const clearAllNames = () => {
    setPlayerNames({})
  }

  return (
    <div>
      {/* Input fields for player names */}
      <button onClick={clearAllNames}>Clear All Names</button>
    </div>
  )
}
```

**3. Component State (Local, No Persistence):**

```tsx
// components/ExplanationCard.tsx
'use client'

import { useState } from 'react'

export const ExplanationCard = ({ tactic }: { tactic: Tactic }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Minimize' : 'Expand'} Explanation
      </button>
      {isExpanded && <div>{tactic.description}</div>}
    </div>
  )
}
```

---
