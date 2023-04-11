import React, {useEffect} from 'react'
import TestTimer from './TestTimer'
import Button from '../../atomics/button/Button'
import classNames from 'classnames'
import styles from './BottomNav.module.css'
import {useRecoilState, useRecoilValue} from 'recoil'
import {isAnswerSelector, myAnswerAtom, testStateAtom} from '../../state/atoms'
import {useTimer} from '../../hooks/useTimer'
import {useRouter} from 'next/router'
import {AnswerState} from '../step/StepBar'

function BottomNav() {
  const router = useRouter()
  const time = useTimer(45, 'ss')
  const myAnswerList = useRecoilValue(myAnswerAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const isAnswer = useRecoilValue(isAnswerSelector)
  const getIsActiveButton = () => {
    if (time < 1 || myAnswerList.length === 0) return false
    return true
  }
  const isActiveButton = getIsActiveButton()

  const checkAnswer = () => {
    let originAnswerState = [...testState.answers]
    originAnswerState.splice(
      testState.current,
      1,
      isAnswer ? AnswerState.CORRECT : AnswerState.WRONG
    )

    setTestState((prev) => ({...prev, answers: originAnswerState}))
    router.replace(`/test/${router.query.id}/check`)
  }

  useEffect(()=>{
    if(time<1){
      checkAnswer()
    }
  },[time])

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
