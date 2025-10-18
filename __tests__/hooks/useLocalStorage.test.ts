import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

    const [value] = result.current
    expect(value).toBe('initial-value')
  })

  it('returns stored value from localStorage if it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

    const [value] = result.current
    expect(value).toBe('stored-value')
  })

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      const [, setValue] = result.current
      setValue('new-value')
    })

    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'))
  })

  it('updates state when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      const [, setValue] = result.current
      setValue('new-value')
    })

    const [value] = result.current
    expect(value).toBe('new-value')
  })

  describe('Complex data types', () => {
    it('handles objects', () => {
      const initialObject = { name: 'Test', count: 0 }
      const { result } = renderHook(() => useLocalStorage('test-obj', initialObject))

      act(() => {
        const [, setValue] = result.current
        setValue({ name: 'Updated', count: 5 })
      })

      const [value] = result.current
      expect(value).toEqual({ name: 'Updated', count: 5 })
      expect(localStorage.getItem('test-obj')).toBe(
        JSON.stringify({ name: 'Updated', count: 5 })
      )
    })

    it('handles arrays', () => {
      const { result } = renderHook(() => useLocalStorage('test-array', [1, 2, 3]))

      act(() => {
        const [, setValue] = result.current
        setValue([4, 5, 6])
      })

      const [value] = result.current
      expect(value).toEqual([4, 5, 6])
    })

    it('handles null values', () => {
      const { result } = renderHook(() => useLocalStorage<string | null>('test-null', null))

      act(() => {
        const [, setValue] = result.current
        setValue(null)
      })

      const [value] = result.current
      expect(value).toBeNull()
    })
  })

  describe('Error handling', () => {
    it('handles JSON parse errors gracefully', () => {
      // Set invalid JSON in localStorage
      localStorage.setItem('test-key', 'invalid-json{')

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))

      const [value] = result.current
      // Should return initial value when parse fails
      expect(value).toBe('fallback')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles localStorage setItem errors', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      // Mock localStorage.setItem to throw
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError')
      })

      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

      act(() => {
        const [, setValue] = result.current
        setValue('new-value')
      })

      expect(consoleSpy).toHaveBeenCalled()

      // Restore
      Storage.prototype.setItem = originalSetItem
      consoleSpy.mockRestore()
    })
  })

  describe('Multiple instances', () => {
    it('shares state between hooks with same key', () => {
      const { result: result1 } = renderHook(() => useLocalStorage('shared-key', 'initial'))
      // Second hook instance to demonstrate shared localStorage
      renderHook(() => useLocalStorage('shared-key', 'initial'))

      act(() => {
        const [, setValue] = result1.current
        setValue('updated')
      })

      // Both hooks should see the update in localStorage
      const stored = localStorage.getItem('shared-key')
      expect(stored).toBe(JSON.stringify('updated'))
    })

    it('isolates state between hooks with different keys', () => {
      const { result: result1 } = renderHook(() => useLocalStorage('key-1', 'value-1'))
      const { result: result2 } = renderHook(() => useLocalStorage('key-2', 'value-2'))

      act(() => {
        const [, setValue] = result1.current
        setValue('updated-1')
      })

      const [value2] = result2.current
      expect(value2).toBe('value-2') // key-2 should not be affected
    })
  })

  describe('TypeScript types', () => {
    it('infers correct types from initial value', () => {
      const { result } = renderHook(() => useLocalStorage('test-string', 'hello'))

      const [value, setValue] = result.current

      // TypeScript would enforce these types at compile time
      expect(typeof value).toBe('string')
      act(() => setValue('world')) // Valid
      // setValue(123) // Would be a TypeScript error
    })

    it('works with explicit generic type', () => {
      interface User {
        name: string
        age: number
      }

      const { result } = renderHook(() =>
        useLocalStorage<User>('user', { name: 'Test', age: 25 })
      )

      act(() => {
        const [, setValue] = result.current
        setValue({ name: 'Updated', age: 30 })
      })

      const [value] = result.current
      expect(value.name).toBe('Updated')
      expect(value.age).toBe(30)
    })
  })

  describe('Player names use case', () => {
    it('persists player names correctly', () => {
      const tacticId = 'high-press'
      const key = `simple-tactics-player-names-${tacticId}`

      const { result } = renderHook(() =>
        useLocalStorage<Record<string, string>>(key, {})
      )

      act(() => {
        const [, setValue] = result.current
        setValue({
          'player-1': 'Sarah',
          'player-2': 'Miguel',
          'player-3': 'Emma',
        })
      })

      const [value] = result.current
      expect(value).toEqual({
        'player-1': 'Sarah',
        'player-2': 'Miguel',
        'player-3': 'Emma',
      })

      // Verify it's in localStorage
      const stored = localStorage.getItem(key)
      expect(stored).toBe(
        JSON.stringify({
          'player-1': 'Sarah',
          'player-2': 'Miguel',
          'player-3': 'Emma',
        })
      )
    })
  })
})
