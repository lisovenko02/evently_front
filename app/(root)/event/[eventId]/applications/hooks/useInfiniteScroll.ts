import { useCallback, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  isFetching: boolean
  onLoadMore: () => void
}

export const useInfiniteScroll = ({
  hasMore,
  isFetching,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()

      if (!node || !hasMore) return

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          onLoadMore()
        }
      })

      observer.current.observe(node)
    },
    [hasMore, isFetching, onLoadMore],
  )

  return loadMoreRef
}
