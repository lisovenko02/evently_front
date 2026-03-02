import { TaskInfoBadgesProps } from '../../../../../types/taskComponents.types'
import TaskPointsBadge from '../TaskPointsBadge'

const TaskInfoBadges = ({ task }: TaskInfoBadgesProps) => {
  return (
    <div className="flex gap-3">
      <TaskPointsBadge points={task.points} />
    </div>
  )
}

export default TaskInfoBadges
