import {AnswerState} from '../components/step/StepBar'

export interface MyTestState {
  id: number
  startDatetime: string
  current: number //현재 풀고 있던 문제 번호
  complete: boolean //완료여부
  completeCount: number //완료횟수(시도횟수)
  answers: Answer[]
}
export type Answer = {no:number, state:AnswerState}

export const initialTestState:MyTestState= {
  id:0,
  startDatetime: '',
  current: 0,
  complete: false,
  completeCount: 0,
  answers:[],
}

const KEY = 'my-quiz-list'

const getMyQuizList = () => {
  const myQuizList = localStorage.getItem(KEY)
  return myQuizList?JSON.parse(myQuizList):[]
}

const getMyQuizState = (id: number):MyTestState => {
  return getMyQuizList().find((li) => li.id === id)
}

export {getMyQuizList, getMyQuizState}
