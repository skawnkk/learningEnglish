import React, {useMemo} from 'react'
import {shuffle} from '../../utils/dataCtrl'
import {initialQuestion} from '../../types/questions'
import {useRecoilState} from 'recoil'
import {myAnswerAtom} from '../../state/atoms'
import WordTag from './WordTag'
import classNames from 'classnames'
import styles from './QuizSection.module.css'
import Speaker from "./Speaker";

function QuizSection({questions, current}) {
  const [myAnswer, setMyAnswer] = useRecoilState(myAnswerAtom)

  const question = questions[current] || initialQuestion
  const convertedOptions = useMemo(() => {
    const options = shuffle([...question.distractors, ...question.words])
    return options.map((option, idx) => {
      return {id: idx, word: option, selected: false}
    })
  }, [question])

  const chooseAnswer = (id: number) => {
    const selectedAnswer = convertedOptions.find((option) => option.id === id)
    selectedAnswer.selected = true
    setMyAnswer((prev) => [...prev, selectedAnswer.word])
  }

  return (
    <div className={'relative flex flex-col flex-1'}>
      <p className={'h4'}>{question?.answerKr}</p>
      <div className={classNames(styles.answerSection, 'flex flex-wrap')}>
        {myAnswer.map((answer, idx) => (
          <WordTag key={`answer_${idx}`}>{answer}</WordTag>
        ))}
      </div>
      <div className={'flex flex-col flex-1'}>
        <div className={classNames(styles.optionSection, 'flex flex-wrap')}>
          {convertedOptions?.map(({id, word, selected}) => {
            return (
              <WordTag key={`option-${id}`} disabled={selected} onClick={() => chooseAnswer(id)}>
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