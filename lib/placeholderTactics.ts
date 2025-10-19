export interface PlaceholderTactic {
  id: string
  title: string
  category: 'pressing' | 'passing' | 'defending'
}

export const placeholderTactics: PlaceholderTactic[] = [
  { id: 'high-press', title: 'High Press', category: 'pressing' },
  { id: 'build-up-play', title: 'Build-Up Play', category: 'passing' },
  { id: 'compact-defense', title: 'Compact Defense', category: 'defending' },
  { id: 'counter-press', title: 'Counter Press', category: 'pressing' },
  { id: 'switch-play', title: 'Switch Play', category: 'passing' },
  { id: 'zonal-marking', title: 'Zonal Marking', category: 'defending' },
  { id: 'pressing-trap', title: 'Pressing Trap', category: 'pressing' },
  { id: 'triangles', title: 'Passing Triangles', category: 'passing' },
]
