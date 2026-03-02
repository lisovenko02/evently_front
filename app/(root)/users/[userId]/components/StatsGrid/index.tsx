import React from 'react'

import { Award, Star, Target, UsersRound } from 'lucide-react'

import { StatsGridProps } from '../../types/userProfileComponents.types'

const StatsGrid = ({
  userStats,
  eventsSectionRef,
  handleOpenPinsModal,
  pinsLoading,
  pinsFetching,
}: StatsGridProps) => {
  const scrollToEventsSection = () => {
    if (!eventsSectionRef.current) return

    const isMobile = window.innerWidth < 1024

    if (isMobile) {
      const scrollContainer = document.querySelector('.mobile-scroll-wrapper')
      if (!scrollContainer) return

      const sectionTop = eventsSectionRef.current.offsetTop - 80

      scrollContainer.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      })
    } else {
      const scrollContainer = document.querySelector('.scrollable-content')
      if (!scrollContainer) return

      const headerHeight = 80
      const sectionTop = eventsSectionRef.current.offsetTop - headerHeight - 16
      scrollContainer.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
      <div className="bg-accent-gray rounded-xl p-4 text-center border border-gray-700 hover:border-primary/40 transition-colors group">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-green-400" />
          <div className="text-2xl font-bold text-green-400">
            {userStats.totalPoints}
          </div>
        </div>
        {/* potom url na dodep */}
        <div className="text-sm text-text-gray">Points</div>
      </div>

      <button
        onClick={handleOpenPinsModal}
        disabled={pinsLoading || pinsFetching}
        className="bg-accent-gray rounded-xl p-4 text-center border border-gray-700 hover:border-primary/40 transition-colors group"
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-blue-400" />
          <p className="text-2xl font-bold text-blue-400 disabled:opacity-50 transition-opacity">
            {userStats.pinsEarned}
          </p>
        </div>
        <div className="text-sm text-text-gray">Pins earned</div>
      </button>

      <div
        className="bg-accent-gray rounded-xl p-4 text-center border border-gray-700 hover:border-primary/40 transition-colors group cursor-pointer"
        onClick={scrollToEventsSection}
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-purple-400" />
          <div className="text-2xl font-bold text-purple-400">
            {userStats.eventsCreated}
          </div>
        </div>
        <div className="text-sm text-text-gray">Events Created</div>
      </div>

      <div
        className="bg-accent-gray rounded-xl p-4 text-center border border-gray-700 hover:border-primary/40 transition-colors group cursor-pointer"
        onClick={scrollToEventsSection}
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          <UsersRound className="w-5 h-5 text-yellow-400" />
          <div className="text-2xl font-bold text-yellow-400">
            {userStats.eventsJoined}
          </div>
        </div>
        <div className="text-sm text-text-gray">Events Joined</div>
      </div>
    </div>
  )
}

export default StatsGrid
