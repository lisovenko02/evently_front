import Image from 'next/image'
import Link from 'next/link'
import { ActorProps } from '../../../types/applicationsComponents.types'

const Actor = ({ user, subtle = false, badge }: ActorProps) => (
  <Link
    href={`/users/${user.id}`}
    className="flex items-center gap-2 group min-w-0"
  >
    <div className="relative w-8 h-8 sm:w-9 sm:h-9">
      <Image
        src={user.avatar || '/default-avatar.png'}
        alt={user.username}
        fill
        sizes="32px"
        className="rounded-full object-cover"
      />
    </div>

    <div className="flex items-center gap-2 min-w-0">
      <span
        className={`text-sm font-medium truncate group-hover:underline ${
          subtle ? 'text-gray-400' : 'text-gray-200'
        }`}
      >
        {user.username}
      </span>

      {badge && (
        <span className="text-[8px] sm:text-[9px] px-1.5 py-[1px] rounded uppercase tracking-wider font-medium text-gray-500 border border-gray-700">
          {badge}
        </span>
      )}
    </div>
  </Link>
)

export default Actor
