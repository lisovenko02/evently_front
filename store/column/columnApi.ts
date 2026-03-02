import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IColumnResponse,
  ICreateRequest,
  IDeleteRequest,
  IReorderColumnsRequest,
  IReorderColumnsResponse,
  IUpdateTitleRequest,
} from './columnTypes'

export const columnApi = createApi({
  reducerPath: 'columnApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Columns'],

  endpoints: (builder) => ({
    createColumn: builder.mutation<IColumnResponse, ICreateRequest>({
      query: ({ boardId, data, eventId }) => ({
        url: `/column/${boardId}?eventId=${eventId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    updateColumnTitle: builder.mutation<IColumnResponse, IUpdateTitleRequest>({
      query: ({ columnId, data, eventId }) => ({
        url: `/column/title/${columnId}?eventId=${eventId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Columns', id: arg.columnId },
      ],
    }),

    reorderColumns: builder.mutation<
      IReorderColumnsResponse,
      IReorderColumnsRequest
    >({
      query: ({ columns, eventId }) => ({
        url: `/column/reorder?eventId=${eventId}`,
        method: 'PATCH',
        body: { columns },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    deleteColumn: builder.mutation<IColumnResponse, IDeleteRequest>({
      query: ({ columnId, eventId }) => ({
        url: `/column/${columnId}?eventId=${eventId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreateColumnMutation,
  useUpdateColumnTitleMutation,
  useReorderColumnsMutation,
  useDeleteColumnMutation,
} = columnApi
