import Link from 'next/link'
import { loadTacticById, loadTacticsIndex } from '@/lib/tactics-loader'

// Required for static export - generates pages at build time
export async function generateStaticParams() {
  const index = await loadTacticsIndex()
  return index.map((tactic) => ({
    id: tactic.id,
  }))
}

interface TacticDetailPageProps {
  params: {
    id: string
  }
}

export default async function TacticDetailPage({
  params,
}: TacticDetailPageProps) {
  const tacticId = params.id

  let tactic
  try {
    tactic = await loadTacticById(tacticId)
  } catch (error) {
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
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block rounded-full bg-theme-primary/20 px-3 py-1 text-sm font-semibold text-theme-primary">
            {tactic.category.charAt(0).toUpperCase() + tactic.category.slice(1)}
          </span>
          {tactic.difficulty && (
            <span className="text-sm text-theme-text/60">
              {tactic.difficulty.charAt(0).toUpperCase() +
                tactic.difficulty.slice(1)}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-theme-text">{tactic.title}</h1>

        {/* Professional Description */}
        <div className="mt-6 rounded-lg border border-theme-secondary/20 bg-theme-secondary/10 p-6">
          <h2 className="text-lg font-semibold text-theme-text">
            Tactical Explanation
          </h2>
          <p className="mt-2 text-theme-text/90">
            {tactic.description.tactical}
          </p>
        </div>

        {/* Kid-Friendly Description */}
        <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/10 p-6">
          <h2 className="text-lg font-semibold text-theme-text">
            For Young Players
          </h2>
          <p className="mt-2 text-theme-text/90">
            {tactic.description.kidSpeak}
          </p>
          {tactic.description.metaphor && (
            <p className="mt-2 italic text-theme-text/70">
              {tactic.description.metaphor}
            </p>
          )}
        </div>

        {/* When to Use */}
        {tactic.whenToUse && tactic.whenToUse.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-theme-text">
              When to Use This Tactic
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-theme-text/80">
              {tactic.whenToUse.map((situation, idx) => (
                <li key={idx}>{situation}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Field Canvas Placeholder */}
        <div className="mt-8 rounded-lg border border-theme-secondary/20 bg-theme-secondary/10 p-6">
          <h2 className="text-xl font-semibold text-theme-text">
            Field Visualization
          </h2>
          <p className="mt-2 text-theme-text/70">
            Canvas field rendering and player animations will be implemented in
            Story 1.5.
          </p>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg bg-green-600/20">
            <p className="text-sm text-theme-text/60">
              Soccer field canvas coming soon...
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
