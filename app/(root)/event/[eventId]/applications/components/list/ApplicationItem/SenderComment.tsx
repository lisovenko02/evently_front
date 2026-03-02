import { SenderCommentProps } from '../../../types/applicationsComponents.types'

const SenderComment = ({ comment }: SenderCommentProps) => {
  if (!comment) return null
  return (
    <div className="bg-gray-800/60 border border-gray-800 rounded-xl p-3 text-sm text-gray-300 break-words">
      {comment}
    </div>
  )
}

export default SenderComment
