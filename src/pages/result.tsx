import React, {useEffect} from 'react'
import TestLayout from '../components/common/layout/TestLayout'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {getResultAfterEnd, myScoreResultSelector, testStateAtom} from '../recoil/quiz'
import ScoreSection from '../components/result/ScoreSection'
import BottomButtons from '../components/result/BottomButtons'
import {saveQuizResult} from '../utils/quiz'
import {useRouter} from 'next/router'
import {RESULT} from '../types'

function Result() {
  const router = useRouter()
  const setTestState = useSetRecoilState(testStateAtom)
  const {wrongAnswerCount} = useRecoilValue(myScoreResultSelector)
  const testInfoForReset = useRecoilValue(getResultAfterEnd)
  const getTestResult = () => {
    if (wrongAnswerCount === 0) return RESULT.PERFECT
    if (wrongAnswerCount > 3) return RESULT.FAIL
    return RESULT.GOOD
  }
  const testResult = getTestResult()

  useEffect(() => {
    if (router.query.referrer) return
    setTestState(testInfoForReset)
    saveQuizResult(testInfoForReset)
  }, [router.query.referrer])

  return (
    <TestLayout className={'pb-[16px]'}>
      <ScoreSection testResult={testResult} />
      <BottomButtons testResult={testResult} />
    </TestLayout>
  )
}

export default Result
