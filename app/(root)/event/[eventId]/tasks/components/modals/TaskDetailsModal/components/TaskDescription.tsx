const TaskDescription = ({ description }: { description: string | null }) => {
  if (!description) return null

  return (
    <div className="md:col-span-2">
      <h3 className="text-lg font-semibold text-light mb-3">Description</h3>
      <div className="bg-dark-700 p-4 rounded-lg">
        <p className="text-gray-300 whitespace-pre-line">
          {description || 'No description provided'}
        </p>
      </div>
    </div>
  )
}

export default TaskDescription
