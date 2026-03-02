import clsx from 'clsx'
import { useMemo } from 'react'

import { ActiveFilter } from '@/store/applications/applicationsTypes'
import { getAvailableFilters } from '../../utils/getAvailableFilters'

import { ViewFilterProps } from '../../types/applicationsComponents.types'

const ViewFilter = ({
  value,
  onChange,
  visibility,
  role,
  counts,
}: ViewFilterProps) => {
  const filters = useMemo(
    () => getAvailableFilters(visibility, role),
    [visibility, role],
  )

  if (filters.length <= 1) return null

  const isActiveGroup = value.group === 'ACTIVE'

  const selectActiveType = (type: ActiveFilter) => {
    onChange({ group: 'ACTIVE', activeType: type })
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 items-center">
      {filters.map((filter) => {
        switch (filter.group) {
          case 'ACTIVE':
            return (
              <div
                key="ACTIVE"
                className={clsx(
                  'flex items-center gap-1 border rounded-md px-2 py-1 cursor-pointer',
                  isActiveGroup
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700',
                )}
                onClick={() =>
                  !isActiveGroup && selectActiveType(filter.subFilters[0])
                }
              >
                <span className="text-sm font-semibold">
                  ACTIVE
                  <span className="text-gray-400 ml-1">
                    {counts ? `(${counts.active})` : ''}
                  </span>
                </span>

                {isActiveGroup && (
                  <div className="flex gap-1 ml-2">
                    {filter.subFilters.map((type) => (
                      <button
                        key={type}
                        onClick={(e) => {
                          e.stopPropagation()
                          selectActiveType(type)
                        }}
                        className={clsx(
                          'text-xs px-2 py-0.5 rounded-md border',
                          value.group === 'ACTIVE' && value.activeType === type
                            ? 'bg-primary text-dark border-primary'
                            : 'border-gray-500 text-gray-300 hover:bg-gray-700/50',
                        )}
                      >
                        {type}{' '}
                        {counts && (
                          <span className=" ml-1">
                            {type === 'REQUEST'
                              ? `${counts.request}`
                              : `${counts.invite}`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )

          case 'RESOLVED':
            return (
              <button
                key="RESOLVED"
                onClick={() => onChange({ group: 'RESOLVED' })}
                className={clsx(
                  'text-sm font-semibold px-2 py-1 rounded-md border',
                  value.group === 'RESOLVED'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:bg-gray-700/50',
                )}
              >
                RESOLVED
                <span className="text-gray-400 ml-1">
                  {counts ? `(${counts.resolved})` : ''}
                </span>
              </button>
            )

          case 'ALL':
            return (
              <button
                key="ALL"
                onClick={() => onChange({ group: 'ALL' })}
                className={clsx(
                  'text-sm font-semibold px-2 py-1 rounded-md border',
                  value.group === 'ALL'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:bg-gray-700/50',
                )}
              >
                ALL{' '}
                <span className="text-gray-400 ml-1">
                  {counts ? `(${counts.all})` : ''}
                </span>
              </button>
            )
        }
      })}
    </div>
  )
}

export default ViewFilter
