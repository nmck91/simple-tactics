'use client'

import Link from 'next/link'
import { TacticCategory } from '@/lib/types'

interface TacticCardProps {
  id: string
  title: string
  category: TacticCategory
}

const categoryColors: Record<TacticCategory, string> = {
  pressing: 'bg-red-500 hover:bg-red-600',
  passing: 'bg-blue-500 hover:bg-blue-600',
  defending: 'bg-purple-500 hover:bg-purple-600',
  'set-pieces': 'bg-green-500 hover:bg-green-600',
}

const categoryLabels: Record<TacticCategory, string> = {
  pressing: 'Pressing',
  passing: 'Passing',
  defending: 'Defending',
  'set-pieces': 'Set Pieces',
}

export function TacticCard({ id, title, category }: TacticCardProps) {
  return (
    <Link
      href={`/tactic/${id}`}
      aria-label={`View ${title} tactic`}
      className="focus:ring-2 focus:ring-theme-primary focus:outline-none"
    >
      <div
        className={`min-h-[120px] min-w-[44px] rounded-lg shadow-md transition-all hover:shadow-lg ${categoryColors[category]} flex flex-col justify-between p-4`}
      >
        <div>
          <span className="inline-block rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white">
            {categoryLabels[category]}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      </div>
    </Link>
  )
}
