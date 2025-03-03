import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IAuthState } from './authTypes'

export const useAuthStore = create<IAuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      user: null,
      setAuthData: (data) =>
        set({ accessToken: data.accessToken, user: data.user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    { name: 'AuthStore' }
  )
)
