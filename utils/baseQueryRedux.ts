import { RootState } from '@/store/api'
import { logout, setAuthData } from '@/store/auth/authSlice'
import { ILoginResponse } from '@/store/auth/authTypes'
import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
  QueryReturnValue,
  FetchArgs,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.accessToken

    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
): Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
  const result = await baseQuery(args, api, extraOptions)
  console.log('result', result)
  if (result.error && result.error.status === 401) {
    try {
      // const state = api.getState() as RootState
      // console.log('state', state)
      // const user = state.auth.user

      // if (!user) {
      //   console.error('User ID is missing')
      //   api.dispatch(logout())
      //   return result
      // }

      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          credentials: 'include',
        },
        api,
        extraOptions
      )
      console.log('refreshResult', refreshResult)
      if (refreshResult.data) {
        const data = refreshResult.data as ILoginResponse
        // api.dispatch(setAccessToken(accessToken))
        // api.dispatch(setUser(user))
        api.dispatch(setAuthData(data))
        return await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logout())
      }
    } catch {
      api.dispatch(logout())
    }
  }

  return result
}

export default baseQueryWithReauth
