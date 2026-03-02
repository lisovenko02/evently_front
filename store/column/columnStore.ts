import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IColumnStoreState } from './columnTypes'

export const useColumnsStore = create<IColumnStoreState>()(
  devtools(
    (set) => ({
      columns: [],

      setColumns: (columns) => set({ columns }),

      updateColumnOrder: (columnsOrder) =>
        set((state) => {
          const updated = [...(state.columns ?? [])]
          columnsOrder.forEach(({ id, order }) => {
            const idx = updated.findIndex((c) => c.id === id)
            if (idx !== -1) {
              updated[idx] = { ...updated[idx], order }
            }
          })

          updated.sort((a, b) => a.order - b.order)
          return { columns: updated }
        }),

      addColumn: (column) =>
        set((state) => ({
          columns: [...state.columns, column],
        })),

      updateColumnTitle: (id, title) =>
        set((state) => {
          const updated = state.columns.map((c) =>
            c.id === id ? { ...c, title } : c
          )
          return { columns: updated }
        }),

      deleteColumn: (id) =>
        set((state) => ({
          columns: state.columns.filter((c) => c.id !== id),
        })),
    }),
    { name: 'ColumnStore' }
  )
)
