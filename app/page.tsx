import { TacticCard } from '@/components/TacticCard'
import { loadTacticsIndex } from '@/lib/tactics-loader'

export default async function Home() {
  const tactics = await loadTacticsIndex()

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-xl font-semibold text-theme-text">
        Browse Tactics
      </h2>
      {tactics.length === 0 ? (
        <p className="text-theme-text/70">No tactics available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tactics.map((tactic) => (
            <TacticCard
              key={tactic.id}
              id={tactic.id}
              title={tactic.title}
              category={tactic.category}
            />
          ))}
        </div>
      )}
    </main>
  )
}
