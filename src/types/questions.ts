interface Question{
  answerKr: string
  distractors: string[]
  tts: string
  words: string[]
}

export const initialQuestion = {
  answerKr:'',
  distractors: [],
  tts:'',
  words:[],
}