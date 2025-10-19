import { Tactic, TacticIndex } from './types'

// Import JSON files directly - works at build time and runtime
import tacticsIndexData from '@/public/data/tactics/index.json'
import highPressData from '@/public/data/tactics/pressing/high-press.json'
import buildUpData from '@/public/data/tactics/passing/build-up.json'
import compactDefenseData from '@/public/data/tactics/defending/compact-defense.json'

// Map of tactic IDs to their data
const tacticsMap: Record<string, Tactic> = {
  'high-press': highPressData as Tactic,
  'build-up': buildUpData as Tactic,
  'compact-defense': compactDefenseData as Tactic,
}

/**
 * Load the tactics index (list of all available tactics)
 * Returns basic info about each tactic without full data
 */
export async function loadTacticsIndex(): Promise<TacticIndex[]> {
  return tacticsIndexData as TacticIndex[]
}

/**
 * Load a single tactic by ID
 * Fetches the full tactic data including all formats and animations
 */
export async function loadTacticById(id: string): Promise<Tactic> {
  const tactic = tacticsMap[id]

  if (!tactic) {
    throw new Error(`Tactic not found: ${id}`)
  }

  // Validate required fields
  if (!tactic.id || !tactic.title || !tactic.category) {
    throw new Error(`Invalid tactic data for ${id}: missing required fields`)
  }

  return tactic
}

/**
 * Load all tactics (full data)
 * Use sparingly - prefer loadTacticsIndex() for listing tactics
 */
export async function loadAllTactics(): Promise<Tactic[]> {
  return Object.values(tacticsMap)
}
