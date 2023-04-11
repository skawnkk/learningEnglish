import React from 'react'
import styles from '../../styles/pages/TestList.module.css'
import Image from 'next/image'
import router from 'next/router'
import {formatDate} from '../../utils/date'
import {getMyQuizList} from '../../utils/quiz'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {testListAtom, testStateAtom} from '../../state/atoms'

function QuizList({testList}) {
  const setTestStateList = useSetRecoilState(testListAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)

  const startTest = (id: number) => {
    const quizList = getMyQuizList()

    if (quizList.length === 0) {
      setTestState({...testState, id})
      setTestStateList([{...testState, id}])
    } else {
      const currentTestState = quizList.find((li) => li.id === id)
      if(currentTestState) {
        setTestState(currentTestState)
        setTestStateList([...quizList])

        if (currentTestState?.complete) {
          router.push(`/result?referrer=list`)
          return
        }
      }else{
        setTestState({...testState, id})
        setTestStateList([{...testState, id}])
      }
    }
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
            <Image
              src={'/icon/arrow_right.svg'}
              width={7}
              height={12}
              layout={'fixed'}
              alt={'icon_detail'}
            />
          </div>
        )
      })}
    </div>
  )
}

export default QuizList
