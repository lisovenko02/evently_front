import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IEvent,
  IEventContext,
  IEventMembersRequest,
  IEventMembersResponse,
} from './eventsTypes'
import { Event } from '@/app/types/eventTypes'
import { IEventMember } from '../event-user/eventUserTypes'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Events', 'EventContext'],

  endpoints: (builder) => ({
    createEvent: builder.mutation<Event, FormData>({
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

    getEventContext: builder.query<IEventContext, { eventId: number }>({
      query: ({ eventId }) => `/events/${eventId}/me`,
      providesTags: (result, error, { eventId }) => [
        { type: 'EventContext', id: eventId },
      ],
    }),

    getEventMembers: builder.query<IEventMembersResponse, IEventMembersRequest>(
      {
        query: ({ eventId, full }) => ({
          url: `/events/${eventId}/members`,
          params: full === false ? { full: 'false' } : undefined,
        }),
        providesTags: (result, error, { eventId }) => [
          { type: 'Events', id: eventId },
        ],
      },
    ),

    getEventById: builder.query<IEvent, { eventId: number }>({
      query: ({ eventId }) => `/events/event/${eventId}`,
      providesTags: (result, error, { eventId }) => [
        { type: 'Events', id: eventId },
      ],
    }),

    getUserEvents: builder.query<IEvent[], void>({
      query: () => '/events/me',
    }),

    joinOpenEvent: builder.mutation<IEventMember, { eventId: number }>({
      query: ({ eventId }) => ({
        url: `events/${eventId}/join`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: 'EventContext', id: eventId },
        { type: 'Events', id: eventId },
      ],
    }),
  }),
})

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventContextQuery,
  useGetEventMembersQuery,
  useGetUserEventsQuery,
  useGetEventByIdQuery,
  useJoinOpenEventMutation,
} = eventsApi
