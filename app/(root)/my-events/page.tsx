'use client'

import { useGetUserEventsQuery } from '@/store/events/eventsApi'
import Image from 'next/image'
import React from 'react'
import { Users, Eye } from 'lucide-react'
import Link from 'next/link'

const MyEvents = () => {
  const { data: events } = useGetUserEventsQuery()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-light">My Events</h1>
          <p className="text-gray text-sm">You’re shaping the world!</p>
        </div>
        <button className="bg-primary text-black px-4 py-2 rounded-xl font-semibold hover:bg-primary-dark transition-all">
          + Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mb-6 text-sm">
        {['All', 'Created', 'Joined', 'Pending'].map((filter) => (
          <button
            key={filter}
            className="px-3 py-1 rounded-full bg-accent-dark text-light hover:bg-primary transition-all duration-300"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events &&
          events.map((event) => (
            <div
              key={event.id}
              className="bg-accent-gray rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-40">
                <Image
                  src={event.image}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                />

                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                  {event.isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-light truncate">
                  {event.title}
                </h3>
                <p className="text-primary text-sm">{event.category}</p>
                {/* {!event.isOnline && (
                  <>
                    <p className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin size={16} />
                      {event.city}, {event.country}
                    </p>
                  </>
                )} */}
                <p className="flex gap-1 text-gray-300 text-sm">
                  <span className="font-semibold text-primary">Members:</span>{' '}
                  <Users size={16} />
                  {event.membersCount}
                  {event.maxParticipants && ` / ${event.maxParticipants}`}
                </p>
                {/* <p className="flex gap-1 text-gray-300 text-sm">
                  <span className="font-semibold text-primary">Your Role:</span>{' '}
                  {event.role === 'Organizer' && (
                    <Crown size={16} color="yellow" />
                  )}
                  {event.role}
                </p> */}
                {/* <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-primary">
                    Your Status:
                  </span>{' '}
                  {event.status}
                </p> */}
                <div className="flex justify-between mt-4">
                  <Link
                    href={`/event/${event.id}`}
                    className="flex items-center gap-1 bg-primary text-dark px-3 py-1 rounded-lg text-sm"
                  >
                    <Eye size={14} /> View
                  </Link>
                  {/* {user?.id === event.organizerId && (
                    <button className="flex items-center gap-1 bg-red-500 text-light px-3 py-1 rounded-lg text-sm">
                      <Pencil size={14} /> Manage
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {events?.length === 0 && (
        <div className="text-center mt-20 text-gray">
          <p className="text-xl mb-2">🗂 No events yet...</p>
          <p className="mb-4">
            Create your first event or join an existing one!
          </p>
          <button className="bg-primary text-black px-4 py-2 rounded-xl font-semibold hover:bg-primary-dark transition-all">
            + Create Event
          </button>
        </div>
      )}
    </div>
  )
}

export default MyEvents
