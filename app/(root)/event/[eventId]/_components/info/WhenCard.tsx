import { FcCalendar } from 'react-icons/fc'
import { WhenCardProps } from '../../_types/eventComponents.types'

const WhenCard = ({ startDate, endDate }: WhenCardProps) => (
  <div className="bg-accent-gray2 rounded-xl p-4 flex flex-col gap-2">
    <div className="flex items-center gap-1 text-xs text-text-gray">
      <FcCalendar size={16} /> When?
    </div>
    <div className="flex flex-col text-sm">
      <span className="font-semibold text-light">
        {startDate?.day} {startDate?.month}
        {endDate && `- ${endDate.day} ${endDate.month}`}
      </span>
      <span className="text-text-gray text-xs">
        {startDate?.time} {endDate && `- ${endDate.time}`}
      </span>
    </div>
  </div>
)

export default WhenCard
