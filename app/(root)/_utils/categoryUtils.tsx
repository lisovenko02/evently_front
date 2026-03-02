import { EventCategory } from '@/app/types/eventTypes'
import {
  BookOpenText,
  BriefcaseBusiness,
  Cpu,
  Flower,
  Gamepad2,
  Music,
  Palette,
  Volleyball,
} from 'lucide-react'

export const getCategoryColor = (category: EventCategory) => {
  switch (category) {
    case 'GAMING':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'SPORTS':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    case 'MUSIC':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'EDUCATION':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'BUSINESS':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'TECH':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    case 'ART':
      return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    default:
      return 'bg-primary/20 text-primary border-primary/30'
  }
}

export const getCategoryIcon = (category: EventCategory) => {
  const iconClass = 'w-5 h-5'

  switch (category) {
    case 'GAMING':
      return <Gamepad2 className={`${iconClass} text-green-400`} />
    case 'SPORTS':
      return <Volleyball className={`${iconClass} text-orange-400`} />
    case 'MUSIC':
      return <Music className={`${iconClass} text-purple-400`} />
    case 'EDUCATION':
      return <BookOpenText className={`${iconClass} text-blue-400`} />
    case 'BUSINESS':
      return <BriefcaseBusiness className={`${iconClass} text-amber-400`} />
    case 'TECH':
      return <Cpu className={`${iconClass} text-cyan-400`} />
    case 'ART':
      return <Palette className={`${iconClass} text-pink-400`} />
    default:
      return <Flower className={`${iconClass} text-primary`} />
  }
}
