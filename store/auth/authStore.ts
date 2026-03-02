import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IAuthState } from './authTypes'

export const useAuthStore = create<IAuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthLoaded: false,

      setAuthData: (data) =>
        set({
          accessToken: data.accessToken,
          user: data.user,
          isAuthLoaded: true,
        }),

      logout: () => set({ accessToken: null, user: null }),

      setAuthLoaded: (loaded: boolean) => set({ isAuthLoaded: loaded }),
    }),
    { name: 'AuthStore' }
  )
)
