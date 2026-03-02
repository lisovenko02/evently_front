import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IMessageStore } from './messagesTypes'

export const useMessageStore = create<IMessageStore>()(
  devtools(
    (set) => ({
      messages: {},
      addMessage: (chatId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), message],
          },
        })),
      setMessages: (chatId, newMessages) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: newMessages,
          },
          hasLoaded: { ...state.hasLoaded, [chatId]: true },
        })),
    }),
    { name: 'MessageStore' }
  )
)
