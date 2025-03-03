import { createApi } from '@reduxjs/toolkit/query/react'
import { ILoginRequest, ILoginResponse } from './authTypes'
import { useAuthStore } from './authStore'
import baseQueryWithReauth from '@/utils/baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (loginData) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: loginData,
        credentials: 'include',
      }),
      transformResponse: (response: ILoginResponse) => ({
        user: response.user,
        accessToken: response.accessToken,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('data', data)
          useAuthStore.getState().setAuthData(data)
        } catch (err) {
          console.error('Login error:', err)
        }
      },
    }),
    register: builder.mutation({
      query: (registerData) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: registerData,
      }),
    }),
    refreshTokens: builder.mutation<ILoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('data', data)
          useAuthStore.getState().setAuthData(data)
        } catch (err) {
          console.error('Refresh token error:', err)
          useAuthStore.getState().logout()
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryStarted: async () => {
        useAuthStore.getState().logout()
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokensMutation,
  useLogoutMutation,
} = authApi
