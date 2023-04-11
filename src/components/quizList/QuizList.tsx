import React from 'react'
import styles from '../../styles/pages/TestList.module.css'
import Image from 'next/image'
import router from 'next/router'
import {formatDate} from '../../utils/date'
import {getMyQuizList, getQuizHistory} from '../../utils/quiz'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {testListAtom, testStateAtom} from '../../recoil/quiz'

function QuizList({testList}) {
  const setTestStateList = useSetRecoilState(testListAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)

  const startTest = (id: number) => {
    const quizList = getMyQuizList()
    const currentTestHistory = getQuizHistory(quizList, id)

    if (currentTestHistory) {
      setTestState(currentTestHistory)
      setTestStateList([...quizList])
      const routerPath = currentTestHistory?.complete ? `/result?referrer=list` : `/test/${id}`
      router.push(routerPath)
      return
    }

    setTestState({...testState, id})
    setTestStateList([{...testState, id}])
    router.push(`/test/${id}`)
  }

  return (
    <div>
      {testList.map((li) => {
        return (
          <div key={li.id} className={styles.testItem} onClick={() => startTest(li.id)}>
            <div>
              <p>{li.subtitle}</p>
              <p className={styles.date}>{formatDate(new Date(li.startDatetime))}</p>
            </div>
            <Image src={'/icon/arrow_right.svg'} width={7} height={12} alt={'icon_detail'} />
          </div>
        )
      })}
    </div>
  )
}

export default QuizList
