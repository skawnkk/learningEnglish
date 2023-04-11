import React from 'react'
import Image from 'next/image'
import {RESULT} from '../../pages/result'
import {getRandomNumber} from '../../utils/dataCtrl'
import {useRecoilValue} from 'recoil'
import {testStateAtom} from '../../state/atoms'
import {AnswerState} from '../step/StepBar'
import styles from '../../styles/pages/Result.module.css'

interface ScoreSectionProp {
  testResult: RESULT
}

function ScoreSection({testResult}: ScoreSectionProp) {
  const testState = useRecoilValue(testStateAtom)
  const randomNumber = getRandomNumber(3)
  const result = {
    imageSrc:
      testResult === RESULT.FAIL
        ? `/image/result_${testResult}.png`
        : `/image/result_${testResult}_${randomNumber}.png`,
    message: {
      perfect: '완벽. 모두 맞혔어요!',
      good: '좋아요. 멋진 점수에요!',
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
        {testState.answers.map((answer, idx) => {
          const iconSrc =
            answer === AnswerState.CORRECT ? result.iconSrc : '/icon/result_default_check.svg'
          return (
            <div key={`answer_${idx}`}>
              <Image src={iconSrc} width={32} height={32} alt={'check'} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScoreSection
