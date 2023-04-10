import React from 'react'
import {useTimer} from '../../hooks/useTimer'
import styles from './BottomNav.module.css'

function TestTimer() {
  const time = useTimer(45, 'ss')
  
  return (
    <div className={'flex items-center'}>
      <p>남은 시간</p>
      <div className={styles.time}>{time}초</div>
    </div>
  )
}

export default TestTimer
