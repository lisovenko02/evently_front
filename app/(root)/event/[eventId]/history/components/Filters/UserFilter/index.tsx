'use client'
import Image from 'next/image'
import { useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useSearchEventUsersQuery } from '@/store/event-user-history/EUH.api'
import { UserDropdown } from './UserDropdown'
import { UserFilterProps } from '../../../types/historyComponents.types'

const UserFilter = ({
  eventId,
  selectedUsers,
  setSelectedUsers,
}: UserFilterProps) => {
  const [query, setQuery] = useState('')

  const canSearch = query.length >= 3

  const { data: users = [] } = useSearchEventUsersQuery(
    canSearch ? { eventId, params: { query, limit: 10 } } : skipToken,
  )

  const isSelected = (id: number) => selectedUsers.some((u) => u.id === id)

  return (
    <div className="relative">
      <div className="border border-gray-700 rounded-lg bg-accent-gray px-2 py-2">
        {selectedUsers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 px-2 py-1 rounded-md border border-gray-700 bg-darker"
              >
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm">{user.username}</span>

                <button
                  onClick={() =>
                    setSelectedUsers(
                      selectedUsers.filter((u) => u.id !== user.id),
                    )
                  }
                  className="text-text-gray hover:text-light"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full bg-transparent outline-none text-sm placeholder:text-text-gray"
        />
      </div>

      {canSearch && users.length > 0 && (
        <UserDropdown
          users={users}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          isSelected={isSelected}
          clearSearch={() => setQuery('')}
        />
      )}
    </div>
  )
}

export default UserFilter
