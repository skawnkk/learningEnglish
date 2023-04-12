import React from 'react'
import styles from './bottomNav/BottomNav.module.css'

function TestTimer({time}:{time:number}) {

  return (
    <div className={'flex items-center'}>
      <p>남은 시간</p>
      <div className={styles.time}>{time}초</div>
    </div>
  )
}

export default TestTimer
