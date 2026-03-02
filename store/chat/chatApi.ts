import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '@/utils/baseQuery'
import {
  IChat,
  IChatDetails,
  ICreateGroupChatResponse,
  ICreatePrivateChatResponse,
  IGroupChatResponseWrapper,
} from './chatTypes'

// RTK Query API for chat-related operations
export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Chat'],

  endpoints: (builder) => ({
    // Fetch all chats for the current user within an event
    getUserChats: builder.query<IChat[], number>({
      query: (eventId) => `chat/my-chats/${eventId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((chat) => ({ type: 'Chat' as const, id: chat.id })),
              { type: 'Chat', id: 'LIST' },
            ]
          : [{ type: 'Chat', id: 'LIST' }],
    }),

    // Fetch chat details by chatId and eventId
    getChatDetails: builder.query<
      IChatDetails,
      { eventId: number; chatId: number }
    >({
      query: ({ eventId, chatId }: { eventId: number; chatId: number }) =>
        `chat/${chatId}/${eventId}`,
      providesTags: (result, error, { chatId }) => [
        { type: 'Chat', id: chatId },
      ],
    }),

    // Create a new group chat with form data
    createGroupChat: builder.mutation<
      ICreateGroupChatResponse,
      { formData: FormData; eventId: number }
    >({
      query: ({ formData, eventId }) => ({
        url: `/chat/group?eventId=${eventId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),

    // Start a private chat with another user
    createPrivateChat: builder.mutation<
      ICreatePrivateChatResponse,
      {
        eventId: number
        receiverEventUserId: number
      }
    >({
      query: (body) => ({
        url: '/chat/private',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),

    // Update the name of a group chat
    updateGroupName: builder.mutation<
      IGroupChatResponseWrapper,
      { name: string; chatId: number; eventId: number }
    >({
      query: ({ name, chatId, eventId }) => ({
        url: `chat/${chatId}/name?eventId=${eventId}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Chat', id: chatId },
      ],
    }),

    // Update the image of a group chat
    updateGroupImage: builder.mutation<
      IGroupChatResponseWrapper,
      { image: FormData; chatId: number; eventId: number }
    >({
      query: ({ image, chatId, eventId }) => ({
        url: `chat/${chatId}/image?eventId=${eventId}`,
        method: 'PATCH',
        body: image,
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Chat', id: chatId },
      ],
    }),

    addParticipantToChat: builder.mutation({
      query: ({ chatId, eventId, dto }) => ({
        url: `chat/addMember/${chatId}?eventId=${eventId}`,
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Chat', id: chatId },
      ],
    }),

    kickParticipantFromChat: builder.mutation<
      string,
      { chatId: number; eventUserId: number; eventId: number }
    >({
      query: ({ chatId, eventUserId, eventId }) => ({
        url: `chat/${chatId}/${eventUserId}?eventId=${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Chat', id: chatId },
      ],
    }),

    deleteGroupChat: builder.mutation({
      query: ({ chatId, eventId }) => ({
        url: `chat/${chatId}?eventId=${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Chat', id: chatId },
        { type: 'Chat', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetUserChatsQuery,
  useGetChatDetailsQuery,
  useCreateGroupChatMutation,
  useCreatePrivateChatMutation,
  useUpdateGroupNameMutation,
  useUpdateGroupImageMutation,
  useAddParticipantToChatMutation,
  useKickParticipantFromChatMutation,
  useDeleteGroupChatMutation,
} = chatApi
