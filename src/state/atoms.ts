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

//testItem
const myAnswerAtom = atom({
  key: 'myAnswerAtom',
  default: [],
})

//currentQuestion
const questionAtom = atom({
  key: 'questionAtom',
  default: initialQuestion,
})

const isAnswerAtom = selector({
  key: 'isAnswer',
  get: ({get}) => {
    const question = get(questionAtom)
    const myAnswer = get(myAnswerAtom)
    return question.words.join(' ') === myAnswer.join(' ')
  },
})

export {testListAtom, testStateAtom, myAnswerAtom, questionAtom, isAnswerAtom}
