import { memo, useMemo } from 'react'
import Image from 'next/image'

import clsx from 'clsx'
import EventBadges from './EventBadges'

import { HeroSectionProps } from '../../_types/eventComponents.types'
import {
  getCategoryColor,
  getCategoryIcon,
} from '@/app/(root)/_utils/categoryUtils'
import {
  getVisibilityIcon,
  visibilityBadgeColor,
} from '@/app/(root)/_utils/visibilityUtils'
import { getModeIcon } from '@/app/(root)/_utils/modeUtils'

const HeroSection = ({
  category,
  visibility,
  isOnline,
  image,
  title,
}: HeroSectionProps) => {
  const badges = useMemo(
    () => [
      {
        key: 'category',
        label: 'Category',
        value: category,
        icon: getCategoryIcon(category),
        color: getCategoryColor(category),
      },
      {
        key: 'visibility',
        label: 'Visibility',
        value: visibility,
        icon: getVisibilityIcon(visibility),
        color: visibilityBadgeColor[visibility],
      },
      {
        key: 'mode',
        label: 'Mode',
        value: isOnline ? 'ONLINE' : 'OFFLINE',
        icon: getModeIcon(isOnline ? 'Online' : 'Offline'),
        color: isOnline
          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      },
    ],
    [category, visibility, isOnline],
  )

  return (
    <div
      className={clsx(
        'w-full rounded-3xl overflow-hidden shadow-lg group',
        'lg:w-1/2 lg:sticky lg:top-0 lg:h-full',
      )}
    >
      <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:h-full">
        <Image
          src={image ?? '/default.png'}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 sm:gap-1">
          {badges.map((badge) => (
            <EventBadges key={badge.key} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(HeroSection)
