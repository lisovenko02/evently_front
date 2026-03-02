import { SiBitcoinsv } from 'react-icons/si'

const PointsCard = ({ points }: { points: number }) => (
  <div className="bg-accent-gray2 rounded-xl p-2 flex items-center gap-2">
    <SiBitcoinsv size={16} className="text-primary" />
    <span className="text-ms font-semibold">{points} points</span>
  </div>
)

export default PointsCard
