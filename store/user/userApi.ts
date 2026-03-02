import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUserProfile } from './userTypes'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],

  endpoints: (builder) => ({
    getUserProfileById: builder.query<IUserProfile, { userId: number }>({
      query: ({ userId }) => `user/${userId}`,
    }),
  }),
})

export const { useGetUserProfileByIdQuery } = userApi
