import clsx from 'clsx'

export type ActivityOverviewProps = {
  title: string
  items: {
    count: number
    key: string
    dotClass: string
    label: string
    percent: number
    textClass: string
  }[]
}

const ActivityOverview = ({ title, items }: ActivityOverviewProps) => {
  return (
    <div className="bg-accent-gray border border-gray-700 rounded-2xl p-4">
      <h3 className="mb-4 text-sm text-light font-semibold">{title}</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span
                  className={clsx('w-2.5 h-2.5 rounded-full', item.dotClass)}
                />

                <span className={clsx('text-sm', item.textClass)}>
                  {item.label}
                </span>
              </div>

              <span className="text-sm text-light font-medium">
                {item.count}
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-300 rounded-full overflow-hidden">
              <div
                className={item.dotClass}
                style={{ width: `${item.percent}%`, height: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityOverview
