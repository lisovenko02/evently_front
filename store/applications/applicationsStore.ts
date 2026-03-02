import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IApplicationStore {
  submitted: boolean
  setSubmitted: (value: boolean) => void
}

export const useApplicationsStore = create<IApplicationStore>()(
  devtools(
    (set) => ({
      submitted: false,
      setSubmitted: (value) => set({ submitted: value }),
    }),
    { name: 'ApplicationsStore' }
  )
)
