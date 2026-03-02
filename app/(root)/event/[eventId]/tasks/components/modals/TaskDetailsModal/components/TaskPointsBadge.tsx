const TaskPointsBadge = ({ points }: { points: number | null }) => {
  if (!points) return null
  return (
    <span
      className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 font-medium"
      title="Task points"
    >
      {points} pts
    </span>
  )
}

export default TaskPointsBadge
