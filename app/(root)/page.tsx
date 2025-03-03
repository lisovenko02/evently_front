'use client'

import { useGetEventsQuery } from '@/store/events/eventsApi'
import Image from 'next/image'
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
        {events?.map((event) => (
          // <div
          //   key={event.id}
          //   className="border border-primary-dark rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden bg-accent-gray2 text-light"
          // >
          //   <div className="relative">
          //     <Image
          //       src={
          //         event.image ||
          //         'https://events2025.s3.eu-north-1.amazonaws.com/5/7419562a-6582-4c93-853d-0a466f54c14e'
          //       }
          //       width={150}
          //       height={150}
          //       alt={event.title}
          //       className="w-full h-48 object-cover"
          //     />
          //     <div className="absolute top-0 left-0 bg-primary-dark bg-opacity-90 text-white p-2 text-xs font-semibold uppercase tracking-wide rounded-br-lg">
          //       {event.eventStatus}
          //     </div>
          //   </div>
          //   <div className="p-5">
          //     <div className="flex justify-between items-center mb-4">
          //       <h2 className="text-2xl font-bold text-primary-light mb-2">
          //         {event.title}
          //       </h2>
          //       <div className="flex gap-2 items-center space-x-2">
          //         <h3>Organizer</h3>
          //         <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400">
          //           <Image
          //             src="https://events2025.s3.eu-north-1.amazonaws.com/5/7419562a-6582-4c93-853d-0a466f54c14e" // Placeholder for organizer's image
          //             width={32}
          //             height={32}
          //             alt="Organizer"
          //           />
          //         </div>
          //       </div>
          //     </div>

          //     {/* Категорія */}
          //     <p className="text-gray-300 mb-3">
          //       <span className="font-semibold text-primary-light">
          //         Category:{' '}
          //       </span>
          //       {event.category}
          //     </p>

          //     {/* Онлайн / Офлайн */}
          //     <div className="flex justify-between items-center mb-3">
          //       <span
          //         className={`text-sm font-semibold ${
          //           event.isOnline ? 'text-green-500' : 'text-red-500'
          //         }`}
          //       >
          //         {event.isOnline ? 'Online' : 'Offline'}
          //       </span>

          //       {!event.isOnline && (
          //         <span className="text-sm text-gray-300">
          //           {event.city}, {event.country}
          //         </span>
          //       )}
          //     </div>

          //     {/* Дата початку */}
          //     {event.startTime && (
          //       <div className="flex justify-between items-center mb-3">
          //         <span className="text-gray-300">Start Date:</span>
          //         <span className="font-semibold text-primary-light">
          //           {new Date(event.startTime).toLocaleDateString()}
          //         </span>
          //       </div>
          //     )}

          //     {/* Ліміт учасників */}
          //     <div className="flex gap-2 items-center mb-3">
          //       <span className="text-gray-300">Members Limit:</span>
          //       <span className="font-semibold text-primary-light">
          //         {event.membersLimit}
          //       </span>
          //     </div>

          //     {/* Бали */}
          //     <div className="flex gap-2 items-center mb-3">
          //       <span className="text-gray-300">Points:</span>
          //       <span className="font-semibold text-primary-light">
          //         {event.points}
          //       </span>
          //     </div>
          //   </div>
          // </div>
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  )
}

export default Homepage
