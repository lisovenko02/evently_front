import EventCard from '@/app/components/EventCard'
import { PreviewComponentProps } from '../types/createEventComponents.types'

const PreviewComponent = ({ previewImg, watch }: PreviewComponentProps) => {
  const event = {
    id: 'preview',
    title: watch('title') || 'Event title',
    category: watch('category') || 'Category',
    points: watch('points') || 0,
    membersLimit: watch('maxParticipants') ?? null,
    visibility: watch('visibility') || 'OPEN',
    isOnline: watch('isOnline'),
    image: previewImg || null,
    city: watch('city') || null,
    country: watch('country') || null,
  }

  return (
    <div className="bg-dark p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-primary-light mb-4">Preview</h2>
      <EventCard event={event} />
    </div>
  )
}

export default PreviewComponent
