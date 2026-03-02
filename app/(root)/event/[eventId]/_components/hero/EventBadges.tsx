import clsx from 'clsx'
import { EventBadgesProps } from '../../_types/eventComponents.types'



const EventBadges = ({ badge }: EventBadgesProps) => {
  return (
    <div
      className={clsx(
        'group relative flex items-center gap-1 px-3 py-1.5 rounded text-sm font-semibold shadow transition-all duration-300',
        badge.color,
        'hover:scale-105 hover:shadow-lg',
      )}
    >
      {badge.icon}
      {badge.value}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-text-gray bg-black/70 px-2 py-0.5 rounded whitespace-nowrap z-10">
        {badge.label}
      </span>
    </div>
  )
}

export default EventBadges
