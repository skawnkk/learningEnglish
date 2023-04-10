import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactElement
}

function Button({onClick = () => {}, disabled = false, children, ...restProps}: ButtonProps) {
  return (
    <button className={styles.basicButton} onClick={onClick} disabled={disabled} {...restProps}>
      {children}
    </button>
  )
}

export default Button
