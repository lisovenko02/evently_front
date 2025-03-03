import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IEvent } from './eventsTypes'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Events'],

  endpoints: (builder) => ({
    createEvent: builder.mutation<IEvent, Partial<IEvent>>({
      query: (newEvent) => ({
        url: 'events/create',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Events'],
    }),

    getEvents: builder.query<IEvent[], void>({
      query: () => '/events',
      providesTags: ['Events'],
    }),

    getEventMembers: builder.query({
      query: (eventId) => `/events/${eventId}/members`,
    }),
  }),
})

export const { useCreateEventMutation, useGetEventsQuery } = eventsApi
