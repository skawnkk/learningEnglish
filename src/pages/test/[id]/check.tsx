import React from 'react'
import Image from 'next/image'
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil'
import {isAnswerAtom, isLastQuizAtom, myAnswerAtom, testStateAtom} from '../../../state/atoms'
import styles from '../../../styles/pages/Check.module.css'
import TestLayout from '../../../components/layout/TestLayout'
import classNames from 'classnames'
import Button from '../../../atomics/button/Button'
import {useRouter} from 'next/router'
import StepBar, {AnswerState} from '../../../components/step/StepBar'

function Check() {
  const router = useRouter()
  const isAnswer = useRecoilValue(isAnswerAtom)
  const resetMyAnswer = useResetRecoilState(myAnswerAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)

  const goNextQuiz = () => {
    resetMyAnswer()
    let originAnswerState = [...testState.answers]
    originAnswerState.splice(testState.current + 1, 1, AnswerState.TRYING)

    setTestState((prev) => ({...prev, current: prev.current + 1, answers: originAnswerState}))
    router.replace(`/test/${router.query.id}`)
  }

  return (
    <TestLayout className={styles.checkLayout}>
      <StepBar stepList={testState.answers} current={testState.current} />
      {isAnswer ? (
        <div className={classNames('wrapper', styles.wrap)}>
          <Image src={'/icon/test_success.png'} width={160} height={160} alt={'test-success'} />
          <p className={styles.text}>
            <span className={styles.success}>정답</span>이에요
          </p>
        </div>
      ) : (
        <div className={classNames('wrapper', styles.wrap)}>
          <Image src={'/icon/test_fail.png'} width={160} height={160} alt={'test_fail'} />
          <p className={styles.text}>
            <span className={styles.fail}>오답</span>이에요
          </p>
        </div>
      )}
      <Button onClick={goNextQuiz}>다음 문제</Button>
    </TestLayout>
  )
}

export default Check
