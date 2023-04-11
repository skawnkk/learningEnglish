import React, {useEffect} from 'react'
import styles from './modal.module.css'
import classNames from 'classnames'
import {useTimer} from '../../hooks/useTimer'
import Modal from '../../atomics/modal/Modal'
import {useModal} from '../../atomics/modal/useModal'

function TimerModal() {
  const {closeModal} = useModal()
  const time = useTimer(3)

  useEffect(() => {
    if (time < 1) {
      closeModal()
    }
  }, [time])

  return (
    <Modal>
      <div className={classNames(styles.timer, 'flex flex-col items-center')}>
        <div className={styles.time}>{time}</div>
        <p className={'h4'}>곧 테스트가 시작됩니다!</p>
        <div className={classNames(styles.description, 'flex flex-col items-center')}>
          <p>총 99문제가 출제됩니다.</p>
          <p>1문제 당 45초의 시간 제한이 있습니다.</p>
        </div>
        <div className={'flex'}>
          <div className={styles.badge}>HINT</div>
          <p className={styles.hint}>정답 문장을 들어볼 수 있어요</p>
        </div>
      </div>
    </Modal>
  )
}

export default TimerModal
