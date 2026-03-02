import { useEffect, useRef, useState } from 'react'
import TaskCard from './TaskCard'
import { Trash2 } from 'lucide-react'
import CreateTaskModal from '../modals/CreateTaskModal'
import { ColumnProps } from '../../types/taskComponents.types'

const Column = ({ column, onUpdateTitle, onDelete, refetch }: ColumnProps) => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(column.title)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    if (editedTitle.trim() && editedTitle !== column.title) {
      await onUpdateTitle(column.id, editedTitle)
    }
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this column?')) {
      await onDelete(column.id)
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  return (
    <div className="flex-shrink-0 w-72 group">
      <section
        className={`bg-black/40 backdrop-blur-md rounded-2xl p-4 flex flex-col ${
          column.tasks.length === 0
            ? 'h-auto min-h-[120px]'
            : 'h-[calc(100vh-15rem)]'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit()
                if (e.key === 'Escape') {
                  setEditedTitle(column.title)
                  setIsEditing(false)
                }
              }}
              className="text-xl font-semibold text-primary bg-transparent border-b border-primary focus:outline-none w-full"
            />
          ) : (
            <div className="flex justify-between w-full">
              <h2
                onClick={() => setIsEditing(true)}
                className="text-xl font-semibold text-primary cursor-text"
              >
                {column.title}
              </h2>
              {/* potom mb ybrat' div */}
              <div>
                <button
                  onClick={handleDelete}
                  className="opacity-0 group-hover:opacity-100 text-text-gray hover:text-red-500 transition-opacity"
                >
                  <Trash2 size={18} className="cursor-pointer" color="red" />
                </button>
              </div>
            </div>
          )}
        </div>

        {column.tasks.length > 0 ? (
          <>
            <div
              className="tasks-container flex-1 overflow-y-auto pr-2 space-y-3"
              style={{
                maxHeight: 'calc(100%-40px)',
                scrollbarGutter: 'stable',
              }}
            >
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} refetch={refetch} />
              ))}
            </div>

            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="mt-2 text-xs text-primary underline hover:text-primary-light"
            >
              + Add Task
            </button>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-text-gray text-sm">No tasks</div>
            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="mt-2 text-xs text-primary underline hover:text-primary-light self-start"
            >
              + Add task
            </button>
          </div>
        )}

        <CreateTaskModal
          show={showCreateTaskModal}
          onClose={() => setShowCreateTaskModal(false)}
          columnId={column.id}
          refetch={refetch}
        />
      </section>
    </div>
  )
}

export default Column
