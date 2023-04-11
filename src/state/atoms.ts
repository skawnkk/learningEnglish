import {atom, selector} from 'recoil'
import {initialTestState} from '../utils/quiz'
import {initialQuestion} from '../types/questions'

//testList
const testListAtom = atom({
  key: 'testList',
  default: [initialTestState],
})

//testItem
const testStateAtom = atom({
  key: 'testState',
  default: initialTestState,
})

//myCurrentAnswer
const myAnswerAtom = atom({
  key: 'myAnswerAtom',
  default: [],
})

//currentQuestion
const questionAtom = atom({
  key: 'questionAtom',
  default: initialQuestion,
})

//todo: selector로 이름 수정
//currentAnswer
const isAnswerSelector = selector({
  key: 'isAnswer',
  get: ({get}) => {
    const question = get(questionAtom)
    const myAnswer = get(myAnswerAtom)
    return question.words.join(' ') === myAnswer.join(' ')
  },
})

const myScoreResultSelector = selector({
  key: 'myScoreResult',
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

export {testListAtom, testStateAtom, myAnswerAtom, questionAtom, isAnswerSelector, myScoreResultSelector}
