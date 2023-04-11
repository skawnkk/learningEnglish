import React from 'react'
import styles from './modal.module.css'
import classNames from 'classnames'

interface ModalProp {
  show: boolean
  children: React.ReactElement
}

function Modal({children}: ModalProp) {

  return (
    <div className={classNames(styles.modal, styles.fullHeight)}>
      <div className={classNames(styles.modalContents, styles.fullHeight)}>{children}</div>
    </div>
  )
}

export default Modal
