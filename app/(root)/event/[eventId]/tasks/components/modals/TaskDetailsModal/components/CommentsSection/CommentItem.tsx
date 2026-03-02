import Image from 'next/image'
import { format } from 'date-fns'
import { CommentItemProps } from '../../../../../types/taskComponents.types'

const CommentItem = ({ comment, getUserName }: CommentItemProps) => {
  return (
    <div className="flex gap-3 p-2 hover:bg-dark-700 rounded-lg transition-colors">
      <div className="relative h-10 w-10 flex-shrink-0">
        {comment.author?.user?.avatar ? (
          <Image
            src={comment.author.user.avatar}
            alt={getUserName(comment.author)}
            fill
            className="rounded-full object-cover"
            sizes="40px"
          />
        ) : (
          <div className="h-full w-full rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-white font-medium">
              {getUserName(comment.author).charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-gray-100 truncate">
            {getUserName(comment.author)}
          </span>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {format(new Date(comment.createdAt), 'MMM d, HH:mm')}
          </span>
        </div>
        <p className="text-gray-300 mt-1 whitespace-pre-line break-words">
          {comment.content}
        </p>
      </div>
    </div>
  )
}

export default CommentItem
