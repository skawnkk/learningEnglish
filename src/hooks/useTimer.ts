import {useEffect, useState} from 'react'

type TimeFormat = 's' | 'ss'

interface UseTimerProps {
  limitTime: number
  format?: TimeFormat
  start?: boolean
}

export const useTimer = ({
  limitTime,
  format = 's',
  start = true,
}: UseTimerProps) => {
  const [time, setTime] = useState(limitTime)

  useEffect(() => {
    if(!start) return
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1)
      }
      clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [time, start])

  const formatTime = (time) => {
    if (format === 'ss' && time > 0 && time < 10) {
      return `0${time}`
    }
    return time
  }

  return formatTime(time)
}
