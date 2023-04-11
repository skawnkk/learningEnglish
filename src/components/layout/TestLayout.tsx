import React from 'react'
import Header from '../header/Header'
import {useSetRecoilState} from 'recoil'
import {myAnswerAtom} from '../../state/atoms'
import {useRouter} from 'next/router'
import classNames from 'classnames'

interface TestLayoutProps {
  className: string
  children: React.ReactElement
}

function TestLayout({className, children}: TestLayoutProps) {
  const router = useRouter()

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
      <div className={'flex flex-col flex-1'}>{children}</div>
    </div>
  )
}

export default TestLayout
