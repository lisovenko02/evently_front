import Modal from '@/components/ui/Modal'
import { Crown, Sparkles, Star, Zap } from 'lucide-react'
import Image from 'next/image'
import { UserPinsModalProps } from '../../types/userProfileComponents.types'

const UserPinsModal = ({
  isOpen,
  onClose,
  pins,
  totalOwned,
  totalAvailable,
}: UserPinsModalProps) => {
  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY':
        return <Crown className="w-4 h-4 text-yellow-400" />
      case 'EPIC':
        return <Sparkles className="w-4 h-4 text-purple-400" />
      case 'RARE':
        return <Star className="w-4 h-4 text-blue-400" />
      case 'COMMON':
        return <Zap className="w-4 h-4 text-gray-400" />
      default:
        return <Zap className="w-4 h-4 text-gray-400" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY':
        return 'border-yellow-400 bg-yellow-400/10'
      case 'EPIC':
        return 'border-purple-400 bg-purple-400/10'
      case 'RARE':
        return 'border-blue-400 bg-blue-400/10'
      case 'COMMON':
        return 'border-gray-400 bg-gray-400/10'
      default:
        return 'border-gray-400 bg-gray-400/10'
    }
  }

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="xl"
      className="flex flex-col max-h-[90vh]"
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-light">Pins Collection</h2>
          <p className="text-text-gray mt-1">
            {totalOwned} of {totalAvailable} pins collected (
            {Math.round((totalOwned / totalAvailable) * 100)}%)
          </p>
        </div>
      </div>

      <div className="overflow-y-auto p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-text-gray mb-2">
            <span>Collection Progress</span>
            <span>
              {totalOwned}/{totalAvailable}
            </span>
          </div>
          <div className="w-full bg-accent-dark rounded-full h-3 overflow-hidden border border-gray-600">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${(totalOwned / totalAvailable) * 100}%` }}
            />
          </div>
        </div>

        {/* Pins Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className={`relative group rounded-xl p-3 border-2 transition-all duration-300 ${
                pin.isOwned
                  ? getRarityColor(pin.rarity)
                  : 'border-gray-600 bg-accent-dark opacity-50 grayscale'
              } hover:scale-105 hover:shadow-lg`}
            >
              {/* Pin Image */}
              <div className="relative aspect-square mb-3">
                <Image
                  src={pin.image || '/default-pin.png'}
                  alt={pin.title}
                  fill
                  className="rounded-lg object-cover"
                />

                {/* Rarity Badge */}
                <div
                  className={`absolute -top-2 -right-2 p-1 rounded-full border ${
                    pin.isOwned
                      ? getRarityColor(pin.rarity)
                      : 'bg-gray-600 border-gray-500'
                  }`}
                >
                  {getRarityIcon(pin.rarity)}
                </div>
              </div>

              {/* Pin Info */}
              <div className="text-center">
                <h3
                  className={`font-medium text-sm mb-1 ${
                    pin.isOwned ? 'text-light' : 'text-text-gray'
                  }`}
                >
                  {pin.title}
                </h3>
              </div>

              {/* Hover Overlay for Missing Pins */}
              {!pin.isOwned && (
                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium text-center px-2">
                    Not Collected
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default UserPinsModal
