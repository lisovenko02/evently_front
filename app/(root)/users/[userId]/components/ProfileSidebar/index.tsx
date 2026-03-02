import Image from 'next/image'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { useAuthStore } from '@/store/auth/authStore'
import { useParams } from 'next/navigation'
import Button from '@/components/ui/Button'

import InviteToEventModal from '../modals/InviteToEventModal'
import { ProfileSidebarProps } from '../../types/userProfileComponents.types'

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const { userId } = useParams()

  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)

  const { user: currentUser } = useAuthStore()

  const targetUserId = Number(userId)
  const isCurrentUserProfile = currentUser && currentUser.id === targetUserId
  const isOtherUserProfile = currentUser && currentUser.id !== targetUserId

  const handleOpenInviteModal = () => {
    setShowInviteModal(true)
  }

  return (
    // potom redag profile
    <div className="flex flex-col gap-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 lg:w-48 lg:h-48 mb-6">
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            fill
            className="rounded-full object-cover border-4 border-primary shadow-xl"
          />
        </div>

        {/* Nickname + Verification */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src="https://events2025.s3.eu-north-1.amazonaws.com/4/18e73280-fc64-4966-bb87-ded210f3ad9b"
            alt="Pinned pin"
            width={50}
            height={50}
            className="rounded-full border-2 border-primary/60"
          />
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {user.username}
            <span className="text-blue-400 text-lg">✓</span>
          </h1>
        </div>

        {/* Full Name & Email */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-light mb-1">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-text-gray text-sm">{user.email}</p>
        </div>
      </div>

      {/* Member Since */}
      <div className="bg-accent-gray rounded-xl p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <h3 className="font-semibold text-light">Member Since</h3>
        </div>
        <p className="text-text-gray text-sm">
          {format(new Date(user.createdAt), 'MMM dd, yyyy')}
        </p>
      </div>

      {isOtherUserProfile && (
        <div className="mt-6">
          <Button
            label="Invite to ..."
            variant="primary"
            onClick={handleOpenInviteModal}
            size="small"
          />
        </div>
      )}

      {isCurrentUserProfile && (
        <div className="mt-6">
          <Button
            label="Edit Profile"
            variant="secondary"
            onClick={() => {
              /* potom */
            }}
            size="small"
          />
        </div>
      )}

      <InviteToEventModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  )
}

export default ProfileSidebar
