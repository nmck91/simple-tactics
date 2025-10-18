import { loadTactics, loadTacticById } from '@/lib/tactics-loader'
import { Tactic } from '@/lib/types'

// Mock fetch globally
global.fetch = jest.fn()

describe('tactics-loader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('loadTactics', () => {
    it('fetches tactics from index.json', async () => {
      const mockTactics = [
        { id: 'high-press', title: 'High Press', category: 'pressing' },
        { id: 'build-up', title: 'Build-Up Play', category: 'passing' },
      ]

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTactics,
      })

      const tactics = await loadTactics()

      expect(global.fetch).toHaveBeenCalledWith('/data/tactics/index.json')
      expect(tactics).toEqual(mockTactics)
    })

    it('returns empty array when fetch fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const tactics = await loadTactics()

      expect(tactics).toEqual([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles network errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const tactics = await loadTactics()

      expect(tactics).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading tactics:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('handles malformed JSON', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })

      const tactics = await loadTactics()

      expect(tactics).toEqual([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('loadTacticById', () => {
    const mockTactic: Tactic = {
      id: 'high-press',
      title: 'High Press Attack',
      category: 'pressing',
      description: {
        kidSpeak: 'Run fast and get the ball!',
        tactical: 'Aggressive pressing in final third',
      },
      formats: {
        '5v5': { players: [] },
        '7v7': { players: [] },
        '9v9': { players: [] },
      },
    }

    it('fetches tactic by ID from correct category path', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTactic,
      })

      const tactic = await loadTacticById('high-press')

      expect(global.fetch).toHaveBeenCalledWith('/data/tactics/pressing/high-press.json')
      expect(tactic).toEqual(mockTactic)
    })

    it('maps tactic ID to correct category directory', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockTactic, id: 'build-up', category: 'passing' }),
      })

      await loadTacticById('build-up')

      expect(global.fetch).toHaveBeenCalledWith('/data/tactics/passing/build-up.json')
    })

    it('returns null when tactic not found', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const tactic = await loadTacticById('non-existent')

      expect(tactic).toBeNull()
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles network errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const tactic = await loadTacticById('high-press')

      expect(tactic).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading tactic high-press:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    describe('Category mapping', () => {
      it('maps pressing tactics correctly', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockTactic,
        })

        await loadTacticById('counter-press')

        expect(global.fetch).toHaveBeenCalledWith(
          '/data/tactics/pressing/counter-press.json'
        )
      })

      it('maps passing tactics correctly', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ ...mockTactic, category: 'passing' }),
        })

        await loadTacticById('switch-play')

        expect(global.fetch).toHaveBeenCalledWith('/data/tactics/passing/switch-play.json')
      })

      it('maps defending tactics correctly', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ ...mockTactic, category: 'defending' }),
        })

        await loadTacticById('compact-defense')

        expect(global.fetch).toHaveBeenCalledWith(
          '/data/tactics/defending/compact-defense.json'
        )
      })

      it('maps set-pieces tactics correctly', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ ...mockTactic, category: 'set-pieces' }),
        })

        await loadTacticById('corner-kick')

        expect(global.fetch).toHaveBeenCalledWith(
          '/data/tactics/set-pieces/corner-kick.json'
        )
      })

      it('falls back to pressing for unknown tactic IDs', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockTactic,
        })

        await loadTacticById('unknown-tactic')

        // Should default to pressing category
        expect(global.fetch).toHaveBeenCalledWith(
          '/data/tactics/pressing/unknown-tactic.json'
        )
      })
    })

    describe('Response validation', () => {
      it('returns complete tactic object with all formats', async () => {
        const completeTactic: Tactic = {
          id: 'high-press',
          title: 'High Press Attack',
          category: 'pressing',
          description: {
            kidSpeak: 'Run fast!',
            tactical: 'Press high',
          },
          formats: {
            '5v5': {
              players: [
                { id: 'player-1', position: { x: 50, y: 10 }, role: 'goalkeeper' },
              ],
            },
            '7v7': {
              players: [
                { id: 'player-1', position: { x: 50, y: 10 }, role: 'goalkeeper' },
              ],
            },
            '9v9': {
              players: [
                { id: 'player-1', position: { x: 50, y: 10 }, role: 'goalkeeper' },
              ],
            },
          },
          thumbnail: '/images/tactics/high-press-thumb.svg',
          difficulty: 'intermediate',
        }

        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => completeTactic,
        })

        const tactic = await loadTacticById('high-press')

        expect(tactic).toHaveProperty('formats.5v5')
        expect(tactic).toHaveProperty('formats.7v7')
        expect(tactic).toHaveProperty('formats.9v9')
        expect(tactic).toHaveProperty('description.kidSpeak')
        expect(tactic).toHaveProperty('description.tactical')
      })
    })
  })

  describe('Integration scenarios', () => {
    it('loads all tactics then fetches specific tactic', async () => {
      const mockIndex = [
        { id: 'high-press', title: 'High Press', category: 'pressing' },
        { id: 'build-up', title: 'Build-Up', category: 'passing' },
      ]

      const mockTactic: Tactic = {
        id: 'high-press',
        title: 'High Press Attack',
        category: 'pressing',
        description: {
          kidSpeak: 'Run fast!',
          tactical: 'Press high',
        },
        formats: {
          '5v5': { players: [] },
          '7v7': { players: [] },
          '9v9': { players: [] },
        },
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockIndex,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTactic,
        })

      const tactics = await loadTactics()
      expect(tactics).toHaveLength(2)

      const tactic = await loadTacticById('high-press')
      expect(tactic?.id).toBe('high-press')

      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })
})
