'use client'

import { useState } from 'react'
import CreateEventForm from './components/CreateEventForm'
import MapComponent from './components/MapComponent'

const CreateEvent = () => {
  const [location, setLocation] = useState({})
  const [isOnline, setIsOnline] = useState(true)
  const [isMapOpen, setIsMapOpen] = useState(false)

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <CreateEventForm />
    </div>
  )
}

export default CreateEvent
