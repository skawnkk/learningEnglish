import {atom} from 'recoil'
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

export {testListAtom, testStateAtom, myAnswerAtom, questionAtom}
