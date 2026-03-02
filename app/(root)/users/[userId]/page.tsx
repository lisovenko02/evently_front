'use client'

import { useLazyGetUserPinsByIdQuery } from '@/store/pins/pinsApi'
import { useGetUserProfileByIdQuery } from '@/store/user/userApi'

import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import UserPinsModal from './components/modals/UserPinsModal'
import ProfileSidebar from './components/ProfileSidebar'
import StatsGrid from './components/StatsGrid'
import CategoryStatistics from './components/CategoryStatistics'
import EventsSection from './components/EventsSection'
import { showErrorToast } from '@/utils/showErrorToast'

const UserProfilePage = () => {
  const { userId } = useParams()
  const userIdNumber = Number(userId)
  const eventsSectionRef = useRef<HTMLDivElement>(null)

  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetUserProfileByIdQuery({ userId: userIdNumber })

  const [
    getUserPins,
    { data: pinsData, isLoading: pinsLoading, isFetching: pinsFetching },
  ] = useLazyGetUserPinsByIdQuery()

  const [showPinsModal, setShowPinsModal] = useState(false)

  const handleOpenPinsModal = async () => {
    try {
      await getUserPins(userIdNumber).unwrap()
      setShowPinsModal(true)
    } catch (error) {
      showErrorToast(error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  if (error || !userProfile) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center text-red-400">
        User not found
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)]">
      {/* Left Side - ProfileSidebar */}
      <aside className="w-full lg:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-gray-700 p-6 lg:p-8">
        <div className="sticky top-0">
          <ProfileSidebar user={userProfile.user} />
        </div>
      </aside>
      {/* Right Side - Контент */}
      <div className="flex-1 min-w-0 overflow-visible lg:overflow-y-auto px-4 py-4 space-y-8">
        {/* COMPONENTS */}
        <StatsGrid
          userStats={userProfile.stats}
          eventsSectionRef={eventsSectionRef}
          pinsLoading={pinsLoading}
          pinsFetching={pinsFetching}
          handleOpenPinsModal={handleOpenPinsModal}
        />

        {userProfile.categoryStats && (
          <CategoryStatistics categoryStats={userProfile.categoryStats} />
        )}

        <EventsSection
          userEvents={userProfile.events}
          eventsSectionRef={eventsSectionRef}
        />
      </div>
      {pinsData && (
        <UserPinsModal
          isOpen={showPinsModal}
          onClose={() => setShowPinsModal(false)}
          pins={pinsData.pins || []}
          totalOwned={pinsData.totalOwned || 0}
          totalAvailable={pinsData.totalAvailable || 0}
        />
      )}
    </div>
  )
}

export default UserProfilePage
