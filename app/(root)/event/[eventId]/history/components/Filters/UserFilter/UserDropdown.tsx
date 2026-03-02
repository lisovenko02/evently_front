'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { UserDropdownProps } from '../../../types/historyComponents.types'

export function UserDropdown({
  users,
  selectedUsers,
  setSelectedUsers,
  isSelected,
  clearSearch,
}: UserDropdownProps) {
  return (
    <div className="absolute top-full mt-1 w-full z-20 rounded-lg border border-gray-700 bg-accent-gray2 overflow-hidden">
      {users.map((user) => {
        const selected = isSelected(user.id)

        return (
          <div
            key={user.id}
            onClick={() => {
              if (selected) return
              setSelectedUsers([...selectedUsers, user])
              clearSearch()
            }}
            className={clsx(
              'flex items-center gap-2 px-3 py-2',
              selected
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:bg-accent-gray',
            )}
          >
            <Image
              src={user.avatar}
              alt={user.username}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">{user.username}</span>
            {selected && (
              <span className="ml-auto text-xs text-text-gray">Selected</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
