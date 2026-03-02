import {
  getCategoryColor,
  getCategoryIcon,
} from '@/app/(root)/_utils/categoryUtils'
import Button from '@/components/ui/Button'
import {
  ArrowRight,
  CalendarPlus,
  Coins,
  Globe,
  MapPin,
  UserCog,
  UsersRound,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EventsSectionProps } from '../../types/userProfileComponents.types'

const EventsSection = ({
  userEvents,
  eventsSectionRef,
}: EventsSectionProps) => {
  const [showAllEvents, setShowAllEvents] = useState(false)

  const router = useRouter()

  const displayedEvents = showAllEvents
    ? userEvents || []
    : userEvents?.slice(0, 4) || []

  const hasMoreEvents = userEvents.length > 4

  const handleEventClick = (eventId: number) => {
    router.push(`/event/${eventId}`)
  }

  const handleShowMore = () => setShowAllEvents(true)
  const handleShowLess = () => setShowAllEvents(false)

  const getRoleStyle = (role: string) => {
    switch (role.toUpperCase()) {
      case 'ORGANIZER':
        return 'bg-red-500/80 text-white border-red-600/60 backdrop-blur-sm'
      case 'MODERATOR':
        return 'bg-green-500/80 text-white border-green-600/60 backdrop-blur-sm'
      case 'USER':
      default:
        return 'bg-gray-500/80 text-white border-gray-600/60 backdrop-blur-sm'
    }
  }

  return (
    <div
      ref={eventsSectionRef}
      className="bg-accent-gray rounded-xl p-6 border border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Events</h2>
        <span className="text-text-gray">{userEvents.length} total</span>
      </div>

      {userEvents.length === 0 ? (
        <div className="text-center py-12">
          <CalendarPlus className="w-16 h-16 text-text-gray mx-auto mb-4 opacity-50" />
          <p className="text-text-gray text-lg mb-4">No events yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-bg-gray rounded-lg p-4 border border-gray-700 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:shadow-lg"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="relative mb-3">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-3 left-3 w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-110 ${
                      getCategoryColor(event.category).split(' ')[0]
                    } border ${
                      getCategoryColor(event.category).split(' ')[2]
                    } flex items-center justify-center backdrop-blur-sm`}
                  >
                    {getCategoryIcon(event.category)}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all duration-300 border backdrop-blur-sm ${getRoleStyle(
                        event.role,
                      )}`}
                    >
                      <UserCog className="w-3 h-3" />
                      {event.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg line-clamp-2 text-light flex-1 pr-2 leading-tight">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs mt-1 flex-shrink-0 bg-accent-dark px-2 py-1 rounded-full border border-gray-600">
                    {event.isOnline ? (
                      <Globe className="w-3 h-3 text-blue-400" />
                    ) : (
                      <MapPin className="w-3 h-3 text-green-400" />
                    )}
                    <span
                      className={
                        event.isOnline ? 'text-blue-400' : 'text-green-400'
                      }
                    >
                      {event.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  {/* Категорія та учасники */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-light">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">
                        {event.points || 0} points
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-gray">
                      <UsersRound className="w-4 h-4 text-blue-400" />
                      <span>
                        {event.membersCount}
                        {event.maxParticipants && `/${event.maxParticipants}`}
                      </span>
                    </div>
                  </div>

                  {/* Кнопка деталей */}
                  <div className="flex justify-end items-center pt-2 border-t border-gray-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEventClick(event.id)
                      }}
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-all duration-300 text-sm font-medium group/details bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full border border-primary/20"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3 group-hover/details:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMoreEvents && (
            <div className="mt-6 text-center">
              {!showAllEvents ? (
                <Button
                  label="Load More Events"
                  variant="primary"
                  onClick={handleShowMore}
                  // icon={<ArrowRight className="w-4 h-4" />}
                />
              ) : (
                <Button
                  label="Show Less"
                  variant="secondary"
                  onClick={handleShowLess}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EventsSection
