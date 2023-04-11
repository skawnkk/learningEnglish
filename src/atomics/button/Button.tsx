import React from 'react'
import styles from './Button.module.css'
import classNames from 'classnames'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  className: string
  children: React.ReactElement
}

function Button({
  onClick = () => {},
  disabled = false,
  className,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={classNames(styles.basicButton, disabled && styles.basicButtonDisabled, className)}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
