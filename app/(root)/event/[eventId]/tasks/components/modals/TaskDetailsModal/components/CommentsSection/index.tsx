import { CommentsSectionProps } from '../../../../../types/taskComponents.types'
import CommentInput from './CommentInput'
import CommentItem from './CommentItem'

const CommentsSection = ({
  task,
  eventId,
  getUserName,
}: CommentsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-light mb-2">
        Comments ({task.comments?.length || 0})
      </h3>

      <CommentInput task={task} eventId={eventId} />

      <div className="border-t border-gray-700 pt-3">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {task.comments?.length > 0 ? (
            task.comments.map((comment) => {
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  getUserName={getUserName}
                />
              )
            })
          ) : (
            <div className="text-center py-6 text-gray-400">
              No comments yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
