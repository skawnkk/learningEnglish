import React from 'react'
import styles from './Header.module.css'
import IconClear from '../IconClear'
import classNames from 'classnames'

interface Header{
  title?:string
  clear?:boolean
  onClick?:()=>void
}
function Header({title = '', clear = false, onClick=()=>{}}:Header) {
  return (
    <>
      <div className={classNames('h6', styles.header)}>{title}</div>
      {clear && (
        <div onClick={onClick}>
          <IconClear className={styles.clear} />
        </div>
      )}
    </>
  )
}

export default Header
