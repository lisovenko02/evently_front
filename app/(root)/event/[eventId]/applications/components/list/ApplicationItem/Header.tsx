import { statusStyles, typeStyles } from '../../../constants/applicationStyles'
import { HeaderProps } from '../../../types/applicationsComponents.types'
import Actor from './Actor'

const Header = ({ item }: HeaderProps) => {
  const mainUser = item.type === 'INVITE' ? item.receiver : item.sender

  return (
    <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center justify-between gap-2 sm:gap-3">
      <div className="flex items-center gap-2 order-1 sm:order-none">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${typeStyles[item.type]}`}
        >
          {item.type}
        </span>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[item.applicationStatus]}`}
        >
          {item.applicationStatus}
        </span>
      </div>

      {/* USER INFO */}
      <div className="min-w-0 order-2 sm:order-none mt-1 sm:mt-0">
        {mainUser && <Actor user={mainUser} />}
      </div>
    </div>
  )
}

export default Header
