import React, { useEffect, useRef, useState } from 'react'

const BoardScroller = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const tasksContainer = (e.target as HTMLElement).closest(
        '.tasks-container'
      )

      if (tasksContainer) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.stopPropagation()
          tasksContainer.scrollTop += e.deltaY
          e.preventDefault()
        }
      } else {
        if (e.deltaY === 0) return
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const startDrag = (e: React.MouseEvent) => {
    if (!scrollRef.current) return

    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const duringDrag = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return

    e.preventDefault()

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const endDrag = () => {
    setIsDragging(false)
  }

  return (
    <div className="flex-1 min-h-0 overflow-hidden relative">
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent z-20 pointer-events-none" />

      <main
        ref={scrollRef}
        className={`flex p-4 gap-4 h-full overflow-x-auto overflow-y-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          paddingRight: '2rem',
          minWidth: '100%',
        }}
        onMouseDown={startDrag}
        onMouseMove={duringDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {children}
      </main>
    </div>
  )
}

export default BoardScroller
