import React, {useEffect} from 'react'
import TestTimer from '../TestTimer'
import Button from '../../../atomics/button/Button'
import classNames from 'classnames'
import styles from './BottomNav.module.css'
import {useRecoilState, useRecoilValue} from 'recoil'
import {isAnswerSelector, myAnswerAtom, testStateAtom} from '../../../recoil/quiz'
import {useTimer} from '../../../hooks/useTimer'
import {useRouter} from 'next/router'
import {readyTimeEndAtom} from '../../../recoil/modal'
import {AnswerState} from '../../../types'

function BottomNav() {
  const router = useRouter()
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const myAnswerList = useRecoilValue(myAnswerAtom)
  const isAnswer = useRecoilValue(isAnswerSelector)
  const isReadyTimeEnd = useRecoilValue(readyTimeEndAtom)
  const time = useTimer({limitTime: 45, format: 'ss', start: isReadyTimeEnd})
  const getIsActiveButton = () => {
    return !(time < 1 || myAnswerList.length === 0)
  }
  const checkAnswer = () => {
    let originAnswerState = [...testState.answers]
    originAnswerState.splice(
      testState.current,
      1,
      isAnswer ? AnswerState.CORRECT : AnswerState.WRONG
    )
    setTestState((prev) => ({...prev, answers: originAnswerState}))
  }
  const submitAnswer = () => {
    checkAnswer()
    router.replace(`/test/${router.query.id}/check`)
  }

  useEffect(() => {
    if (time < 1) {
      submitAnswer()
    }
  }, [time])

  return (
    <div className={classNames(styles.bottomNav, 'flex justify-between')}>
      <TestTimer time={time} />
      <Button className={styles.mediaSize} disabled={!getIsActiveButton()} onClick={submitAnswer}>
        {'다 풀었어요'}
      </Button>
    </div>
  )
}

export default BottomNav
