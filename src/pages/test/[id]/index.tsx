import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import TimerModal from '../../../components/modal/TimerModal'
import {AnswerState} from '../../../components/step/StepBar'
import QuizSection from '../../../components/quizSection/QuizSection'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {questionAtom, testStateAtom} from '../../../state/atoms'
import BottomNav from '../../../components/bottomNav/BottomNav'
import TestLayout from '../../../components/layout/TestLayout'
import {useModal} from "../../../atomics/modal/useModal";

function TestPage() {
  const {openModal}=useModal()
  const router = useRouter()
  const id = Number(router.query.id as string)
  const [questions, setQuestions] = useState([])
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const setQuestion = useSetRecoilState(questionAtom)

  useEffect(() => {
    if (!id) return
    openModal(<TimerModal/>)
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
          console.log(err) //todo:에러처리(모달?) - 재요청/리스트가기 모달
          router.back()
        })
    }

    getQuestions()
  }, [id])

  const updateAnswerState = (questionLength: number) => {
    if (testState.answers.length === 0) {
      const convertedAnswers = Array(questionLength)
        .fill(0)
        .map((_, idx) => {
          if (idx === 0) return AnswerState.TRYING
          return AnswerState.TODO
        })

      setTestState({...testState, answers: convertedAnswers})
    }
  }

  return (
    <>
      <TestLayout>
        <QuizSection questions={questions} current={testState.current} />
        <BottomNav />
      </TestLayout>
    </>
  )
}

export default TestPage