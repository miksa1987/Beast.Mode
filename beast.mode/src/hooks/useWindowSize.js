import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const getSize = () => {
    return { width: window.innerWidth, height: window.innerHeight }
  }

  const [size, setSize] = useState(getSize())
  console.log(size)

  useEffect(() => {
    const setResize = () => {
      setSize(getSize())
    }

    window.addEventListener('resize', setResize)

    return () => {
      window.removeEventListener('resize', setResize)
    }
  }, [])

  return size
}

export default useWindowSize