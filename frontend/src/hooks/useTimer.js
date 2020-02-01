import { useState, useEffect } from 'react'

// This is kinda like a stopwatch
const useTimer = (startValue) => {
  const [value, setValue] = useState(startValue)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setValue(value + 1), 1000)
      return () => window.clearInterval(timer)
    }
  }, [value, active])

  const start = () => {
    setActive(true)
  }

  const stop = () => {
    setActive(false)
  }

  const zero = () => {
    setValue(0)
  }

  return { start, stop, zero, value, active }
}

export default useTimer