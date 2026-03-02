import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUploadMessageFilesResponse } from './messagesTypes'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Messages'],

  endpoints: (builder) => ({
    // getChatMessages: builder.query({
    //   query: ({ chatId, eventId }) => `messages/${chatId}?eventId=${eventId}`,
    // }),

    uploadMessageFiles: builder.mutation<
      IUploadMessageFilesResponse,
      {
        formData: FormData
        eventId: number
      }
    >({
      query: ({ formData, eventId }) => {
        return {
          url: `messages/upload-files?eventId=${eventId}`,
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
})

export const { useUploadMessageFilesMutation } = messagesApi
