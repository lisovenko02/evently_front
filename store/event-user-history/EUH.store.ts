import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { EventUserHistoryStatus } from './EUH.types'

export const useEventUserHistoryStore = create()(
  devtools(
    (set) => ({
      selectedUserId: null,
      searchQuery: '',
      statuses: [],
      from: undefined,
      to: undefined,
      limit: 20,
      cursor: undefined,

      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
      setStatuses: (statuses: EventUserHistoryStatus[]) => set({ statuses }),
      setFrom: (from?: string) => set({ from }),
      setTo: (to?: string) => set({ to }),
      setLimit: (limit: number) => set({ limit }),
      setCursor: (cursor?: number) => set({ cursor }),
      setSelectedUserId: (selectedUserId: number | null) =>
        set({ selectedUserId }),
      resetFilters: () =>
        set({
          selectedUserId: null,
          searchQuery: '',
          statuses: [],
          from: undefined,
          to: undefined,
          limit: 20,
          cursor: undefined,
        }),
    }),
    { name: 'EventUserHistoryStore' },
  ),
)
