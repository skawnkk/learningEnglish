import React from 'react'
import styles from './Header.module.css'
import IconClear from '../IconClear'
import classNames from 'classnames'

function Header({children = '', clear = false, onClick=()=>{}}) {
  return (
    <>
      <div className={classNames('h6', styles.header)}>{children}</div>
      {clear && (
        <div onClick={onClick}>
          <IconClear className={styles.clear} />
        </div>
      )}
    </>
  )
}

export default Header
