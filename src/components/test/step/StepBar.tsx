import React from 'react'
import styles from './StepBar.module.css'
import classNames from 'classnames'
import {AnswerState} from '../../../types'
import {useRecoilValue} from 'recoil'
import {testStateAtom} from '../../../recoil/quiz'

interface Step {
  state: AnswerState
  style: React.CSSProperties
}

const Step = ({state, style}: Step) => {
  const getAnswerStyle = (state: AnswerState) => {
    let style
    switch (state) {
      case AnswerState.CORRECT:
        style = styles.correct
        break
      case AnswerState.WRONG:
        style = styles.wrong
        break
      case AnswerState.TRYING:
        style = styles.trying
        break
      default:
        style = styles.todo
        break
    }

    return style
  }

  return <div className={classNames(getAnswerStyle(state), styles.step)} style={style} />
}

function StepBar() {
  const {answers: stepList, current} = useRecoilValue(testStateAtom)
  return (
    <>
      <div className={classNames(styles.stepBar, 'flex justify-around')}>
        {stepList?.map((step, idx) => (
          <Step key={idx} state={step} style={{width: `calc(90%/${stepList.length})`}} />
        ))}
      </div>
      <div className={styles.progress}>
        {current + 1}/{stepList?.length}
      </div>
    </>
  )
}

export default StepBar
