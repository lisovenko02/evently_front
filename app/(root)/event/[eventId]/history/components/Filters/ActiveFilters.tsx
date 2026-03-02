import { STATUS_GROUPS } from '../../helpers/statusHelpers'
import { ActiveFiltersProps } from '../../types/historyComponents.types'

const ActiveFilters = ({
  selectedUsers,
  activeGroups,
  selectedStatuses,
  to,
  from,
  setSelectedUsers,
  setSelectedStatuses,
  setFrom,
  setTo,
}: ActiveFiltersProps) => {
  const clearAllFilters = () => {
    setSelectedUsers([])
    setSelectedStatuses([])
    setFrom(null)
    setTo(null)
  }

  if (!selectedUsers.length && !selectedStatuses.length && !from && !to)
    return null

  return (
    <div className="flex flex-wrap gap-2 mt-3 text-sm">
      {selectedUsers.map((u) => (
        <button
          key={u.id}
          onClick={() =>
            setSelectedUsers((prev) => prev.filter((x) => x.id !== u.id))
          }
          className="bg-accent-gray2 border border-gray-700 rounded-full px-3 py-1"
        >
          User: {u.username} ✕
        </button>
      ))}

      {activeGroups.map((g) => (
        <span
          key={g}
          className="bg-accent-gray2 border border-gray-700 rounded-full px-3 py-1"
        >
          {STATUS_GROUPS[g].label}
        </span>
      ))}

      {selectedStatuses
        .filter(
          (s) =>
            !activeGroups.some((g) => STATUS_GROUPS[g].statuses.includes(s)),
        )
        .map((status) => (
          <button
            key={status}
            onClick={() =>
              setSelectedStatuses((prev) => prev.filter((x) => x !== status))
            }
            className="bg-accent-gray2 border border-gray-700 rounded-full px-3 py-1"
          >
            {status} ✕
          </button>
        ))}

      {(from || to) && (
        <button
          onClick={() => {
            setFrom(null)
            setTo(null)
          }}
          className="bg-accent-gray2 border border-gray-700 rounded-full px-3 py-1"
        >
          Date ✕
        </button>
      )}

      <button
        onClick={clearAllFilters}
        className="text-text-gray underline ml-2"
      >
        Clear all
      </button>
    </div>
  )
}

export default ActiveFilters
