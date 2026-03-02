import clsx from 'clsx'
import Image from 'next/image'

import { STATUS_CONFIG } from '../helpers/statusHelpers'
import { HistoryItemProps } from '../types/historyComponents.types'

const HistoryItem = ({ item }: HistoryItemProps) => {
  const status = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.DEFAULT
  const isRoleChanged = item.status === 'ROLE_CHANGED'
  return (
    <li className="relative pl-10">
      <span className="absolute left-4 top-0 h-full w-px bg-gray-700" />

      <span
        className={clsx(
          'absolute left-[11px] top-6 w-3 h-3 rounded-full',
          status.dotClass,
        )}
      />

      <div className="bg-accent-gray border border-gray-700 rounded-xl px-4 py-3 mb-4 max-w-[680px]">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center bg-accent-gray2 w-8 h-8 rounded-full text-xs font-semibold shrink-0">
            {item.user.avatar ? (
              <Image
                src={item.user.avatar}
                alt={item.user.username}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              item.user.username[0].toUpperCase()
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <span
              className={clsx(
                'text-xs uppercase tracking-wide font-semibold',
                status.textClass,
              )}
            >
              {status.label}
            </span>

            <span className="font-semibold text-light">
              {item.user.username}
            </span>

            {!isRoleChanged && item.actorUser && (
              <span className="text-xs text-text-gray">
                by <span className="text-light">{item.actorUser.username}</span>
              </span>
            )}
          </div>
        </div>

        {item.reason && (
          <div className="mt-2 text-sm text-text-gray">
            {isRoleChanged ? (
              <>
                New role:{' '}
                <span className="text-light font-medium">{item.reason}</span>
              </>
            ) : (
              <em>“{item.reason}”</em>
            )}
          </div>
        )}

        <div className="text-xs text-text-gray mt-3 text-right">
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </div>
    </li>
  )
}

export default HistoryItem
