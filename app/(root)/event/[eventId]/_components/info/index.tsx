import { FaLock } from 'react-icons/fa'

import DesktopCTA from './DesktopCTA'
import EventHeader from './EventHeader'
import DescriptionCard from './DescriptionCard'
import MembersCard from './Stats/MembersCard'
import PointsCard from './Stats/PointsCard'
import WhenCard from './WhenCard'
import { InfoSectionProps } from '../../_types/eventComponents.types'

import dynamic from 'next/dynamic'

const WhereCard = dynamic(() => import('./WhereCard'), {
  ssr: true,
})

const InfoSection = ({
  event,
  cta,
  stableLocation,
  onCTA,
}: InfoSectionProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString('en-US', { day: 'numeric' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }

  const startDate = formatDate(event.startTime)
  const endDate = formatDate(event.endTime)

  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:h-full lg:min-h-0 relative">
      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 lg:overflow-y-auto p-4 pb-[120px] lg:pb-6 flex flex-col gap-5">
        {/* TITLE & ORGANIZER SECTION */}
        <EventHeader title={event.title} organizer={event.organizer} />
        {/* Description */}
        {event.description && (
          <DescriptionCard description={event.description} />
        )}
        {/* STATS CARDS */}
        <div className="grid lg:grid-cols-2 gap-2">
          <MembersCard event={event} />

          {event.points && <PointsCard points={event.points} />}
        </div>

        {/* WHEN CARD */}
        {(startDate || endDate) && (
          <WhenCard startDate={startDate} endDate={endDate} />
        )}

        {/* WHERE CARD */}
        {!event.isOnline && stableLocation && (
          <WhereCard location={stableLocation} />
        )}

        {/* PRIVATE/CLOSED NOTICE */}
        {(event.visibility === 'PRIVATE' || event.visibility === 'CLOSED') && (
          <div className="bg-accent-gray rounded-xl p-3 flex items-center gap-1 text-xs text-primary-light">
            <FaLock size={16} />
            {event.visibility === 'CLOSED'
              ? 'Closed event — invitation or approval required'
              : 'Private event - invitation required'}
          </div>
        )}
      </div>

      {/* BUTTON */}
      {cta && <DesktopCTA cta={cta} onClick={onCTA} />}
    </div>
  )
}

export default InfoSection
