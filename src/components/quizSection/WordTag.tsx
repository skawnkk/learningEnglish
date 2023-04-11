import React from 'react'
import styles from './QuizSection.module.css'
import classNames from 'classnames'

interface WordTagProps {
  onClick: () => void
  disabled: boolean
  className: string
  children: React.ReactElement
}

function WordTag({onClick = () => {}, disabled, className, children}: WordTagProps) {
  const handleClick = () => {
    if (disabled) return
    onClick()
  }

  return (
    <div
      className={classNames(
        'flex items-center',
        styles.wordTag,
        disabled && styles.wordTag_disabled,
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default WordTag
