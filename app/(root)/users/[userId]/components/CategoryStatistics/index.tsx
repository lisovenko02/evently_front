import React from 'react'

import {
  getCategoryColor,
  getCategoryIcon,
} from '@/app/(root)/_utils/categoryUtils'

import { CategoryStatisticsProps } from '../../types/userProfileComponents.types'

const CategoryStatistics = ({ categoryStats }: CategoryStatisticsProps) => {
  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-400'
    if (percentage >= 40) return 'bg-yellow-400'
    return 'bg-primary-light'
  }

  return (
    <div className="bg-accent-gray rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6">Category Statistics</h2>
      <div className="space-y-4">
        {categoryStats.map((stat) => (
          <div
            key={stat.category}
            className="flex flex-col sm:flex-row items-center justify-between group"
          >
            <div className="flex items-center w-full gap-3 flex-1">
              <div
                className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                  getCategoryColor(stat.category).split(' ')[0]
                } border ${getCategoryColor(stat.category).split(' ')[2]}`}
              >
                {getCategoryIcon(stat.category)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-medium text-sm capitalize text-light block">
                  {stat.category.toLowerCase()}
                </span>
                <span className="text-text-gray text-xs">
                  {stat.count} event{stat.count !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Покращений прогрес-бар з бордером */}
              <div className="w-24 bg-accent-dark rounded-full h-3 overflow-hidden border border-gray-600 shadow-inner">
                <div
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${getProgressBarColor(
                    stat.percentage,
                  )} shadow-sm`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <span className="text-light text-sm font-medium w-8 text-right">
                {stat.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryStatistics
