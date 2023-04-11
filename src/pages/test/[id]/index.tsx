import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {useModal} from '../../../atomics/modal/useModal'
import {questionAtom, testStateAtom} from '../../../recoil/quiz'
import StepBar from '../../../components/step/StepBar'
import TimerModal from '../../../components/modal/TimerModal'
import QuizSection from '../../../components/quizSection/QuizSection'
import BottomNav from '../../../components/bottomNav/BottomNav'
import TestLayout from '../../../components/layout/TestLayout'
import ErrorModal from '../../../components/modal/ErrorModal'
import {getQuestions} from '../../../service/getQuestions'
import {AnswerState} from '../../../types'

function TestPage() {
  const {openModal, closeModal} = useModal()
  const router = useRouter()
  const id = Number(router.query.id as string)
  const [questions, setQuestions] = useState([])
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const setQuestion = useSetRecoilState(questionAtom)
  const fetchQuestions = () => {
    getQuestions({
      id,
      onSuccess: ({data}) => {
        setQuestions(data.content)
        updateAnswerState(data.content.length)
        setQuestion(data.content[testState.current])
      },
      onFail: () => {
        openModal(<ErrorModal onClickFetchAgain={onClickFetchAgain} onClickBack={moveBack} />)
      },
    })
  }
  const onClickFetchAgain = () => {
    closeModal()
    fetchQuestions()
  }
  const moveBack = () => {
    router.back()
    closeModal()
  }

  useEffect(() => {
    if (!id) return
    if (testState.current === 0) {
      openModal(<TimerModal />)
    }

    fetchQuestions()
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
    <TestLayout>
      <StepBar stepList={testState.answers} current={testState.current} />
      <QuizSection questions={questions} current={testState.current} />
      <BottomNav />
    </TestLayout>
  )
}

export default TestPage
