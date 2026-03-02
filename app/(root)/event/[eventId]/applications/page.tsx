'use client'

/* ======================================================
 * EXTERNAL LIBS
 * ====================================================== */

import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

/* ======================================================
 * NEXT
 * ====================================================== */

import { useParams } from 'next/navigation'

/* ======================================================
 * RTK QUERY
 * ====================================================== */

import { skipToken } from '@reduxjs/toolkit/query'
import {
  useGetEventApplicationsQuery,
  useGetEventApplicationsMetricsQuery,
} from '@/store/applications/applicationsApi'
import { useGetEventByIdQuery } from '@/store/events/eventsApi'
import { useGetEventUserQuery } from '@/store/event-user/eventUserApi'

/* ======================================================
 * TYPES
 * ====================================================== */

import {
  ApplicationsViewState,
  ApplicationView,
  IEventApplicationWithUsers,
} from '@/store/applications/applicationsTypes'

/* ======================================================
 * COMPONENTS
 * ====================================================== */

import ApplicationList from './components/list/ApplicationList'
import ViewFilter from './components/filters/ViewFilter'
import MetricsSection from './components/MetricsSection'
import { DateFilter } from '../../../../../components/ui/DateFilters/DateFilter'

/* ======================================================
 * HOOKS & UTILS
 * ====================================================== */

import { getInitialViewState } from './utils/getInitialViewState'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import EmptyApplicationsState from './states/EmptyApplicationsState'

/* ======================================================
 * CONSTANTS
 * ====================================================== */

const PAGE_SIZE = 10

const ApplicationsPage = () => {
  // ===== ROUTE PARAMS =====
  const { eventId } = useParams<{ eventId: string }>()
  const eventIdNumber = Number(eventId)
  const isValidEventId = !Number.isNaN(eventIdNumber)

  // ===== RESPONSIVE =====
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1023 })

  // ===== API: BASE DATA (EVENT + ROLE) =====
  const { data: event } = useGetEventByIdQuery(
    isValidEventId ? { eventId: eventIdNumber } : skipToken,
  )
  const { data: eventUser } = useGetEventUserQuery(
    isValidEventId ? eventIdNumber : skipToken,
  )

  // ===== UI STATE =====
  const [viewState, setViewState] = useState<ApplicationsViewState | null>(null)

  const [from, setFrom] = useState<string | null>(null)
  const [to, setTo] = useState<string | null>(null)

  const [cursor, setCursor] = useState<number | null>(null)
  const [applications, setApplications] = useState<
    IEventApplicationWithUsers[]
  >([])
  const [hasMore, setHasMore] = useState(true)

  // ===== DERIVED STATE =====
  const backendView: ApplicationView | undefined = useMemo(() => {
    if (!viewState) return undefined

    if (viewState.group === 'ACTIVE') {
      return viewState.activeType === 'INVITE' ? 'INVITES' : 'NEEDS_ACTION'
    }

    return viewState.group as ApplicationView
  }, [viewState])

  // ===== API: APPLICATIONS =====
  const applicationsQuery = backendView
    ? {
        eventId: eventIdNumber,
        params: {
          view: backendView,
          cursor: cursor ?? undefined,
          limit: PAGE_SIZE,
          from: from ?? undefined,
          to: to ?? undefined,
        },
      }
    : skipToken

  const { data, isFetching, isLoading } =
    useGetEventApplicationsQuery(applicationsQuery)

  // ===== API: METRICS =====
  const { data: metrics } = useGetEventApplicationsMetricsQuery({
    eventId: eventIdNumber,
  })

  // ===== EFFECTS =====

  // Set initial view after event + role loaded
  useEffect(() => {
    if (event && eventUser) {
      setViewState(getInitialViewState(event.visibility, eventUser.role))
    }
  }, [event, eventUser])

  // Handle new page data
  useEffect(() => {
    if (!data) return

    setApplications((prev) =>
      cursor ? [...prev, ...data.applications] : data.applications,
    )

    setHasMore(!!data.nextCursor)
  }, [data, cursor])

  // Reset pagination when filters/view change
  useEffect(() => {
    setCursor(null)
    setApplications([])
    setHasMore(true)
  }, [backendView, from, to])

  // ===== INFINITE SCROLL =====
  const loadMoreRef = useInfiniteScroll({
    hasMore,
    isFetching,
    onLoadMore: () => {
      if (data?.nextCursor) {
        setCursor(data.nextCursor)
      }
    },
  })

  if (isLoading || !event || !eventUser || !viewState) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-8 items-start">
      {/* LEFT SECTION */}
      <div className="flex-1 min-w-0">
        {/* FILTRATION */}
        <div className="flex flex-col gap-4">
          <ViewFilter
            value={viewState}
            onChange={setViewState}
            visibility={event.visibility}
            role={eventUser.role}
            counts={data?.counts}
          />

          <DateFilter to={to} from={from} setFrom={setFrom} setTo={setTo} />
        </div>

        {/* CARDS */}
        {applications.length === 0 && !isFetching ? (
          <EmptyApplicationsState />
        ) : (
          <ApplicationList
            applications={applications}
            role={eventUser.role}
            eventId={eventIdNumber}
          />
        )}

        {/* INFINITE SCROLL */}
        {hasMore && <div ref={loadMoreRef} className="h-10" />}
      </div>

      {/* RIGHT SECTION - METRICS */}
      {!isMobileOrTablet && metrics && <MetricsSection metrics={metrics} />}
    </div>
  )
}

export default ApplicationsPage
