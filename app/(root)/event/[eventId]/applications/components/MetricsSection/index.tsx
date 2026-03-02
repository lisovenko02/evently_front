import { FaChessKing, FaChessRook } from 'react-icons/fa'

import MetricCard from './MetricCard'
import { MetricsSectionProps } from '../../types/applicationsComponents.types'

const MetricsSection = ({ metrics }: MetricsSectionProps) => {
  return (
    <aside className="w-[320px] shrink-0 sticky top-0">
      <div className="bg-accent-gray border border-yellow-400/20 p-4 rounded-2xl">
        <header className="text-sm font-semibold text-primary-dark mb-4 uppercase">
          Most active staff
        </header>

        <div className="space-y-4">
          <MetricCard
            title="Best Inviter"
            icon={<FaChessRook size={14} className="text-teal-500" />}
            performer={metrics.bestInviter}
            emptyText="No invites yet"
          />

          <hr className="border-t border-gray-700" />

          <MetricCard
            title="Top approver"
            icon={<FaChessKing size={14} className="text-cyan-500" />}
            performer={metrics.topApprover}
            emptyText="No decisions yet"
          />
        </div>
      </div>
    </aside>
  )
}

export default MetricsSection
