# Routing

**Next.js App Router handles routing via file-based convention.** No React Router needed.

## Route Configuration

**Static Routes:**

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Home - Tactics Library Grid |
| `/tactic/[id]` | `app/tactic/[id]/page.tsx` | Tactic Detail View (dynamic) |

**Future Routes (Post-MVP):**

| Route | File | Description |
|-------|------|-------------|
| `/about` | `app/about/page.tsx` | About the project |
| `/contribute` | `app/contribute/page.tsx` | How to contribute |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |

---

## Dynamic Route Pattern

**Tactic Detail Page (app/tactic/[id]/page.tsx):**

```tsx
import { notFound } from 'next/navigation'
import { FieldCanvas } from '@/components/FieldCanvas'
import { loadTacticById } from '@/lib/tactics-loader'

// This page is statically generated at build time for all tactic IDs
export async function generateStaticParams() {
  // Load all tactics to generate static paths
  const response = await fetch('/data/tactics/index.json')
  const tactics = await response.json()

  return tactics.map((tactic: { id: string }) => ({
    id: tactic.id,
  }))
}

export default async function TacticPage({ params }: { params: { id: string } }) {
  const tactic = await loadTacticById(params.id)

  if (!tactic) {
    notFound() // Returns 404 page
  }

  return (
    <div>
      <FieldCanvas tactic={tactic} />
    </div>
  )
}
```

---

## Navigation Patterns

**1. Link Component (Client-Side Navigation):**

```tsx
import Link from 'next/link'

<Link href={`/tactic/${tactic.id}`} className="...">
  {tactic.title}
</Link>
```

**2. Programmatic Navigation:**

```tsx
'use client'

import { useRouter } from 'next/navigation'

export const TacticCard = ({ tactic }: { tactic: Tactic }) => {
  const router = useRouter()

  const handleClick = () => {
    // Track analytics before navigating
    trackEvent('tactic_viewed', { tacticId: tactic.id })
    router.push(`/tactic/${tactic.id}`)
  }

  return <div onClick={handleClick}>{tactic.title}</div>
}
```

**3. Back Navigation:**

```tsx
'use client'

import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()

  return (
    <button onClick={() => router.back()}>
      ← Back to Tactics
    </button>
  )
}
```

---
