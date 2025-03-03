import EventCard from '@/app/components/EventCard'

const PreviewComponent = ({ previewImg, isOnline, watch }) => {
  const event = {
    id: 'preview',
    title: watch('title') || 'Event title',
    category: watch('category') || 'Category',
    points: watch('points') || 0,
    membersLimit: watch('membersLimit') || null,
    eventStatus: 'OPEN FOR APPLICATIONS',
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
    // <div className="bg-dark p-5 rounded-lg shadow-lg">
    //   <h2 className="text-xl font-semibold text-primary-light mb-4">Preview</h2>

    //   <div className="border border-primary-dark rounded-lg shadow-lg overflow-hidden">
    //     <div className="relative">
    //       <Image
    //         src={previewImg || '/placeholder.jpg'}
    //         width={150}
    //         height={150}
    //         alt="Event preview"
    //         className="w-full h-48 object-cover"
    //       />
    //       <div className="absolute top-0 left-0 bg-primary-dark text-white p-2 text-xs font-semibold uppercase rounded-br-lg">
    //         {isOnline ? 'Online' : 'Offline'}
    //       </div>
    //     </div>

    //     <div className="p-5">
    //       <h2 className="text-2xl font-bold text-primary-light mb-2">
    //         {watch('title') || 'Event title'}
    //       </h2>
    //       <p className="text-gray-300 mb-3">Event description</p>
    //       <div className="flex justify-between items-center mt-3">
    //         <span className="text-primary-light font-semibold text-sm uppercase">
    //           27.02.2025
    //         </span>
    //         <span className="text-primary-dark font-semibold text-lg">
    //           Points: 0
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default PreviewComponent
