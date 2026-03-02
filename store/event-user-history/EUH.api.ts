import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IEventHistory,
  IEventHistoryMetrics,
  IEventHistoryRequest,
  IEventUserIdsRequest,
  ISearchQueryRequest,
} from './EUH.types'
import { IUserSimple } from '../auth/authTypes'

export const eventUserHistoryApi = createApi({
  reducerPath: 'eventUserHistoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['EventUserHistory', 'EventUsersAutocomplete'],

  endpoints: (builder) => ({
    getEventHistory: builder.query<IEventHistory[], IEventHistoryRequest>({
      query: ({ eventId, params }) => ({
        url: `event-user-history/history/${eventId}`,
        params,
      }),
      providesTags: (result, error, { eventId }) => [
        { type: 'EventUserHistory', id: eventId },
      ],
    }),

    getEventUsersByIds: builder.query<IUserSimple[], IEventUserIdsRequest>({
      query: ({ eventId, userIds }) => ({
        url: `event-user-history/users-by-ids/${eventId}`,
        params: { userIds },
      }),
    }),

    searchEventUsers: builder.query<IUserSimple[], ISearchQueryRequest>({
      query: ({ eventId, params }) => ({
        url: `event-user-history/search-users/${eventId}`,
        params,
      }),
      providesTags: (result, error, { eventId }) => [
        { type: 'EventUsersAutocomplete', id: eventId },
      ],
    }),

    getEventHistoryMetrics: builder.query<
      IEventHistoryMetrics,
      { eventId: number }
    >({
      query: ({ eventId }) => ({
        url: `event-user-history/metrics/${eventId}`,
      }),
      providesTags: (result, error, { eventId }) => [
        { type: 'EventUserHistory', id: eventId },
      ],
    }),
  }),
})

export const {
  useGetEventHistoryQuery,
  useSearchEventUsersQuery,
  useGetEventHistoryMetricsQuery,
  useGetEventUsersByIdsQuery,
} = eventUserHistoryApi
