# API Integration

**Note**: For MVP, there is **no backend API**. Tactics are loaded from static JSON files in `/public/data/tactics`. This section defines patterns for future API integration (analytics, community features).

## Service Template

**Future API Service Pattern (lib/api-client.ts):**

```tsx
// Not used in MVP, but pattern for post-MVP backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.simple-tactics.org'

interface ApiError {
  message: string
  statusCode: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        const error: ApiError = {
          message: `API Error: ${response.statusText}`,
          statusCode: response.status,
        }
        throw error
      }

      return response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // POST request
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
```

---

## Current MVP Pattern: Static JSON Loading

**Tactics Loader (lib/tactics-loader.ts):**

```tsx
import { Tactic } from '@/lib/types'

/**
 * Load all tactics from /public/data/tactics directory
 * In static export mode, this fetches from the public directory
 */
export async function loadTactics(): Promise<Tactic[]> {
  try {
    const response = await fetch('/data/tactics/index.json')
    if (!response.ok) {
      throw new Error('Failed to load tactics index')
    }
    return response.json()
  } catch (error) {
    console.error('Error loading tactics:', error)
    return []
  }
}

/**
 * Load a single tactic by ID
 */
export async function loadTacticById(id: string): Promise<Tactic | null> {
  try {
    // Determine category from ID (e.g., "high-press" -> "pressing")
    const category = getCategoryFromId(id)
    const response = await fetch(`/data/tactics/${category}/${id}.json`)

    if (!response.ok) {
      throw new Error(`Tactic not found: ${id}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error loading tactic ${id}:`, error)
    return null
  }
}

function getCategoryFromId(id: string): string {
  // Map tactic ID to category directory
  // In production, this would be from index.json metadata
  const categoryMap: Record<string, string> = {
    'high-press': 'pressing',
    'counter-press': 'pressing',
    'build-up': 'passing',
    'switch-play': 'passing',
    'compact-defense': 'defending',
    'zonal-marking': 'defending',
    'corner-kick': 'set-pieces',
    'goal-kick': 'set-pieces',
  }

  return categoryMap[id] || 'pressing'
}
```

---
