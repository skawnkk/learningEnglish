import {useEffect, useState} from 'react'

type TimeFormat = 's' | 'ss'

export const useTimer = (limitTime: number, format: TimeFormat = 's') => {
  const [time, setTime] = useState(limitTime)

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1)
      }
      clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [time])

  const formatTime = (time) => {
    if (format === 'ss' && time > 0 && time < 10) {
      return `0${time}`
    }
    return time
  }

  return formatTime(time)
}
