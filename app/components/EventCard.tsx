import { IEvent } from '@/store/events/eventsTypes'
import Image from 'next/image'
import React from 'react'

type PreviewEvent = {
  id: string
  title: string
  category: string
  points: number
  membersLimit?: number | null
  visibility?: 'OPEN' | 'CLOSED' | 'PRIVATE'
  isOnline: boolean
  image?: string | null
  city?: string | null
  country?: string | null
  startTime?: string
}

const EventCard = ({ event }: { event: PreviewEvent | IEvent }) => {
  console.log('event', event)
  return (
    <div
      key={event.id}
      className="border border-primary-dark rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden bg-accent-gray2 text-light"
    >
      <div className="relative">
        <Image
          src={
            event.image ||
            'https://events2025.s3.eu-north-1.amazonaws.com/5/7419562a-6582-4c93-853d-0a466f54c14e'
          }
          width={150}
          height={150}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 bg-primary-dark bg-opacity-90 text-white p-2 text-xs font-semibold uppercase tracking-wide rounded-br-lg">
          {event.visibility ? event.visibility : 'OPEN'}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary-light mb-2">
            {event.title}
          </h2>
          <div className="flex gap-2 items-center space-x-2">
            <h3>Organizer</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400">
              <Image
                src="https://events2025.s3.eu-north-1.amazonaws.com/1/31237fad-55ef-4f60-b8de-0dac532e60fe"
                width={52}
                height={52}
                className="rounded-lg"
                alt="Organizer"
              />
            </div>
          </div>
        </div>

        {/*Category */}
        <p className="text-gray-300 mb-3">
          <span className="font-semibold text-primary-light">Category: </span>
          {event.category}
        </p>

        {/* Online/ Offline */}
        <div className="flex justify-between items-center mb-3">
          <span
            className={`text-sm font-semibold ${
              event.isOnline ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {event.isOnline ? 'Online' : 'Offline'}
          </span>

          {/* {!event.isOnline && event.city && (
            <span className="text-sm text-gray-300">
              {event.city}, {event.country}
            </span>
          )} */}
        </div>

        {/* Date */}
        {event.startTime && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300">Start Date:</span>
            <span className="font-semibold text-primary-light">
              {new Date(event.startTime).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Members limit */}
        {/* <div className="flex gap-2 items-center mb-3">
          <span className="text-gray-300">Members Limit:</span>
          <span className="font-semibold text-primary-light">
            {event.membersLimit}
          </span>
        </div> */}

        {/* Points */}
        <div className="flex gap-2 items-center mb-3">
          <span className="text-gray-300">Points:</span>
          <span className="font-semibold text-primary-light">
            {event.points ? event.points : 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default EventCard
