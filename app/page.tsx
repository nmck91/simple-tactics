import { TacticCard } from '@/components/TacticCard'
import { placeholderTactics } from '@/lib/placeholderTactics'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-xl font-semibold text-theme-text">
        Browse Tactics
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {placeholderTactics.map((tactic) => (
          <TacticCard
            key={tactic.id}
            id={tactic.id}
            title={tactic.title}
            category={tactic.category}
          />
        ))}
      </div>
    </main>
  )
}
