import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IEventUserStore } from './eventUserTypes'

export const useEventUserStore = create<IEventUserStore>()(
  devtools(
    (set) => ({
      currentEventUser: null,
      setCurrentEventUser: (eventUser) => set({ currentEventUser: eventUser }),
      reset: () => set({ currentEventUser: null }),
    }),
    { name: 'EventUserStore' },
  ),
)

// export const useEventUserStore = create<IEventUserStore>()(
//   devtools(
//     (set) => ({
//       selectedEventUserId: null,
//       action: null,
//       reason: '',
//       isModalOpen: false,

//       openAction: (action, eventUserId = null) =>
//         set({
//           action,
//           selectedEventUserId: eventUserId,
//           isModalOpen: true,
//           reason: '',
//         }),

//       closeModal: () =>
//         set({
//           isModalOpen: false,
//           action: null,
//           selectedEventUserId: null,
//           reason: '',
//         }),

//       setReason: (value) => set({ reason: value }),

//       reset: () =>
//         set({
//           selectedEventUserId: null,
//           action: null,
//           reason: '',
//           isModalOpen: false,
//         }),
//     }),
//     { name: 'EventUserStore' }
//   )
// )
