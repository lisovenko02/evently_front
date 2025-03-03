import { create } from 'zustand'

interface EventFilterState {
  category: string
  setCategory: (category: string) => void
}

export const useEventFilters = create<EventFilterState>((set) => ({
  category: 'all',
  setCategory: (category) => set({ category }),
}))
