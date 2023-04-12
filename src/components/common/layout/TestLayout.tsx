import React from 'react'
import {useRouter} from 'next/router'
import classNames from 'classnames'
import {useRecoilValue, useResetRecoilState} from 'recoil'
import {getResultWhileTest, myAnswerAtom} from '../../../recoil/quiz'
import {readyTimeEndAtom} from '../../../recoil/modal'
import Header from '../header/Header'
import {saveQuizResult} from '../../../utils/quiz'

interface TestLayoutProps {
  className: string
  children: React.ReactElement
}

function TestLayout({className, children}: TestLayoutProps) {
  const router = useRouter()
  const resetMyAnswer = useResetRecoilState(myAnswerAtom)
  const resetTimerModal = useResetRecoilState(readyTimeEndAtom)
  const resultWhileTest = useRecoilValue(getResultWhileTest)

  const moveBack = () => {
    resetMyAnswer()
    resetTimerModal()
    saveQuizResult(resultWhileTest)
    router.push('/')
  }

  return (
    <div className={classNames('flex flex-col flex-1 px-4', className)}>
      <Header title={'테스트'} clear onClick={moveBack} />
      <div className={'flex flex-col flex-1'}>{children}</div>
    </div>
  )
}

export default TestLayout
