import Modal from '@/components/ui/Modal'
import { useEventContext } from '@/contexts/EventContext'
import {
  useGetInviteApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
} from '@/store/applications/applicationsApi'
import {
  ApplicationDecisionStatus,
  IUpdateStatusData,
} from '@/store/applications/applicationsTypes'
import { showErrorToast } from '@/utils/showErrorToast'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { InviteModalProps } from '../../_types/eventComponents.types'
import Link from 'next/link'

const InviteModal = ({ applicationId, eventId, onClose }: InviteModalProps) => {
  const [comment, setComment] = useState<string | null>(null)

  const { setEventContext } = useEventContext()

  const { data, isLoading: isFetching } = useGetInviteApplicationByIdQuery({
    applicationId,
  })

  const [updateApplication, { isLoading }] =
    useUpdateApplicationStatusMutation()

  const handleSubmit = async (status: ApplicationDecisionStatus) => {
    if (isLoading) return

    const data: IUpdateStatusData = { decisionByComment: comment, status }

    try {
      await updateApplication({
        applicationId,
        eventId,
        data,
      }).unwrap()

      setEventContext((prev) => {
        if (!prev) return prev

        return {
          ...prev,
          hasInvited: false,
          isMember: status === 'ACCEPTED',
          role: status === 'ACCEPTED' ? 'USER' : null,
          applicationId: null,
          permissions: { ...prev.permissions, canJoin: false },
        }
      })

      toast.success(
        status === 'ACCEPTED' ? 'Invitation accepted!' : 'Invitation rejected!',
      )
      onClose()
    } catch (error) {
      showErrorToast(error)
    }
  }

  if (isFetching || !data) return null

  return (
    <Modal show={true} onClose={onClose} size="md">
      <h2 className="text-lg font-semibold mb-5">Event Invitation</h2>
      {/* Sender */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/users/${data.sender.id}`}>
          <Image
            src={data.sender.avatar ?? '/default.png'}
            alt={data.sender.username}
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </Link>

        <div>
          <Link href={`/users/${data.sender.id}`}>
            <div className="font-semibold cursor-pointer hover:underline">
              {data.sender.username}
            </div>
          </Link>

          <div className="text-xs text-text-gray">
            Invited you to this event
          </div>
        </div>
      </div>
      {/* Comment */}
      {data.senderComment && (
        <div className="mb-5">
          <div className="text-xs text-text-gray mb-1">Comment</div>

          <div className="bg-bg-gray p-3 rounded-lg text-sm">
            {data.senderComment}
          </div>
        </div>
      )}
      {/* Response */}
      <div className="mb-5">
        <label className="text-xs text-text-gray">
          Your response (optional)
        </label>

        <textarea
          disabled={isLoading}
          value={comment ?? ''}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-2 bg-dark rounded-md resize-none mt-1"
        />
      </div>
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          disabled={isLoading}
          onClick={() => handleSubmit('ACCEPTED')}
          className="flex-1 bg-primary hover:bg-primary-dark py-2 rounded-lg text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Accept Invite'}
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleSubmit('REJECTED')}
          className="flex-1 bg-gray-700 py-2 rounded-lg text-light font-semibold hover:bg-gray-600 transition"
        >
          {isLoading ? 'Processing...' : 'Reject'}
        </button>
      </div>
    </Modal>
  )
}

export default InviteModal
