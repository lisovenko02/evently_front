import Image from 'next/image'

import { KEY_MAP, STATUS_CONFIG } from '../helpers/statusHelpers'
import { MetricsSectionProps } from '../types/historyComponents.types'
import ActivityOverview from '@/components/ui/ActivityOverview'

const MetricsSection = ({ activity, moderation }: MetricsSectionProps) => {
  if (!activity) return null

  const total = activity.total || 0

  const activityItems = Object.entries(activity)
    .filter(([key]) => key !== 'total')
    .map(([key, count]) => {
      const statusKey = KEY_MAP[key]
      const config = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.DEFAULT

      return {
        key,
        label: config.label,
        dotClass: config.dotClass,
        textClass: config.textClass,
        count,
        percent: total ? Math.round((count / total) * 100) : 0,
      }
    })

  const top = moderation?.topModerator
  const totalActions = moderation?.totalActions ?? 0
  const topPercent =
    top && totalActions ? Math.round((top.actions / totalActions) * 100) : 0

  return (
    <aside className="w-[320px] shrink-0 sticky top-0 space-y-6">
      {activityItems && (
        <ActivityOverview items={activityItems} title="Activity overview" />
      )}

      {top && (
        <div className="bg-accent-gray border border-yellow-400/20 p-4 rounded-2xl">
          <h3 className="text-sm font-semibold text-light mb-4">
            Top Moderator
          </h3>

          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src={top.avatar}
                alt={top.username}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base text-light font-semibold truncate">
                {top.username}
              </p>

              <p className="text-xs text-text-gray">
                {top.actions} of {totalActions} moderation actions
              </p>

              <div className="mt-2 w-full h-1.5 bg-slate-300 overflow-hidden rounded-full">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${topPercent}%` }}
                />
              </div>
            </div>

            <span className="text-xs font-semibold text-primary-dark">
              {topPercent}%
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}

export default MetricsSection
