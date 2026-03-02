import { SquareArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTaskStore } from '@/store/task/taskStore'
import TaskDetailsModal from '../modals/TaskDetailsModal/TaskDetailsModal'
import { TaskCardProps } from '../../types/taskComponents.types'

const TaskCard = ({ task, refetch }: TaskCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { setActiveTask } = useTaskStore()

  const handleOpenDetails = () => {
    setActiveTask(task)
    setIsDetailsOpen(true)
  }

  return (
    <div className="bg-accent-gray rounded-xl p-3 shadow-sm">
      <div className="flex justify-between">
        <h3 className="font-medium">{task.title}</h3>
        <button onClick={handleOpenDetails}>
          <SquareArrowUpRight size={14} color="#ffb800" />
        </button>
      </div>

      {/* {task.description && (
        <p className="text-text-gray text-sm mt-1 line-clamp-3">
          {task.description}
        </p>
      )} */}

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-full ${
              task.priority === 'HIGH'
                ? 'bg-red-500'
                : task.priority === 'MEDIUM'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
          />
          <span className="text-xs text-text-gray capitalize">
            {task.priority.toLowerCase()}
          </span>
        </div>

        {task.points && (
          <div>
            <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 font-medium">
              {task.points} {task.points === 1 ? 'pt' : 'pts'}
            </span>
          </div>
        )}
      </div>

      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={task}
        refetch={refetch}
      />
    </div>
  )
}

export default TaskCard
