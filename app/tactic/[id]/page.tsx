import Link from 'next/link'
import { placeholderTactics } from '@/lib/placeholderTactics'

// Required for static export - generates pages at build time
export function generateStaticParams() {
  return placeholderTactics.map((tactic) => ({
    id: tactic.id,
  }))
}

interface TacticDetailPageProps {
  params: {
    id: string
  }
}

export default function TacticDetailPage({ params }: TacticDetailPageProps) {
  const tacticId = params.id
  const tactic = placeholderTactics.find((t) => t.id === tacticId)

  if (!tactic) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-6">
          <h2 className="text-xl font-semibold text-red-600">
            Tactic Not Found
          </h2>
          <p className="mt-2 text-red-600/80">
            The tactic &quot;{tacticId}&quot; could not be found.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-theme-primary hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-theme-primary hover:underline"
      >
        ← Back to Tactics
      </Link>

      <div className="mt-6 rounded-lg border border-theme-primary/20 bg-theme-background p-6 shadow-md">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-theme-primary/20 px-3 py-1 text-sm font-semibold text-theme-primary">
            {tactic.category.charAt(0).toUpperCase() + tactic.category.slice(1)}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-theme-text">{tactic.title}</h1>

        <div className="mt-8 rounded-lg border border-theme-secondary/20 bg-theme-secondary/10 p-6">
          <h2 className="text-xl font-semibold text-theme-text">
            Coming Soon
          </h2>
          <p className="mt-2 text-theme-text/70">
            Canvas field rendering and tactic visualization will be implemented
            in Story 1.5.
          </p>
          <p className="mt-4 text-sm text-theme-text/60">
            This is a placeholder detail page demonstrating navigation and
            routing for Story 1.3.
          </p>
        </div>
      </div>
    </main>
  )
}
