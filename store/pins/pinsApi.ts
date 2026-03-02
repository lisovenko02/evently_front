import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUserPinsResponse } from './pinsTypes'

export const pinsApi = createApi({
  reducerPath: 'pinsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],

  endpoints: (builder) => ({
    getUserPinsById: builder.query<IUserPinsResponse, number>({
      query: (userId) => `user-pin/${userId}`,
      providesTags: () => [],
    }),
  }),
})

export const { useGetUserPinsByIdQuery, useLazyGetUserPinsByIdQuery } = pinsApi
