import React from 'react'
import Button from '../../atomics/button/Button'
import styles from '../../atomics/button/Button.module.css'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {resetTestInfo, testStateAtom} from '../../recoil/quiz'
import {RESULT} from '../../types'

interface BottomButtons {
  testResult: RESULT
}

function BottomButtons({testResult}: BottomButtons) {
  const testState = useRecoilValue(testStateAtom)
  const resetMyTestState = useSetRecoilState(resetTestInfo)
  const router = useRouter()
  const needTestAgain = testState.completeCount > 1
  const testAgain = () => {
    resetMyTestState(null)
    router.push(`/test/${testState.id}`)
  }
  const endTest = () => {
    router.push('/')
  }

  return (
    <div className={'flex gap-[8px] whitespace-nowrap'}>
      {testResult !== RESULT.PERFECT && (
        <Button
          className={classNames(!needTestAgain && styles.ghost, 'flex-1')}
          onClick={testAgain}
        >
          다시 풀어보기
        </Button>
      )}
      <Button className={classNames(needTestAgain && styles.ghost, 'flex-1')} onClick={endTest}>
        확인
      </Button>
    </div>
  )
}

export default BottomButtons
