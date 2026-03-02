import { IEventContext } from '@/store/events/eventsTypes'
import { createContext, useContext } from 'react'

export interface IEventContextWithSetter extends IEventContext {
  setEventContext: (
    ctx: Partial<IEventContext> | ((prev: IEventContext) => IEventContext),
  ) => void
}

const EventContext = createContext<IEventContextWithSetter | undefined>(
  undefined,
)

export const EventContextProvider = EventContext.Provider

export const useEventContext = () => {
  const ctx = useContext(EventContext)
  if (!ctx) throw new Error('useEventContext must be inside EventLayout')
  return ctx
}
