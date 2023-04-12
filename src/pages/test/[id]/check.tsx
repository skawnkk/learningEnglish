import React from 'react'
import Image from 'next/image'
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil'
import {isAnswerSelector, myAnswerAtom, testStateAtom} from '../../../recoil/quiz'
import styles from '../../../styles/pages/Check.module.css'
import TestLayout from '../../../components/layout/TestLayout'
import classNames from 'classnames'
import Button from '../../../atomics/button/Button'
import {useRouter} from 'next/router'
import StepBar from '../../../components/step/StepBar'
import {AnswerState} from '../../../types'

function CheckPage() {
  const router = useRouter()
  const isAnswer = useRecoilValue(isAnswerSelector)
  const resetMyAnswer = useResetRecoilState(myAnswerAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const {answers, current} = testState
  const isLastQuiz = answers.length === current + 1

  /**
   * @description StepBar 컴포넌트의 진행단계를 업데이트하는 함수
   */
  const updateStepBarInProgress = () =>{
    let originAnswerState = [...answers]
    originAnswerState.splice(current + 1, 1, AnswerState.TRYING)
    setTestState((prev) => ({...prev, current: prev.current + 1, answers: originAnswerState}))
  }

  const goNextQuiz = () => {
    updateStepBarInProgress()
    router.replace(`/test/${router.query.id}`)
  }

  const goResultPage = () => {
    router.replace(`/result`)
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
      {isLastQuiz ? (
        <Button onClick={goResultPage}>{'결과 확인하기'}</Button>
      ) : (
        <Button onClick={goNextQuiz}>{'다음 문제'}</Button>
      )}
    </TestLayout>
  )
}

export default CheckPage
