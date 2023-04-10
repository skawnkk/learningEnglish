import React from 'react'
import Header from '../header/Header'
import StepBar from '../step/StepBar'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {myAnswerAtom, testStateAtom} from '../../state/atoms'
import {useRouter} from 'next/router'
import classNames from 'classnames'

interface TestLayoutProps {
  className: string
  children: React.ReactElement
}

function TestLayout({className, children}: TestLayoutProps) {
  const router = useRouter()
  const testState = useRecoilValue(testStateAtom)

  const setMyAnswerList = useSetRecoilState(myAnswerAtom)
  const moveBack = () => {
    router.back()
    setMyAnswerList([])
  }

  return (
    <div className={classNames('flex flex-col flex-1 px-4', className)}>
      <Header clear onClick={moveBack}>
        테스트
      </Header>
      <StepBar stepList={testState.answers} current={testState.current} />
      <div className={'flex flex-col flex-1'}>{children}</div>
    </div>
  )
}

export default TestLayout
