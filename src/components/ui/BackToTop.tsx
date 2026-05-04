
import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronUp } from 'lucide-react'

const SCROLL_VISIBLE_THRESHOLD_PCT = 20;
const ICON_SIZE = 24;

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ticking = useRef(false)

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const next = scrollHeight > 0 && (window.scrollY / scrollHeight) * 100 >= SCROLL_VISIBLE_THRESHOLD_PCT
      setIsVisible(prev => prev === next ? prev : next)
      ticking.current = false
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg transition-colors duration-300 z-50"
      aria-label="Back to top"
    >
      <ChevronUp size={ICON_SIZE} />
    </button>
  )
}

export default BackToTop