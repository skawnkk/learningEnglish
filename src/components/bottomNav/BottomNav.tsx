import React from 'react'
import TestTimer from './TestTimer'
import Button from '../../atomics/button/Button'
import classNames from 'classnames'
import styles from './BottomNav.module.css'
import {useRecoilValue} from 'recoil'
import {myAnswerAtom} from '../../state/atoms'
import {useTimer} from '../../hooks/useTimer'
import {useRouter} from 'next/router'

function BottomNav() {
  const router = useRouter()
  const time = useTimer(45, 'ss')
  const myAnswerList = useRecoilValue(myAnswerAtom)
  const getIsActiveButton = () => {
    if (time < 1 || myAnswerList.length === 0) return false
    return true
  }

  const checkAnswer = () => {
    router.replace(`/test/${router.query.id}/check`)
  }

  const isActiveButton = getIsActiveButton()
  return (
    <div className={classNames(styles.bottomNav, 'flex justify-between')}>
      <TestTimer time={time} />
      <Button disabled={!isActiveButton} onClick={checkAnswer}>
        {'다 풀었어요'}
      </Button>
    </div>
  )
}

export default BottomNav
