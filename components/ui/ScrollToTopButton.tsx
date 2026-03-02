'use client'

import { useEffect, useState } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { animateScroll as scroll } from 'react-scroll'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() =>
        scroll.scrollToTop({
          duration: 500,
          smooth: 'easeInOutCubic',
        })
      }
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-xl
        bg-primary text-dark
        flex items-center justify-center
        shadow-xl hover:scale-110 transition
      "
      title="Scroll to top"
    >
      <ArrowUpIcon size={32} />
    </button>
  )
}

export default ScrollToTopButton
