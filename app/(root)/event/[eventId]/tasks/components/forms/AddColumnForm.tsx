import { useEffect } from 'react'
import { AddColumnFormProps } from '../../types/taskComponents.types'

const AddColumnForm = ({
  inputRef,
  isCreating,
  onCancel,
  onSubmit,
  onTitleChange,
  title,
}: AddColumnFormProps) => {
  useEffect(() => {
    if (isCreating) {
      inputRef.current?.focus()
    }
  }, [isCreating, inputRef])

  if (!isCreating) return null

  return (
    <div className="flex-shrink-0 w-72 mr-12">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 flex flex-col h-[calc(100vh-15rem)]">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter column title"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit()
            if (e.key === 'Escape') onCancel()
          }}
          className="bg-transparent border-b border-white/50 text-white focus:outline-none focus:border-primary mb-4"
        />

        <div className="flex gap-2 mt-auto">
          <button
            onClick={onSubmit}
            disabled={!title.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-0"
          >
            Add Column
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white rounded-lg hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddColumnForm
