import React, {useEffect} from 'react'
import TestLayout from '../components/layout/TestLayout'
import {useRecoilState, useRecoilValue} from 'recoil'
import {myScoreResultSelector, testStateAtom} from '../state/atoms'
import ScoreSection from '../components/result/ScoreSection'
import BottomButtons from '../components/bottomButtons/BottomButtons'
import {saveQuizResult} from '../utils/quiz'
import {useRouter} from 'next/router'

export enum RESULT {
  PERFECT = 'perfect',
  GOOD = 'good',
  FAIL = 'fail',
}

function Result() {
  const router = useRouter()
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const getTestResult = () => {
    const wrongAnswerCount = testState.answers.reduce((acc, curr) => {
      return acc + curr
    }, 0)

    if (wrongAnswerCount === 0) return RESULT.PERFECT
    if (wrongAnswerCount > 3) return RESULT.FAIL
    return RESULT.GOOD
  }
  const testResult = getTestResult()

  useEffect(() => {
    if (router.query.referrer) return
    const originTestResult = {...testState}
    const newTestResult = {
      ...originTestResult,
      complete: true,
      completeCount: originTestResult.completeCount + 1,
    }
    setTestState(newTestResult)
    saveQuizResult(newTestResult)
    //todo:나중에 데이터 complete false, answers [], current 0로 만들고 재시작하기
  }, [router.query.referrer])

  return (
    <TestLayout className={'pb-[16px]'}>
      <ScoreSection testResult={testResult} />
      <BottomButtons testResult={testResult} />
    </TestLayout>
  )
}

export default Result
