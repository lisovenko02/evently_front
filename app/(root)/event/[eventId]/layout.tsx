'use client'

import { EventContextProvider } from '@/contexts/EventContext'
import { useGetEventContextQuery } from '@/store/events/eventsApi'
import { IEventContext } from '@/store/events/eventsTypes'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function EventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { eventId } = useParams()

  const { data, isLoading } = useGetEventContextQuery({
    eventId: Number(eventId),
  })

  const [eventContextState, setEventContextState] =
    useState<IEventContext | null>(null)

  useEffect(() => {
    if (data) setEventContextState(data)
  }, [data])

  const setEventContext = useCallback(
    (
      ctx: Partial<IEventContext> | ((prev: IEventContext) => IEventContext),
    ) => {
      setEventContextState((prev) => {
        if (!prev) return prev

        if (typeof ctx === 'function') {
          return ctx(prev)
        }

        return { ...prev, ...ctx }
      })
    },
    [],
  )

  const contextValue = useMemo(() => {
    if (!eventContextState) return null

    return {
      ...eventContextState,
      setEventContext,
    }
  }, [eventContextState, setEventContext])

  const tabs = useMemo(
    () => [
      { name: 'Home', href: `/event/${eventId}` },
      { name: 'Chats', href: `/event/${eventId}/chats` },
      { name: 'Tasks', href: `/event/${eventId}/tasks` },
      { name: 'Members', href: `/event/${eventId}/members` },
      { name: 'Applications', href: `/event/${eventId}/applications` },
    ],
    [eventId],
  )

  if (isLoading || !contextValue) return <div>Loading...</div>

  return (
    <EventContextProvider value={contextValue}>
      <div className="flex flex-col h-full min-h-0">
        {/* TABS */}
        <div className="sticky z-40 bg-bg-gray border-b border-gray-700 px-10">
          <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-10 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`py-3 font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray hover:text-light'
                  }`}
                >
                  {tab.name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-10 py-6 min-h-0">
          {children}
        </div>
      </div>
    </EventContextProvider>
  )
}
