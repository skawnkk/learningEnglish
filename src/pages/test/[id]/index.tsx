import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {useModal} from '../../../atomics/modal/useModal'
import {questionsAtom, testStateAtom} from '../../../recoil/quiz'
import StepBar from '../../../components/test/step/StepBar'
import TimerModal from '../../../components/modal/TimerModal'
import QuizSection from '../../../components/test/quizSection/QuizSection'
import BottomNav from '../../../components/test/bottomNav/BottomNav'
import ErrorModal from '../../../components/modal/ErrorModal'
import {getQuestions} from '../../../service/getQuestions'
import {AnswerState} from '../../../types'
import TestLayout from '../../../components/common/layout/TestLayout'

const createAnswerList = (questionLength: number) => {
  return Array(questionLength)
    .fill(0)
    .map((_, idx) => {
      if (idx === 0) return AnswerState.TRYING
      return AnswerState.TODO
    })
}

function TestPage() {
  const {openModal, closeModal} = useModal()
  const router = useRouter()
  const id = Number(router.query.id as string)
  const setQuestions = useSetRecoilState(questionsAtom)
  const [testState, setTestState] = useRecoilState(testStateAtom)
  const fetchQuestions = (id: number) => {
    getQuestions({
      id,
      onSuccess: ({data}) => {
        setQuestions(data.content)
        const hasAnswerList = testState.answers.length > 0
        if (!hasAnswerList) {
          const answerList = createAnswerList(data.content.length)
          setTestState({...testState, answers: answerList})
        }
      },
      onFail: () => {
        openModal(<ErrorModal onClickFetchAgain={onClickFetchAgain} onClickBack={moveBack} />)
      },
    })
  }

  const onClickFetchAgain = () => {
    closeModal()
    fetchQuestions(id)
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

    fetchQuestions(id)
  }, [id])

  return (
    <TestLayout>
      <StepBar stepList={testState.answers} current={testState.current} />
      <QuizSection />
      <BottomNav />
    </TestLayout>
  )
}

export default TestPage
