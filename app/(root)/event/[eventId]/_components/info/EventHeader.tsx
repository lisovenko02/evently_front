import Image from 'next/image'
import Link from 'next/link'
import { EventHeaderProps } from '../../_types/eventComponents.types'

const EventHeader = ({ title, organizer }: EventHeaderProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b-2 border-dark gap-2">
    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold sm:max-w-[60%] truncate">
      {title}
    </h1>
    <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-base lg:text-lg">
      <div className="max-w-[120px] sm:max-w-[150px] md:max-w-[200px] truncate">
        <p className="text-xs sm:text-sm text-text-gray">Organized by</p>
        <Link
          href={`/users/${organizer.id}`}
          className="font-semibold truncate hover:underline"
        >
          {organizer.username}
        </Link>
      </div>
      <Link href={`/users/${organizer.id}`}>
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-primary cursor-pointer">
          <Image
            src={organizer.avatar ?? '/default.png'}
            alt={organizer.username ?? 'organizer'}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  </div>
)

export default EventHeader
