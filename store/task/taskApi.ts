import baseQueryWithReauth from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IAssignTaskRequest,
  IAssignTaskResponse,
  ICreateCommentRequest,
  ICreateRequest,
  IDeleteCommentRequest,
  IEventAndTaskRequest,
  IMoveTaskRequest,
  ISelfAssignResponse,
  ITaskCommentBase,
  ITaskCommentWithUser,
  ITaskResponse,
  IUpdateRequest,
} from './taskTypes'

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Task', 'Board', 'TaskComments'],

  endpoints: (builder) => ({
    createTask: builder.mutation<ITaskResponse, ICreateRequest>({
      query: ({ data, eventId }) => ({
        url: `/task?eventId=${eventId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),

    updateTaskDetails: builder.mutation<ITaskResponse, IUpdateRequest>({
      query: ({ taskId, eventId, data }) => ({
        url: `task/${taskId}/details?eventId=${eventId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    moveTask: builder.mutation<ITaskResponse, IMoveTaskRequest>({
      query: ({ taskId, eventId, newColumnId }) => ({
        url: `/task/${taskId}/move?eventId=${eventId}`,
        method: 'PATCH',
        body: newColumnId,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    assignTask: builder.mutation<IAssignTaskResponse, IAssignTaskRequest>({
      query: ({ taskId, assigneeId, eventId }) => ({
        url: `/task/${taskId}/assign?eventId=${eventId}`,
        method: 'PATCH',
        body: { assigneeId },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),

    selfAssignTask: builder.mutation<ISelfAssignResponse, IEventAndTaskRequest>(
      {
        query: ({ taskId, eventId }) => ({
          url: `/task/${taskId}/self-assign?eventId=${eventId}`,
          method: 'PATCH',
        }),
        invalidatesTags: (result, error, { taskId }) => [
          { type: 'Task', id: taskId },
        ],
      },
    ),

    deleteTask: builder.mutation<ITaskResponse, IEventAndTaskRequest>({
      query: ({ taskId, eventId }) => ({
        url: `task/${taskId}?eventId=${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    //Comments
    addComment: builder.mutation<ITaskCommentWithUser, ICreateCommentRequest>({
      query: ({ content, taskId, eventId }) => ({
        url: `task/${taskId}/comments?eventId=${eventId}`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'TaskComments', id: taskId },
      ],
    }),
    // potom mb ybrat'
    getComments: builder.query<ITaskCommentWithUser, IEventAndTaskRequest>({
      query: ({ taskId, eventId }) =>
        `task/${taskId}/comments?eventId=${eventId}`,
      providesTags: (result, error, { taskId }) => [
        { type: 'TaskComments', id: taskId },
      ],
    }),

    deleteComment: builder.mutation<ITaskCommentBase, IDeleteCommentRequest>({
      query: ({ commentId, eventId }) => ({
        url: `task/comments/${commentId}?eventId=${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'TaskComments', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreateTaskMutation,
  useUpdateTaskDetailsMutation,
  useMoveTaskMutation,
  useAssignTaskMutation,
  useSelfAssignTaskMutation,
  useDeleteTaskMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} = taskApi
