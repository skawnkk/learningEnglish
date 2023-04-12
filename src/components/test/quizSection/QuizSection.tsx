import React, {useEffect, useState} from 'react'
import {shuffle} from '../../../utils/dataCtrl'
import {useRecoilState, useRecoilValue} from 'recoil'
import {initialQuestion, myAnswerAtom, questionsAtom, testStateAtom} from '../../../recoil/quiz'
import WordTag from './WordTag'
import classNames from 'classnames'
import styles from './QuizSection.module.css'
import Speaker from './Speaker'


function QuizSection() {
  const questions = useRecoilValue(questionsAtom)
  const {current} = useRecoilValue(testStateAtom)
  const [myAnswer, setMyAnswer] = useRecoilState(myAnswerAtom)
  const [wordTagsToAnswer, setWordTagsToAnswer] = useState([])
  const question = questions[current] || initialQuestion

  const handleClickWordTag = (id: number) => {
    const selectedAnswer = wordTagsToAnswer.find((wordTag) => wordTag.id === id)
    setWordTagsToAnswer(
      wordTagsToAnswer.map((wordTag) => {
        return wordTag.id === selectedAnswer.id ? {...selectedAnswer, selected: true} : wordTag
      })
    )

    setMyAnswer((prev) => [...prev, selectedAnswer.word])
  }

  useEffect(() => {
    if (!question) return
    const shuffledWordTagsToAnswer = shuffle([...question.distractors, ...question.words]).map(
      (option, idx) => {
        return {id: idx, word: option, selected: false}
      }
    )
    setWordTagsToAnswer(shuffledWordTagsToAnswer)
  }, [question])

  return (
    <div className={'relative flex flex-col flex-1'}>
      <p className={'h4'}>{question?.answerKr}</p>
      <div className={classNames(styles.answerSection, 'flex flex-wrap relative content-start')}>
        {myAnswer.map((answer, idx) => (
          <WordTag key={`answer_${idx}`} className={'mb-[16px] mr-[4px]'}>
            {answer}
          </WordTag>
        ))}
      </div>

      <div className={'flex flex-col flex-1'}>
        <div className={classNames(styles.optionSection, 'flex flex-wrap')}>
          {wordTagsToAnswer?.map(({id, word, selected}) => {
            return (
              <WordTag
                key={`option-${id}`}
                className={`mb-[4px] mr-[4px]`}
                disabled={selected}
                onClick={() => handleClickWordTag(id)}
              >
                {word}
              </WordTag>
            )
          })}
        </div>
      </div>

      <Speaker file={question.tts} />
    </div>
  )
}

export default QuizSection
