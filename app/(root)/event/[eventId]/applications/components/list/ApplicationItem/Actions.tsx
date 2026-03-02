import { useState } from 'react'
import toast from 'react-hot-toast'

import { useUpdateApplicationStatusMutation } from '@/store/applications/applicationsApi'
import { showErrorToast } from '@/utils/showErrorToast'
import {
  ActionsProps,
  DecisionType,
} from '../../../types/applicationsComponents.types'

const Actions = ({ applicationId, eventId }: ActionsProps) => {
  const [decision, setDecision] = useState<DecisionType>(null)
  const [comment, setComment] = useState('')

  const [resolveApplication, { isLoading }] =
    useUpdateApplicationStatusMutation()

  const onSubmit = async () => {
    if (!decision) return

    try {
      await resolveApplication({
        applicationId,
        eventId,
        data: {
          decisionByComment: comment,
          status: decision,
        },
      }).unwrap()

      setDecision(null)
      setComment('')

      toast.success('Application updated successfully')
    } catch (error) {
      showErrorToast(error)
    }
  }

  if (!decision) {
    return (
      <div className="flex gap-3 pt-2 flex-wrap">
        <button
          onClick={() => setDecision('ACCEPTED')}
          className="flex-1 min-w-[100px] py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
        >
          Accept
        </button>

        <button
          onClick={() => setDecision('REJECTED')}
          className="flex-1 min-w-[100px] py-2 rounded-xl border border-red-500/40 text-red-400 text-sm font-medium hover:bg-red-500/10 transition"
        >
          Reject
        </button>
      </div>
    )
  }

  const isAccept = decision === 'ACCEPTED'

  return (
    <div className="pt-3 border-t border-gray-800 flex flex-col gap-3">
      <div
        className={`text-sm font-medium ${
          isAccept ? 'text-green-400' : 'text-red-400'
        }`}
      >
        You are about to {isAccept ? 'accept' : 'reject'} this request
      </div>

      <textarea
        placeholder="Add optional comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-gray-200 resize-none focus:outline-none focus:border-gray-600 transition"
        rows={3}
      />

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
            isAccept
              ? 'bg-green-600 text-white hover:bg-green-500'
              : 'bg-red-600 text-white hover:bg-red-500'
          }`}
        >
          {isLoading
            ? 'Processing...'
            : `Confirm ${isAccept ? 'Accept' : 'Reject'}`}
        </button>

        <button
          onClick={() => setDecision(null)}
          className="flex-1 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Actions
