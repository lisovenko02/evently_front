import { IPerformer } from '@/store/applications/applicationsTypes'
import Image from 'next/image'
import { ReactNode } from 'react'

export type MetricCardProps = {
  title: string
  performer: IPerformer | null
  icon: ReactNode
  emptyText?: string
}

const MetricCard = ({
  title,
  performer,
  icon,
  emptyText = 'No activity yet',
}: MetricCardProps) => {
  if (!performer) {
    return (
      <article className="border border-gray-700 rounded-xl p-3 bg-bg-gray">
        <h3 className="mb-3 text-xs font-semibold text-text-gray uppercase tracking-wide">
          {icon}
          {title}
        </h3>
        <p className="text-xs text-text-gray">{emptyText}</p>
      </article>
    )
  }

  const { user, actions, totalActions } = performer

  const percent = totalActions ? Math.round((actions / totalActions) * 100) : 0
  return (
    <article className="border border-gray-700 rounded-xl p-3 bg-bg-gray">
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-text-gray uppercase tracking-wide">
        {icon}
        {title}
      </h3>

      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 shrink-0">
          <Image
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-light truncate">
            {user.username}
          </p>
          <p className="text-xs text-text-gray">
            {actions} of {totalActions}
          </p>

          <div className="mt-2 h-1.5 w-full bg-slate-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-dark"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-primary-dark">
          {percent}%
        </span>
      </div>
    </article>
  )
}

export default MetricCard
