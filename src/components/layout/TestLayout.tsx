import React, {useEffect} from 'react'
import Header from '../header/Header'
import {useSetRecoilState} from 'recoil'
import {myAnswerAtom} from '../../recoil/quiz'
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
    router.push('/')
  }

  useEffect(() => {
    return () => setMyAnswerList([])
  }, [])

  return (
    <div className={classNames('flex flex-col flex-1 px-4', className)}>
      <Header title={'테스트'} clear onClick={moveBack}/>
      <div className={'flex flex-col flex-1'}>{children}</div>
    </div>
  )
}

export default TestLayout
