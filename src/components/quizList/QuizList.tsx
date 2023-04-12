import React from 'react'
import styles from '../../styles/pages/TestList.module.css'
import Image from 'next/image'
import router from 'next/router'
import {convertYYMMDD} from '../../utils/date'
import {getMyQuizList, getQuizHistory} from '../../utils/quiz'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {testListAtom, testStateAtom} from '../../recoil/quiz'
import {TestList} from '../../pages'
import classNames from 'classnames'

interface QuizList {
  testList: TestList
}

function QuizList({testList}: QuizList) {
  const setTestStateList = useSetRecoilState(testListAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)

  const startTest = (id: number) => {
    const quizList = getMyQuizList()
    const testHistory = getQuizHistory(quizList, id)

    if (testHistory) {
      setTestState(testHistory)
      setTestStateList([...quizList])
      const routerPath = testHistory?.complete ? `/result?referrer=list` : `/test/${id}`
      router.push(routerPath)
      return
    }

    setTestState({...testState, id})
    setTestStateList([{...testState, id}])
    router.push(`/test/${id}`)
  }

  return (
    <div>
      {testList.map((test) => {
        return (
          <div key={test.id} className={classNames(styles.testItem, 'cursor-pointer')} onClick={() => startTest(test.id)} role={'presentation'}>
            <div>
              <p>{test.subtitle}</p>
              <p className={styles.date}>{convertYYMMDD(new Date(test.startDatetime))}</p>
            </div>
            <Image src={'/icon/arrow_right.svg'} width={7} height={12} alt={'icon_detail'} />
          </div>
        )
      })}
    </div>
  )
}

export default QuizList
