import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IApplicationInviteResponse,
  ICreateApplicationRequest,
  ICreatedApplication,
  IEventApplication,
  IEventApplicationsMetrics,
  IEventApplicationsRequest,
  IEventApplicationsResponse,
  IEventApplicationWithEvent,
  IUpdateApplicationStatusRequest,
} from './applicationsTypes'

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Applications', 'ApplicationsMetrics', 'EventContext'],

  endpoints: (builder) => ({
    createApplication: builder.mutation<
      ICreatedApplication,
      ICreateApplicationRequest
    >({
      query: ({ eventId, data }) => ({
        url: `application/${eventId}/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: 'Applications', id: eventId },
        { type: 'ApplicationsMetrics', id: eventId },
        { type: 'EventContext', id: eventId },
      ],
    }),

    getEventApplications: builder.query<
      IEventApplicationsResponse,
      IEventApplicationsRequest
    >({
      query: ({ eventId, params }) => ({
        url: `application/event/${eventId}`,
        params,
      }),

      providesTags: (result, error, { eventId }) => [
        { type: 'Applications', id: eventId },
      ],
    }),

    getInviteApplicationById: builder.query<
      IApplicationInviteResponse,
      { applicationId: number }
    >({
      query: ({ applicationId }) => ({
        url: `application/invites/${applicationId}`,
      }),
    }),

    getEventApplicationsMetrics: builder.query<
      IEventApplicationsMetrics,
      { eventId: number }
    >({
      query: ({ eventId }) => ({
        url: `application/event/metrics/${eventId}`,
      }),

      providesTags: (result, error, { eventId }) => [
        { type: 'ApplicationsMetrics', id: eventId },
      ],
    }),

    getUserApplications: builder.query<IEventApplicationWithEvent[], void>({
      query: () => `application/user`,
    }),

    updateApplicationStatus: builder.mutation<
      IEventApplication,
      IUpdateApplicationStatusRequest
    >({
      query: ({ applicationId, data }) => ({
        url: `application/status/${applicationId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: 'Applications', id: eventId },
        { type: 'ApplicationsMetrics', id: eventId },
        { type: 'EventContext', id: eventId },
      ],
    }),
  }),
})

export const {
  useCreateApplicationMutation,
  useGetEventApplicationsQuery,
  useGetInviteApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useGetUserApplicationsQuery,
  useGetEventApplicationsMetricsQuery,
} = applicationsApi
