import { HiKey, HiLockClosed, HiLockOpen } from 'react-icons/hi2'

export const getVisibilityIcon = (visibility: string) => {
  switch (visibility) {
    case 'OPEN':
      return <HiLockOpen className="w-4 h-4 text-green-400" />
    case 'CLOSED':
      return <HiLockClosed className="w-4 h-4 text-red-400" />
    case 'PRIVATE':
      return <HiKey className="w-4 h-4 text-purple-400" />
    default:
      return <HiLockOpen className="w-4 h-4 text-primary" />
  }
}

export const visibilityBadgeColor = {
  OPEN: 'bg-green-500/20 text-green-400 border-green-500/30',
  CLOSED: 'bg-red-500/20 text-red-400 border-red-500/30',
  PRIVATE: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}
