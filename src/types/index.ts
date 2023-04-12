export interface Question{
  answerKr: string
  distractors: string[]
  tts: string
  words: string[]
}

export interface MyTestState {
  id: number
  startDatetime: string
  current: number //현재 풀고 있던 문제 번호
  complete: boolean //완료여부
  completeCount: number //완료횟수(시도횟수)
  answers: AnswerState[]
}

export enum AnswerState {
  CORRECT,
  WRONG,
  TRYING,
  TODO,
}

export enum RESULT {
  PERFECT = 'perfect',
  GOOD = 'good',
  FAIL = 'fail',
}