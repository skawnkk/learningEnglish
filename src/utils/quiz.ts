import {MyTestState} from '../types'

const KEY = 'my-quiz-list'

const getMyQuizList = () => {
  if(typeof window === "undefined") return []
  const myQuizList = localStorage.getItem(KEY)
  return myQuizList ? JSON.parse(myQuizList) : []
}

const getQuizHistory = (quizList: MyTestState[], id: number) => {
  return quizList.find((li) => li.id === id)
}

const saveQuizResult = (data: MyTestState) => {
  const originResultList = getMyQuizList()
  const newResultIndex = originResultList.findIndex((li) => li.id === data.id)
  if (newResultIndex > -1) {
    originResultList.splice(newResultIndex, 1, data)
    localStorage.setItem(KEY, JSON.stringify(originResultList))
  } else {
    localStorage.setItem(KEY, JSON.stringify([...originResultList, data]))
  }
}

export {getMyQuizList, getQuizHistory, saveQuizResult}
