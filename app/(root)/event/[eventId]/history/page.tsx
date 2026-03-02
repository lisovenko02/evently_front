'use client'

/* ======================================================
 * EXTERNAL LIBS
 * ====================================================== */
import { useMediaQuery } from 'react-responsive'

/* ======================================================
 * NEXT.js & REACT
 * ====================================================== */
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

/* ======================================================
 * TYPES
 * ====================================================== */
import { IUserSimple } from '@/store/auth/authTypes'
import { EventUserHistoryStatus } from '@/store/event-user-history/EUH.types'
import { IFilters, IMemoParams } from './types/history.types'

/* ======================================================
 * RTK
 * ====================================================== */
import { skipToken } from '@reduxjs/toolkit/query'
import {
  useGetEventHistoryMetricsQuery,
  useGetEventHistoryQuery,
  useGetEventUsersByIdsQuery,
} from '@/store/event-user-history/EUH.api'

/* ======================================================
 * HELPERS & COMPONENTS
 * ====================================================== */
import { STATUS_GROUPS, StatusGroupKey } from './helpers/statusHelpers'
import UserFilter from './components/Filters/UserFilter'
import { StatusFilter } from './components/Filters/StatusFilter'
import ActiveFilters from './components/Filters/ActiveFilters'
import { DateFilter } from '../../../../../components/ui/DateFilters/DateFilter'
import { HistoryList } from './components/HistoryList'
import MetricsSection from './components/MetricsSection'

const HistoryPage = () => {
  // ===== ROUTE PARAMS =====
  const { eventId } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // ===== RESPONSIVE =====
  const isMobile = useMediaQuery({ maxWidth: 1023 })

  // ===== INITIAL STATE FROM URL =====
  const initialPage = Number(searchParams.get('page')) || 1
  const initialFrom = searchParams.get('from')
  const initialTo = searchParams.get('to')

  const initialStatuses = useMemo<EventUserHistoryStatus[]>(
    () =>
      (searchParams.get('statuses')?.split(',') as EventUserHistoryStatus[]) ??
      [],
    [searchParams],
  )

  const initialUserIds = useMemo(
    () => searchParams.get('userIds')?.split(',') ?? [],
    [searchParams],
  )

  // ===== UI STATE =====
  const [page, setPage] = useState<number>(initialPage)
  const [from, setFrom] = useState<string | null>(initialFrom)
  const [to, setTo] = useState<string | null>(initialTo)

  const [selectedUsers, setSelectedUsers] = useState<IUserSimple[]>([])
  const [selectedStatuses, setSelectedStatuses] =
    useState<EventUserHistoryStatus[]>(initialStatuses)

  const [showFilters, setShowFilters] = useState<boolean>(false)

  // ===== LOAD USERS BY IDS (FOR URL RESTORE) =====
  const { data: initialUsers = [] } = useGetEventUsersByIdsQuery(
    initialUserIds.length
      ? {
          eventId: Number(eventId),
          userIds: initialUserIds.map(Number),
        }
      : skipToken,
  )

  useEffect(() => {
    if (initialUsers.length) {
      setSelectedUsers(initialUsers)
    }
  }, [initialUsers])

  // ===== DERIVED GROUPS =====
  const activeGroups = useMemo<StatusGroupKey[]>(() => {
    return Object.entries(STATUS_GROUPS)
      .filter(([, group]) =>
        group.statuses.every((s) => selectedStatuses.includes(s)),
      )
      .map(([key]) => key as StatusGroupKey)
  }, [selectedStatuses])

  // ===== FILTERS (MEMOIZED) =====
  const filters = useMemo<IFilters>(() => {
    return {
      statuses: selectedStatuses.length ? selectedStatuses : undefined,
      userIds: selectedUsers.length
        ? selectedUsers.map((u) => u.id)
        : undefined,
      from: from || undefined,
      to: to || undefined,
    }
  }, [selectedStatuses, selectedUsers, from, to])

  const params = useMemo<IMemoParams>(() => ({ ...filters }), [filters])

  // ===== API =====
  const { data: history = [], isLoading } = useGetEventHistoryQuery({
    eventId: Number(eventId),
    params: { ...params, page, limit: 10 },
  })

  const { data: metrics } = useGetEventHistoryMetricsQuery({
    eventId: Number(eventId),
  })

  // ===== HANDLERS =====
  const toggleGroup = (group: StatusGroupKey) => {
    const groupStatuses = STATUS_GROUPS[group].statuses

    setSelectedStatuses((prev) => {
      const hasAll = groupStatuses.every((s) => prev.includes(s))
      return hasAll
        ? prev.filter((s) => !groupStatuses.includes(s))
        : Array.from(new Set([...prev, ...groupStatuses]))
    })
  }

  const toggleStatus = (status: EventUserHistoryStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    )
  }

  // ===== RESET PAGE ON FILTER CHANGE =====
  useEffect(() => {
    setPage(1)
  }, [selectedStatuses, selectedUsers, from, to])

  // ===== SYNC STATE → URL =====
  useEffect(() => {
    const query = new URLSearchParams()

    query.set('page', String(page))
    if (from) query.set('from', from)
    if (to) query.set('to', to)

    if (selectedStatuses.length)
      query.set('statuses', selectedStatuses.join(','))

    if (selectedUsers.length)
      query.set('userIds', selectedUsers.map((u) => u.id).join(','))

    router.replace(`${pathname}?${query.toString()}`, { scroll: false })
  }, [pathname, page, selectedStatuses, selectedUsers, from, to, router])

  return (
    <div className="flex gap-8 items-start text-light">
      {/* LEFT SECTION */}
      <div className="flex-1 min-w-0">
        <div className="bg-bg-gray pb-4 mb-6">
          <UserFilter
            eventId={Number(eventId)}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />

          <button
            onClick={() => setShowFilters((p) => !p)}
            className="text-primary underline text-sm w-fit mt-2"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <div className="mt-4 border-t border-gray-700 pt-4 space-y-4">
              <StatusFilter
                activeGroups={activeGroups}
                selectedStatuses={selectedStatuses}
                toggleGroup={toggleGroup}
                toggleStatus={toggleStatus}
              />
              <DateFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
            </div>
          )}

          <ActiveFilters
            selectedUsers={selectedUsers}
            activeGroups={activeGroups}
            selectedStatuses={selectedStatuses}
            from={from}
            to={to}
            setSelectedUsers={setSelectedUsers}
            setSelectedStatuses={setSelectedStatuses}
            setFrom={setFrom}
            setTo={setTo}
          />
        </div>

        <HistoryList history={history} isLoading={isLoading} />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md bg-bg-gray disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-300">Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={history.length < 10}
            className="px-4 py-2 border rounded-md bg-bg-gray disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      {!isMobile && metrics && (
        <MetricsSection
          activity={metrics.activity}
          moderation={metrics.moderation}
        />
      )}
    </div>
  )
}

export default HistoryPage
