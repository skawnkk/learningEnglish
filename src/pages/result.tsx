import React from 'react'
import TestLayout from '../components/layout/TestLayout'
import {useRecoilState} from 'recoil'
import {testStateAtom} from '../state/atoms'
import ScoreSection from "../components/result/ScoreSection";

export enum RESULT {
  PERFECT = 'perfect',
  GOOD = 'good',
  FAIL = 'fail',
}

function Result() {
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
  return (
    <TestLayout>
      <ScoreSection testResult={testResult}/>
    </TestLayout>
  )
}

export default Result
