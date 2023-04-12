import {atom, selector} from 'recoil'
import {MyTestState, Question} from '../types'
import {readyTimeEndAtom} from './modal'

export const initialQuestion: Question = {
  answerKr: '',
  distractors: [],
  tts: '',
  words: [],
}

export const initialTestState: MyTestState = {
  id: 0,
  startDatetime: '',
  current: 0,
  complete: false,
  completeCount: 0,
  answers: [],
}

/**
 * @description
 * testListAtom 전체 테스트(리스트) 유저 이력
 * testStateAtom 현재 테스트에 대한 유저 이력
 */
const testListAtom = atom<MyTestState[]>({
  key: 'testListAtom',
  default: [initialTestState],
})

const testStateAtom = atom<MyTestState>({
  key: 'testStateAtom',
  default: initialTestState,
})

const myAnswerAtom = atom<string[]>({
  key: 'myAnswerAtom',
  default: [],
})

const questionsAtom = atom({
  key: 'questionsAtom',
  default: [],
})

const isAnswerSelector = selector({
  key: 'isAnswerSelector',
  get: ({get}) => {
    const questions = get(questionsAtom)
    const {current} = get(testStateAtom)
    if (questions.length < current) return false

    const question = questions[current]
    const myAnswer = get(myAnswerAtom)
    return question?.words.join(' ') === myAnswer.join(' ')
  },
})

const myScoreResultSelector = selector({
  key: 'myScoreResultSelector',
  get: ({get}) => {
    const {answers} = get(testStateAtom)
    const wrongAnswerCount = answers.reduce((acc, curr) => {
      return acc + curr
    }, 0)

    return {
      wrongAnswerCount,
      correctAnswerCount: answers.length - wrongAnswerCount,
      totalCount: answers.length,
    }
  },
})

/**
 * @description
 * getResultAfterEnd 정상적으로 테스트 완료한 후의 결과 정보
 * getResultWhileTest 테스트 도중에 창을 종료했을 경우의 결과 정보
 * getResetTestInfo 테스트 결과 확인 후, 다시 테스트하기를 시도할 경우의 결과 정보
 */
const getResultAfterEnd = selector({
  key: 'getResultAfterEnd',
  get: ({get}) => {
    const testState = get(testStateAtom)
    const originTestResult = {...testState}
    return {
      ...originTestResult,
      complete: true,
      completeCount: originTestResult.completeCount + 1,
    }
  },
})

const getResultWhileTest = selector({
  key: 'getResultWhileTest',
  get: ({get}) => {
    const testState = get(testStateAtom)
    const {answers, current} = testState
    const originTestResult = {...testState}
    const isLastQuiz = current + 1 === answers.length

    return {
      ...originTestResult,
      complete: isLastQuiz,
      completeCount: isLastQuiz
        ? originTestResult.completeCount + 1
        : originTestResult.completeCount,
    }
  },
})

const getResetTestInfo = selector({
  key: 'getResetTestInfo',
  get: ({get}) => {
    const testState = get(testStateAtom)
    return {...testState, complete: false, answers: [], current: 0}
  },
})

export {
  testListAtom,
  testStateAtom,
  myAnswerAtom,
  questionsAtom,
  isAnswerSelector,
  myScoreResultSelector,
  getResultWhileTest,
  getResultAfterEnd,
  getResetTestInfo,
}
