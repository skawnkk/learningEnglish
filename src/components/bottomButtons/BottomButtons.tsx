import React from 'react'
import Button from '../../atomics/button/Button'
import styles from '../../atomics/button/Button.module.css'
import {RESULT} from '../../pages/result'
import classNames from "classnames";

interface BottomButtons {
  testResult: RESULT
}

function BottomButtons({testResult}: BottomButtons) {
  const endTest = () =>{

  }

  return (
    <div className={'flex gap-[8px]'}>
      {testResult !== RESULT.PERFECT && <Button className={classNames(styles.ghost, 'flex-1')}>다시 풀어보기</Button>}
      <Button className={'flex-1'} onClick={endTest}>확인</Button>
    </div>
  )
}

export default BottomButtons
