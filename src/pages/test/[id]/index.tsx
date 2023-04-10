import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import TimerModal from '../../../components/modal/TimerModal'
import Header from '../../../components/header/Header'
import StepBar, {AnswerState} from '../../../components/step/StepBar'
import QuizSection from '../../../components/quizSection/QuizSection'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {myAnswerAtom, questionAtom, testStateAtom} from '../../../state/atoms'
import BottomNav from '../../../components/bottomNav/BottomNav'

function TestPage() {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const [questions, setQuestions] = useState([])
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const [question, setQuestion] = useRecoilState(questionAtom)
  const setMyAnswerList = useSetRecoilState(myAnswerAtom)
  const moveBack = () => {
    router.back()
    setMyAnswerList([])
  }

  useEffect(() => {
    if (!id) return

    const getQuestions = () => {
      fetch(`https://qualson-test.vercel.app/api/test/${id}`)
        .then((res) => {
          if (res.status === 500) {
            throw Error()
          }
          return res.json()
        })
        .then((res) => {
          setQuestions(res.data.content)
          updateAnswerState(res.data.content.length)
          setQuestion(res.data.content[testState.current])
        })
        .catch((err) => {
          console.log(err) //에러처리(모달?)
          router.back()
        })
    }

    getQuestions()
  }, [id])

  const updateAnswerState = (questionLength: number) => {
    if (testState.answers.length === 0) {
      const convertedAnswers = Array(questionLength)
        .fill(0)
        .map((q, idx) => {
          if (idx === 0) return {no: idx, state: AnswerState.TRYING}
          return {no: idx, state: AnswerState.TODO}
        })

      setTestState({...testState, answers: convertedAnswers})
    }
  }

  return (
    <>
      <TimerModal />
      <div className={'flex flex-col flex-1 px-4'}>
        <Header clear onClick={moveBack}>
          테스트
        </Header>
        <StepBar stepList={testState.answers} current={testState.current} />
        <QuizSection questions={questions} current={testState.current} />
        <BottomNav />
      </div>
    </>
  )
}

export default TestPage
