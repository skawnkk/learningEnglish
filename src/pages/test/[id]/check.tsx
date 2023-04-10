import React from 'react'
import {useRecoilValue} from 'recoil'
import {myAnswerAtom, questionAtom} from '../../../state/atoms'

function Check() {
  const question = useRecoilValue(questionAtom)
  const myAnswerList = useRecoilValue(myAnswerAtom)

  const getIsAnswer = () => {
    const answer = question.words.join(' ')
    const myAnswer = myAnswerList.join(' ')
    return answer === myAnswer
  }

  const isAnswer = getIsAnswer()
  return (
    <div>
      {isAnswer
        ?<div>정답</div>
        :<div>오답</div>
      }
    </div>
  )
}

export default Check
