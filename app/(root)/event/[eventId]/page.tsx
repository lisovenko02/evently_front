'use client'

import { useParams, useRouter } from 'next/navigation'

import {
  useGetEventByIdQuery,
  useJoinOpenEventMutation,
} from '@/store/events/eventsApi'
import { skipToken } from '@reduxjs/toolkit/query'

import { useEventContext } from '@/contexts/EventContext'
import { buildEventCTA } from './_utils/buildEventCTA'

import HeroSection from './_components/hero'
import InfoSection from './_components/info'
import MobileCTA from './_components/MobileCTA'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { showErrorToast } from '@/utils/showErrorToast'
import { ModalType } from './_types/eventComponents.types'

import dynamic from 'next/dynamic'

const RequestApplicationModal = dynamic(
  () => import('./_components/modals/RequestApplicationModal'),
  { ssr: false },
)

const InviteModal = dynamic(() => import('./_components/modals/InviteModal'), {
  ssr: false,
})

const EditEventModal = dynamic(
  () => import('./_components/modals/EditEventModal'),
  { ssr: false },
)

const EventPage = () => {
  const { eventId } = useParams()
  const eventIdNumber = Number(eventId)
  const isValidEventId = !Number.isNaN(eventIdNumber)
  const router = useRouter()
  const [openModal, setOpenModal] = useState<ModalType>(null)

  const { data: event, isLoading } = useGetEventByIdQuery(
    isValidEventId ? { eventId: eventIdNumber } : skipToken,
  )

  const visitorContext = useEventContext()

  const cta = useMemo(() => {
    return buildEventCTA(visitorContext)
  }, [visitorContext])

  const [joinEvent] = useJoinOpenEventMutation()

  const joinOpen = useCallback(async () => {
    try {
      await joinEvent({ eventId: eventIdNumber }).unwrap()

      toast.success(`You're successfully joined ${event?.title}`)
    } catch (error) {
      showErrorToast(error)
    }
  }, [joinEvent, eventIdNumber, event?.title])

  const handleCTA = useCallback(async () => {
    if (!cta?.action) return

    switch (cta.action) {
      case 'joinOpen':
        joinOpen()
        break

      case 'requestApplication':
        setOpenModal('request')
        break

      case 'acceptInvite':
        setOpenModal('invite')
        break

      case 'editEvent':
        setOpenModal('edit')
        break

      case 'loginRequired':
        router.push('/sign-in')
        break
    }
  }, [cta, router, joinOpen])

  const stableLocation = useMemo(() => {
    if (!event?.location) return null
    return {
      address: event.location.address,
      city: event.location.city,
      country: event.location.country,
      coords: {
        lat: event.location.coords.lat,
        lng: event.location.coords.lng,
      },
    }
  }, [event?.location])

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-dark text-light">
        <div className="text-xl">Loading event...</div>
      </div>
    )

  if (!event)
    return (
      <div className="h-screen flex items-center justify-center bg-dark text-red-600">
        <div className="text-xl">Event not found</div>
      </div>
    )

  return (
    <div className="flex flex-col lg:flex-row lg:h-full lg:min-h-0 lg:overflow-hidden text-light">
      {/* HERO */}
      <HeroSection
        category={event.category}
        visibility={event.visibility}
        isOnline={event.isOnline}
        image={event.image}
        title={event.title}
      />

      {/* INFO + DESKTOP CTA */}
      <InfoSection
        event={event}
        stableLocation={stableLocation}
        cta={cta}
        onCTA={handleCTA}
      />

      {/* MOBILE CTA */}
      {cta && <MobileCTA cta={cta} onClick={handleCTA} />}

      {openModal === 'request' && (
        <RequestApplicationModal
          eventId={eventIdNumber}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === 'invite' && visitorContext.applicationId && (
        <InviteModal
          applicationId={visitorContext.applicationId}
          eventId={eventIdNumber}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === 'edit' && (
        <EditEventModal onClose={() => setOpenModal(null)} />
      )}
    </div>
  )
}

export default EventPage
