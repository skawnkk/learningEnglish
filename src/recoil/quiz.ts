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

//test historyList
const testListAtom = atom({
  key: 'testListAtom',
  default: [initialTestState],
})

//test currentTestState
const testStateAtom = atom({
  key: 'testStateAtom',
  default: initialTestState,
})

const myAnswerAtom = atom({
  key: 'myAnswerAtom',
  default: [],
})

const questionAtom = atom({
  key: 'questionAtom',
  default: initialQuestion,
})

const isAnswerSelector = selector({
  key: 'isAnswerSelector',
  get: ({get}) => {
    const question = get(questionAtom)
    const myAnswer = get(myAnswerAtom)
    return question.words.join(' ') === myAnswer.join(' ')
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
//todo:중간에 게임을 관두면?

//테스트 다시하기 클릭 시
const resetTestInfo = selector({
  key: 'resetTestInfo',
  get: ({get}) => {},
  set: ({get, set, reset}, newValue) => {
    const testState = get(testStateAtom)
    set(testStateAtom, {...testState, complete: false, answers: [], current: 0})
    reset(myAnswerAtom)
    reset(readyTimeEndAtom)
  },
})

export {
  testListAtom,
  testStateAtom,
  myAnswerAtom,
  questionAtom,
  isAnswerSelector,
  myScoreResultSelector,
  resetTestInfo,
}
