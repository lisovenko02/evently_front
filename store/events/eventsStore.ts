import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IEventsStore } from './eventsTypes'

export const useEventsStore = create<IEventsStore>()(
  devtools(
    (set) => ({
      events: [],
      currentEvent: null,
      setEvents: (events) => set({ events }),
      setCurrentEvent: (event) => set({ currentEvent: event }),
    }),
    { name: 'EventsStore' },
  ),
)

// import { IEventsActions, IEventsState } from './eventsTypes'

// export const useEventsStore = create<IEventsState & IEventsActions>()(
//   devtools(
//     (set) => ({
//       events: [],
//       currentEvent: null,

//       setEvents: (events) => set({ events }),
//       setCurrentEvent: (event) => set({ currentEvent: event }),
//       addEvent: (event) =>
//         set((state) => ({ events: [...state.events, event] })),
//     }),
//     { name: 'EventsStore' }
//   )
// )
