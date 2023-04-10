import React from 'react'
import styles from './QuizSection.module.css'
import classNames from 'classnames'

function WordTag({onClick = () => {}, disabled, children}) {
  const handleClick = () => {
    if (disabled) return
    onClick()
  }
  return (
    <div className={classNames(styles.wordTag, disabled && styles.wordTag_disabled)} onClick={handleClick}>
      {children}
    </div>
  )
}

export default WordTag
