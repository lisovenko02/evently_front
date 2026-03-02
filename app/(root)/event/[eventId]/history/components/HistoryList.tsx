import { HistoryListProps } from '../types/historyComponents.types'
import HistoryItem from './HistoryItem'

export const HistoryList = ({ history, isLoading }: HistoryListProps) => {
  if (isLoading) return <div>Loading...</div>
  if (!isLoading && history.length === 0)
    return <div className="text-text-gray mt-4">No history found</div>

  return (
    <ul>
      {history.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
