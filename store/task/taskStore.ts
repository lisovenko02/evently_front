import { create } from 'zustand'
import { ITaskStore } from './taskTypes'
import { devtools } from 'zustand/middleware'

export const useTaskStore = create<ITaskStore>()(
  devtools(
    (set) => ({
      activeTask: null,
      setActiveTask: (task) => set({ activeTask: task }),
    }),
    { name: 'TaskStore' }
  )
)
