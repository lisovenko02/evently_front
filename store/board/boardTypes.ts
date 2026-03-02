import { IColumn } from '../column/columnTypes'

// API

export interface IBoard {
  id: number
  eventId: number
  columns: IColumn[]
  createdAt: string
  updatedAt: string
}

// STORE

export interface IBoardStore {
  board: IBoard | null
  setBoard: (board: IBoard) => void
  clearBoard: () => void
}
