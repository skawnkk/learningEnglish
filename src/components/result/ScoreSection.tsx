import React from 'react'
import Image from 'next/image'
import {getRandomNumber} from '../../utils/dataCtrl'
import {useRecoilValue} from 'recoil'
import {myScoreResultSelector, testStateAtom} from '../../recoil/quiz'
import styles from '../../styles/pages/Result.module.css'
import classNames from 'classnames'
import {AnswerState, RESULT} from '../../types'

interface ScoreSectionProp {
  testResult: RESULT
}

function ScoreSection({testResult}: ScoreSectionProp) {
  const {answers, completeCount} = useRecoilValue(testStateAtom)
  const {totalCount, correctAnswerCount} = useRecoilValue(myScoreResultSelector)

  const randomNumber = getRandomNumber(3)
  const result = {
    imageSrc:
      testResult === RESULT.FAIL
        ? `/image/result_${testResult}.png`
        : `/image/result_${testResult}_${randomNumber}.png`,
    message: {
      perfect: <p>완벽. 모두 맞혔어요!</p>,
      good: <p>좋아요. 멋진 점수에요!</p>,
      fail: (
        <>
          <p>아쉬워요...</p>
          <p>다음에는 더 잘할 수 있을 거예요!</p>
        </>
      ),
    },
    iconSrc: `/icon/result_${testResult}_check.svg`,
  }

  return (
    <div className={'flex flex-col flex-1 mt-[21px]'}>
      <div className={'flex flex-col items-center'}>
        <Image
          src={result.imageSrc}
          width={159}
          height={165}
          alt={`result_${testResult}`}
          priority
        />
      </div>

      <div className={styles.resultText}>{result.message[testResult]}</div>

      <div className={'flex gap-[6px] justify-center'}>
        {answers.map((answer, idx) => {
          const iconSrc =
            answer === AnswerState.CORRECT ? result.iconSrc : '/icon/result_default_check.svg'

          return (
            <div key={`answer_${idx}`}>
              <Image src={iconSrc} width={32} height={32} alt={'check'} />
            </div>
          )
        })}
      </div>

      <div className={classNames(styles.resultScore, styles[testResult])}>
        {testResult === RESULT.PERFECT ? '만점' : `${correctAnswerCount}/${totalCount}`}
      </div>

      {completeCount > 1 && (
        <p className={classNames(styles.resultText, styles[testResult])}>
          {completeCount}번째 시도
        </p>
      )}
    </div>
  )
}

export default ScoreSection
