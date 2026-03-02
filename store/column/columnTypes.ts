import { ITask } from '../task/taskTypes'

// API

export interface IColumn {
  id: number
  title: string
  boardId: number
  order: number
  tasks: ITask[]

  createdAt: string
  updatedAt: string
}

export interface IColumnResponse {
  id: number
  title: string
  boardId: number
  order: number

  createAt: string
  updatedAt: string
}

export interface ICreateData {
  title: string
  order?: number
}

export interface ICreateRequest {
  boardId: number
  data: ICreateData
  eventId: number
}

export interface IUpdateTitleRequest {
  columnId: number
  eventId: number
  data: { title: string }
}

export interface IColumnOrder {
  id: number
  order: number
}

export interface IReorderColumnsRequest {
  columns: IColumnOrder[]
  eventId: number
}

export type IReorderColumnsResponse = IColumnResponse[]

export interface IDeleteRequest {
  eventId: number
  columnId: number
}

// STORE

export interface IColumnStoreState {
  columns: IColumn[]
  setColumns: (columns: IColumn[]) => void
  updateColumnOrder: (columnsOrder: IColumnOrder[]) => void
  addColumn: (column: IColumn) => void
  updateColumnTitle: (id: number, title: string) => void
  deleteColumn: (id: number) => void
}
