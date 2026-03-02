import React from 'react'

import Header from './Header'
import MainBlock from './MainBlock'
import DecisionBlock from './DecisionBlock'
import Timeline from './Timeline'
import Actions from './Actions'
import SenderComment from './SenderComment'

import { ApplicationItemProps } from '../../../types/applicationsComponents.types'

const ApplicationItem = ({ item, role, eventId }: ApplicationItemProps) => {
  const isPending = item.applicationStatus === 'PENDING'
  const isAuthorizingUserStaff = ['MODERATOR', 'ORGANIZER'].includes(role)

  return (
    <li className="relative pl-10">
      {/* VERTICAL LINE */}
      <span className="absolute left-4 top-0 h-full w-px bg-gray-700" />

      {/* DOT */}
      <span
        className={`absolute left-[11px] top-6 w-3 h-3 rounded-full ${
          item.applicationStatus === 'PENDING'
            ? 'bg-gray-500'
            : item.applicationStatus === 'ACCEPTED'
              ? 'bg-green-500'
              : 'bg-red-500'
        }`}
      />

      {/* CARD */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-700 transition overflow-hidden p-3 sm:p-5 md:p-6 flex flex-col gap-4">
        <Header item={item} />
        <MainBlock item={item} />
        <SenderComment comment={item.senderComment} />
        <DecisionBlock item={item} />
        <Timeline item={item} />
        {isPending && item.type === 'REQUEST' && isAuthorizingUserStaff && (
          <Actions applicationId={item.id} eventId={eventId} />
        )}
      </div>
    </li>
  )
}

export default ApplicationItem
