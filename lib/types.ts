/**
 * Core TypeScript types for Simple Tactics
 *
 * This file defines all shared types used across the application.
 * Keep this file synchronized with the tactics JSON schema.
 */

// ============================================================================
// Tactics & Game Data Types
// ============================================================================

/**
 * Player position on the field
 * Coordinates are normalized to 0-100 (percentage of field dimensions)
 */
export interface Position {
  x: number // 0-100 (left to right)
  y: number // 0-100 (top to bottom)
}

/**
 * Player data including position and metadata
 */
export interface Player {
  id: string // e.g., "player-1", "player-2"
  position: Position
  role: PlayerRole
  name?: string // Custom name assigned by coach
}

/**
 * Player roles in soccer
 */
export type PlayerRole =
  | 'goalkeeper'
  | 'defender'
  | 'midfielder'
  | 'forward'

/**
 * Animation keyframe for a single player
 * Defines movement from one position to another over time
 */
export interface PlayerKeyframe {
  playerId: string
  startPosition: Position
  endPosition: Position
  duration: number // milliseconds
  delay?: number // milliseconds (for sequential animations)
}

/**
 * Complete animation sequence for a tactic
 */
export interface TacticAnimation {
  keyframes: PlayerKeyframe[]
  totalDuration: number // milliseconds
  loop?: boolean
}

/**
 * Tactic data for a specific format (5v5, 7v7, or 9v9)
 */
export interface FormatTactic {
  players: Player[]
  animation?: TacticAnimation
  notes?: string // Format-specific coaching notes
}

/**
 * Tactic category
 */
export type TacticCategory =
  | 'pressing'
  | 'passing'
  | 'defending'
  | 'set-pieces'

/**
 * Team format (number of players per side)
 */
export type TeamFormat = '5v5' | '7v7' | '9v9'

/**
 * Complete tactic with all formats
 */
export interface Tactic {
  id: string // e.g., "high-press", "build-up"
  title: string // e.g., "High Press Attack"
  category: TacticCategory
  description: {
    kidSpeak: string // Simple explanation for ages 5-7
    tactical: string // Professional tactical language
    metaphor?: string // Relatable comparison (e.g., "Like bees swarming honey")
  }
  characterRoles?: {
    // For Superhero theme
    [role: string]: string // e.g., { "forward": "Rocket Racers" }
  }
  whenToUse?: string[] // List of situations where tactic is effective
  formats: {
    '5v5': FormatTactic
    '7v7': FormatTactic
    '9v9': FormatTactic
  }
  thumbnail?: string // Path to preview image
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  ageGroup?: '5-7' | '8-9' | '10-11' // Recommended age range
}

/**
 * Tactics index entry (for index.json)
 */
export interface TacticIndex {
  id: string
  title: string
  category: TacticCategory
  thumbnail?: string
  difficulty?: string
}

// ============================================================================
// Theme & UI State Types
// ============================================================================

/**
 * Visual theme
 */
export type Theme = 'superhero' | 'professional'

/**
 * Theme context value
 */
export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

/**
 * Format context value
 */
export interface FormatContextType {
  format: TeamFormat
  setFormat: (format: TeamFormat) => void
}

/**
 * Player name customization storage
 * Keyed by tactic ID, then by player ID
 */
export interface PlayerNamesStorage {
  [tacticId: string]: {
    [playerId: string]: string
  }
}

// ============================================================================
// Component Prop Types
// ============================================================================

/**
 * Props for TacticCard component
 */
export interface TacticCardProps {
  tactic: TacticIndex | Tactic
  className?: string
}

/**
 * Props for FieldCanvas component
 */
export interface FieldCanvasProps {
  tactic: Tactic
  format: TeamFormat
  isPlaying?: boolean
  onAnimationComplete?: () => void
  className?: string
}

/**
 * Props for AnimationControls component
 */
export interface AnimationControlsProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  className?: string
}

/**
 * Props for ThemeToggle component
 */
export interface ThemeToggleProps {
  className?: string
}

/**
 * Props for FormatTabBar component
 */
export interface FormatTabBarProps {
  className?: string
}

/**
 * Props for ExplanationCard component
 */
export interface ExplanationCardProps {
  tactic: Tactic
  className?: string
}

/**
 * Props for PlayerCustomization component
 */
export interface PlayerCustomizationProps {
  tacticId: string
  players: Player[]
  onUpdate: (playerNames: Record<string, string>) => void
  className?: string
}

/**
 * Props for Button component
 */
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

/**
 * Props for TextInput component
 */
export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  className?: string
}

// ============================================================================
// Canvas & Animation Types
// ============================================================================

/**
 * Field dimensions for Canvas rendering
 */
export interface FieldDimensions {
  width: number // Canvas width in pixels
  height: number // Canvas height in pixels
  aspectRatio: number // Width / height (e.g., 1.5 for 3:2)
}

/**
 * Canvas rendering context wrapper
 */
export interface CanvasContext {
  ctx: CanvasRenderingContext2D
  dimensions: FieldDimensions
}

/**
 * Animation state
 */
export interface AnimationState {
  isPlaying: boolean
  progress: number // 0-100
  currentFrame: number
  totalFrames: number
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * API error response
 */
export interface ApiError {
  message: string
  statusCode: number
  details?: unknown
}

/**
 * Loading state wrapper
 */
export type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: ApiError }

/**
 * Omit helper for creating partial types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Deep readonly helper
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}
