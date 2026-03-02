'use client'

import { useGetEventsQuery } from '@/store/events/eventsApi'
import React from 'react'
import EventCard from '../components/EventCard'

const Homepage = () => {
  const { data: events, error, isLoading } = useGetEventsQuery()

  if (isLoading)
    return <p className="text-center text-light">Loading events...</p>
  if (error)
    return <p className="text-center text-light">Error fetching events</p>

  return (
    <div className="container mx-auto p-4 text-light">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        All Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events &&
          events.map((event) => <EventCard event={event} key={event.id} />)}
      </div>
    </div>
  )
}

export default Homepage
