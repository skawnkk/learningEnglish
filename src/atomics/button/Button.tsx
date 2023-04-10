import React from 'react'
import styles from './Button.module.css'
import classNames from 'classnames'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactElement
}

function Button({onClick = () => {}, disabled = false, children, ...restProps}: ButtonProps) {
  return (
    <button
      className={classNames(styles.basicButton, disabled && styles.basicButtonDisabled)}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
