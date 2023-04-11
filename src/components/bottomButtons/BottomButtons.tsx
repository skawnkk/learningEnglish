import React from 'react'
import Button from '../../atomics/button/Button'
import styles from '../../atomics/button/Button.module.css'
import {RESULT} from '../../pages/result'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {testStateAtom} from '../../recoil/quiz'

interface BottomButtons {
  testResult: RESULT
}

function BottomButtons({testResult}: BottomButtons) {
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const router = useRouter()
  const testAgain = () =>{
    setTestState(prev => ({...prev, complete: false, answers:[], current:0}))
    router.push(`/test/${testState.id}`)
  }
  const endTest = () =>{
    router.push('/')
  }

  return (
    <div className={'flex gap-[8px]'}>
      {testResult !== RESULT.PERFECT && <Button className={classNames(styles.ghost, 'flex-1')} onClick={testAgain}>다시 풀어보기</Button>}
      <Button className={'flex-1'} onClick={endTest}>확인</Button>
    </div>
  )
}

export default BottomButtons
