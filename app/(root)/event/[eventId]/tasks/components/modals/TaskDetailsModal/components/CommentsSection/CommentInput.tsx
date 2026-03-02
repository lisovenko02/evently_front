import { useState, useRef, useEffect } from 'react'
import { useAddCommentMutation } from '@/store/task/taskApi'
import { useTaskStore } from '@/store/task/taskStore'
import { Send } from 'lucide-react'
import { showErrorToast } from '@/utils/showErrorToast'
import { CommentInputProps } from '../../../../../types/taskComponents.types'

const CommentInput = ({ task, eventId }: CommentInputProps) => {
  const [commentContent, setCommentContent] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [addComment, { isLoading }] = useAddCommentMutation()
  const { setActiveTask } = useTaskStore()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`
    }
  }, [commentContent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return

    try {
      const newComment = await addComment({
        taskId: task.id,
        eventId,
        content: commentContent,
      }).unwrap()

      setActiveTask({
        ...task,
        comments: [newComment, ...task.comments],
      })
      setCommentContent('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    } catch (error) {
      showErrorToast(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`w-full bg-dark-700 border rounded-lg p-3 transition-all duration-200 ${
          isFocused ? 'border-primary ring-1 ring-primary' : 'border-gray-600'
        }`}
      >
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent text-light placeholder-gray-500 text-base 
                    focus:outline-none resize-none overflow-hidden max-h-32"
          placeholder="Write your thoughts..."
          rows={3}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          disabled={isLoading || !commentContent.trim()}
          className={`absolute right-3 bottom-3 p-1 rounded-md transition-colors duration-200 ${
            isLoading || !commentContent.trim()
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-primary-dark hover:bg-primary-dark/20'
          }`}
        >
          {isLoading ? (
            <div className="animate-spin">
              <Send size={18} className="text-primary-dark" />
            </div>
          ) : (
            <Send size={18} className="text-primary-dark" />
          )}
        </button>
      </div>
    </form>
  )
}

export default CommentInput
