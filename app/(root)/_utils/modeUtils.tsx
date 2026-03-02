import { RiWifiFill, RiWifiOffFill } from 'react-icons/ri'

export const getModeIcon = (mode: 'Online' | 'Offline') => {
  if (mode === 'Online') return <RiWifiFill className="w-4 h-4 text-blue-400" />
  return <RiWifiOffFill className="w-4 h-4 text-yellow-400" />
}
