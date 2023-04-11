import React from 'react'
import Modal from '../../atomics/modal/Modal'
import Button from '../../atomics/button/Button'
import styles from './modal.module.css'

interface ErrorModalProps{
  onClickFetchAgain: ()=>void
  onClickBack: ()=>void
}
function ErrorModal({onClickFetchAgain, onClickBack}:ErrorModalProps) {

  return (
    <Modal>
      <div className={styles.errorModal}>
        <p className={styles.description}>데이터 요청에 실패했습니다.</p>
        <div className={'flex gap-2 mt-4'}>
          <Button onClick={onClickFetchAgain}>다시 불러오기</Button>
          <Button onClick={onClickBack}>메인 이동하기</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ErrorModal
