import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IBanUserRequest,
  IKickUserRequest,
  IUnbanUserRequest,
} from './eventUserTypes'

export const eventUserApi = createApi({
  reducerPath: 'eventUserApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['EventUsers', 'EventUserBans', 'CurrentEventUser'],

  endpoints: (builder) => ({
    getEventUser: builder.query({
      query: (eventId) => `event-user/me/${eventId}`,
    }),

    // mb ne void
    selfLeave: builder.mutation<void, { eventId: number }>({
      query: ({ eventId }) => ({
        url: `event-user/self-leave/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (r, e, { eventId }) => [
        { type: 'EventUsers', id: eventId },
        { type: 'CurrentEventUser', id: eventId },
      ],
    }),

    kickUser: builder.mutation<void, IKickUserRequest>({
      query: ({ eventId, eventUserId, reason }) => ({
        url: `event-user/kick/${eventId}/${eventUserId}`,
        method: 'DELETE',
        body: { reason },
      }),
      invalidatesTags: (r, e, { eventId }) => [
        { type: 'EventUsers', id: eventId },
      ],
    }),

    banUser: builder.mutation<void, IBanUserRequest>({
      query: ({ eventId, eventUserId, reason }) => ({
        url: `event-user/ban/${eventId}/${eventUserId}`,
        method: 'DELETE',
        body: { reason },
      }),
      invalidatesTags: (r, e, { eventId }) => [
        { type: 'EventUsers', id: eventId },
        { type: 'EventUserBans', id: eventId },
      ],
    }),

    unbanUser: builder.mutation<void, IUnbanUserRequest>({
      query: ({ eventId, userId, reason }) => ({
        url: `event-user/unban/${eventId}/${userId}`,
        method: 'DELETE',
        body: { reason },
      }),
      invalidatesTags: (r, e, { eventId }) => [
        { type: 'EventUserBans', id: eventId },
      ],
    }),
  }),
})

export const {
  useGetEventUserQuery,
  useBanUserMutation,
  useKickUserMutation,
  useSelfLeaveMutation,
  useUnbanUserMutation,
} = eventUserApi
