import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IBoard } from './boardTypes'

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Board'],

  endpoints: (builder) => ({
    getEventBoard: builder.query<IBoard, number>({
      query: (eventId) => `board/${eventId}`,
      providesTags: (result) => [
        { type: 'Board', id: result?.id },
        { type: 'Board', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetEventBoardQuery } = boardApi
