import { STATUS_GROUPS, StatusGroupKey } from '../../helpers/statusHelpers'
import { StatusFilterProps } from '../../types/historyComponents.types'

export const StatusFilter = ({
  activeGroups,
  selectedStatuses,
  toggleGroup,
  toggleStatus,
}: StatusFilterProps) => (
  <div className="flex flex-col gap-3">
    {Object.entries(STATUS_GROUPS).map(([groupKey, config]) => {
      const key = groupKey as StatusGroupKey
      const isGroupActive = activeGroups.includes(key)

      return (
        <fieldset key={key} className="border border-gray-700 rounded-md p-2">
          <legend
            className={`text-sm font-semibold cursor-pointer ${
              isGroupActive ? 'text-primary' : ''
            }`}
            onClick={() => toggleGroup(key)}
          >
            {config.label}
          </legend>

          <div className="flex flex-wrap gap-2 mt-2">
            {config.statuses.map((status) => (
              <label
                key={status}
                className="flex items-center gap-1 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                  className="accent-primary"
                />
                {status}
              </label>
            ))}
          </div>
        </fieldset>
      )
    })}
  </div>
)
