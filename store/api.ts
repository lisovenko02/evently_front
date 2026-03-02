import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { eventsApi } from './events/eventsApi'
import { applicationsApi } from './applications/applicationsApi'
import { chatApi } from './chat/chatApi'
import { messagesApi } from './messages/messagesApi'
import { boardApi } from './board/boardApi'
import { columnApi } from './column/columnApi'
import { taskApi } from './task/taskApi'
import { userApi } from './user/userApi'
import { pinsApi } from './pins/pinsApi'
import { eventUserApi } from './event-user/eventUserApi'
import { eventUserHistoryApi } from './event-user-history/EUH.api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [eventUserApi.reducerPath]: eventUserApi.reducer,
    [eventUserHistoryApi.reducerPath]: eventUserHistoryApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [columnApi.reducerPath]: columnApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [pinsApi.reducerPath]: pinsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      eventsApi.middleware,
      eventUserApi.middleware,
      eventUserHistoryApi.middleware,
      applicationsApi.middleware,
      chatApi.middleware,
      messagesApi.middleware,
      boardApi.middleware,
      columnApi.middleware,
      taskApi.middleware,
      pinsApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
