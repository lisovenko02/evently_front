import { CalendarDays } from 'lucide-react'
import { format } from 'date-fns'

const TaskDueDate = ({ dueDate }: { dueDate: string | null }) => {
  if (!dueDate) return null
  return (
    <div>
      <h3 className="text-lg font-semibold text-light mb-3">Due Date</h3>
      <div className="flex items-center gap-2 bg-dark-700 p-4 rounded-lg">
        <span className="text-gray-400">
          <CalendarDays size={18} />
        </span>
        <span className="text-gray-300">
          {format(new Date(dueDate), 'MMM dd, yyyy')}
        </span>
      </div>
    </div>
  )
}

export default TaskDueDate
