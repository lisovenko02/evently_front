import { useAuthStore } from '@/store/auth/authStore'
import { ILoginResponse } from '@/store/auth/authTypes'
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = useAuthStore.getState().accessToken
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          credentials: 'include',
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        const data = refreshResult.data as ILoginResponse
        useAuthStore.getState().setAuthData(data)
        return await baseQuery(args, api, extraOptions)
      } else {
        useAuthStore.getState().logout()
      }
    } catch {
      useAuthStore.getState().logout()
    }
  }

  return result
}

export default baseQueryWithReauth
