import React from 'react'
import TestTimer from './TestTimer'
import Button from '../../atomics/button/Button'
import classNames from 'classnames'
import styles from './BottomNav.module.css'

function BottomNav() {
  return (
    <div className={classNames(styles.bottomNav, 'flex justify-between')}>
      <TestTimer />
      <Button disabled={true}>{'버튼문구'}</Button>
    </div>
  )
}

export default BottomNav
