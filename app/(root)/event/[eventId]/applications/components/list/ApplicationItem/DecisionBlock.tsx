import { DecisionBlockProps } from '../../../types/applicationsComponents.types'
import Actor from './Actor'

const DecisionBlock = ({ item }: DecisionBlockProps) => {
  const {
    type,
    applicationStatus,
    decisionBy,
    decisionByComment,
    rejectSource,
    systemRejectReason,
  } = item

  const isAccepted = applicationStatus === 'ACCEPTED'
  const isRejected = applicationStatus === 'REJECTED'

  const isDecisionByStaff =
    type === 'REQUEST' && !!decisionBy && rejectSource !== 'SYSTEM'

  if (!decisionBy && rejectSource !== 'SYSTEM') return null

  return (
    <div className="flex flex-col gap-3 border-t border-gray-800 pt-3">
      {decisionBy && (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-medium ${
              isAccepted
                ? 'text-green-400'
                : isRejected
                  ? 'text-red-400'
                  : 'text-gray-400'
            }`}
          >
            <span>
              {isAccepted && 'Accepted by'}
              {isRejected && 'Rejected by'}
            </span>

            <Actor
              user={decisionBy}
              subtle
              badge={isDecisionByStaff ? 'Staff' : undefined}
            />
          </div>

          {decisionByComment && (
            <div
              className={`rounded-xl p-3 text-sm break-words border ${
                isAccepted
                  ? 'bg-green-900/10 border-green-900/30 text-green-300'
                  : 'bg-red-900/10 border-red-900/30 text-red-300'
              }`}
            >
              {decisionByComment}
            </div>
          )}
        </div>
      )}

      {rejectSource === 'SYSTEM' && systemRejectReason && (
        <div className="bg-red-900/20 border border-red-900/30 rounded-xl p-3 text-sm text-red-300">
          <div className="font-medium mb-1">Automatically rejected</div>
          <div>{systemRejectReason}</div>
        </div>
      )}
    </div>
  )
}

export default DecisionBlock
