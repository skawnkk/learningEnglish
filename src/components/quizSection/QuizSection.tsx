import React, {useMemo} from 'react'
import {shuffle} from '../../utils/dataCtrl'
import {useRecoilState} from 'recoil'
import {initialQuestion, myAnswerAtom} from '../../recoil/quiz'
import WordTag from './WordTag'
import classNames from 'classnames'
import styles from './QuizSection.module.css'
import Speaker from './Speaker'

const NoteLine = () => {
  return Array.from({length: 4}).map((line, idx) => (
    <hr key={idx} className={`absolute top-[${idx * 56 + 48}px] w-full border-[#64696E]`} />
  ))
}

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
      <div className={classNames(styles.answerSection, 'flex flex-wrap relative content-start')}>
        {myAnswer.map((answer, idx) => (
          <WordTag key={`answer_${idx}`} className={'mb-[16px] mr-[4px]'}>{answer}</WordTag>
        ))}

        <NoteLine />
      </div>
      <div className={'flex flex-col flex-1'}>
        <div className={classNames(styles.optionSection, 'flex flex-wrap')}>
          {convertedOptions?.map(({id, word, selected}) => {
            return (
              <WordTag key={`option-${id}`} className={`mb-[4px] mr-[4px]`} disabled={selected} onClick={() => chooseAnswer(id)}>
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
