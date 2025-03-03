import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEvent, IEventsState } from './eventsTypes'

const initialState: IEventsState = {
  events: [],
  currentEvent: null,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload
    },
    setCurrentEvent: (state, action: PayloadAction<IEvent | null>) => {
      state.currentEvent = action.payload
    },
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload)
    },
    updateEvent: (
      state,
      action: PayloadAction<Partial<IEvent> & { id: number }>
    ) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      )
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload }
      }
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },
  },
})

export const {
  setEvents,
  setCurrentEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} = eventsSlice.actions

export default eventsSlice.reducer
