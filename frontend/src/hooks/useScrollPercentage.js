import { useState, useEffect } from 'react'

const useScrollPercentage = () => {
  const calculatePercentage = () => {
    const scrollPosition = document.documentElement.scrollTop
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    
    return scrollPosition / maxScroll * 100
  }

  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const setScrollPercentage = () => {
      setPercentage(calculatePercentage())
    }

    window.addEventListener('scroll', setScrollPercentage)

    return () => window.removeEventListener('scroll', setScrollPercentage)
  }, [])

  return percentage
}

export default useScrollPercentage