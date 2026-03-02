export type PinRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'

export type UserPin = {
  id: number
  title: string
  image: string
  rarity: PinRarity
  isOwned: boolean
}

export interface IUserPinsResponse {
  pins: UserPin[]
  totalOwned: number
  totalAvailable: number
}
