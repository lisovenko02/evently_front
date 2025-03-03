import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState, ILoginResponse } from './authTypes'
import { authApi } from './authApi'

const initialState: IAuthState = {
  accessToken: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setAccessToken: (state, action: PayloadAction<string>) => {
    //   state.accessToken = action.payload
    // },
    // setUser: (state, action: PayloadAction<IUserResponse>) => {
    //   state.user = action.payload
    // },
    setAuthData: (state, action: PayloadAction<ILoginResponse>) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
    },
    logout: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.refreshTokens.matchFulfilled,
      (state, action: PayloadAction<ILoginResponse>) => {
        state.accessToken = action.payload.accessToken
        if (action.payload.user) {
          state.user = action.payload.user
        }
      }
    )
    builder.addMatcher(
      authApi.endpoints.refreshTokens.matchRejected,
      (state) => {
        state.accessToken = null
        state.user = null
      }
    )
  },
})

export const { logout, setAuthData } = authSlice.actions
export default authSlice.reducer
