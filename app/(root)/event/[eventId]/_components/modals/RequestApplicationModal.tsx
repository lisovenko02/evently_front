import Modal from '@/components/ui/Modal'
import { useEventContext } from '@/contexts/EventContext'
import { useCreateApplicationMutation } from '@/store/applications/applicationsApi'
import { ICreateApplicationData } from '@/store/applications/applicationsTypes'
import { showErrorToast } from '@/utils/showErrorToast'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RequestApplicationModalProps } from '../../_types/eventComponents.types'

const RequestApplicationModal = ({
  eventId,
  onClose,
}: RequestApplicationModalProps) => {
  const [comment, setComment] = useState<string | null>(null)
  const [requestApplication, { isLoading }] = useCreateApplicationMutation()

  const { setEventContext } = useEventContext()

  const handleSubmit = async () => {
    const data: ICreateApplicationData = { type: 'REQUEST', comment }

    try {
      const application = await requestApplication({ eventId, data }).unwrap()

      setEventContext((prev) => ({
        ...prev,
        hasRequested: true,
        applicationId: application.id,
        permissions: { ...prev.permissions, canApply: false },
      }))

      toast.success('Your application was successfully sent!')
      onClose()
    } catch (error) {
      showErrorToast(error)
    }
  }

  return (
    <Modal show={true} onClose={onClose} size="md">
      <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

      <div className="flex flex-col gap-1 mb-4">
        <label className="text-xs text-text-gray">Optional comment</label>
        <textarea
          value={comment ?? ''}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-2 bg-dark rounded-md resize-none mt-1"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 bg-primary py-2 rounded-lg text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send Application'}
        </button>

        <button
          onClick={onClose}
          className="flex-1 bg-gray-700 py-2 rounded-lg text-light font-semibold hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default RequestApplicationModal
