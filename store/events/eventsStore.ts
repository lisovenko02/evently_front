import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IEventsActions, IEventsState } from './eventsTypes'

export const useEventsStore = create<IEventsState & IEventsActions>()(
  devtools(
    (set) => ({
      events: [],
      currentEvent: null,

      setEvents: (events) => set({ events }),
      setCurrentEvent: (event) => set({ currentEvent: event }),
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
    }),
    { name: 'EventsStore' }
  )
)
