import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IBoardStore } from './boardTypes'

export const useBoardStore = create<IBoardStore>()(
  devtools(
    (set) => ({
      board: null,

      setBoard: (board) => set({ board }),

      clearBoard: () => set({ board: null }),
    }),
    { name: 'BoardStore' }
  )
)
