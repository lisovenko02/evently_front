import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IChatStoreState } from './chatTypes'

// Store for managing last messages in chats
export const useChatStore = create<IChatStoreState>()(
  devtools(
    (set) => ({
      lastMessages: [],

      // Set or update the last message for a specific chat
      setLastMessage: (chatId, message) =>
        set((state) => {
          const updated = [...state.lastMessages]
          const index = updated.findIndex((item) => item.chatId === chatId)

          if (index !== -1) {
            updated[index] = { chatId, message }
          } else {
            updated.push({ chatId, message })
          }

          return { lastMessages: updated }
        }),
    }),
    { name: 'ChatStore' }
  )
)
