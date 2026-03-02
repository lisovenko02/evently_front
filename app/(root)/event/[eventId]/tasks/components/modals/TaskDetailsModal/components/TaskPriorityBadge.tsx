import { TaskPriorityBadgeProps } from '../../../../types/taskComponents.types'

const TaskPriorityBadge = ({
  priority,
  getPriorityLabel,
}: TaskPriorityBadgeProps) => {
  if (!priority) return null

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        priority === 'HIGH'
          ? 'bg-red-500/20 text-red-400'
          : priority === 'MEDIUM'
            ? 'bg-yellow-500/20 text-yellow-400'
            : 'bg-green-500/20 text-green-400'
      }`}
      title={getPriorityLabel(priority)}
    >
      {priority}
    </span>
  )
}

export default TaskPriorityBadge
