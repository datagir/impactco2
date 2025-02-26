'use client'

import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import PlusIcon from 'components/base/icons/plus'
import styles from './Dropdown.module.css'

const Dropdown = ({
  children,
  title,
  onClick,
  className,
}: {
  children: ReactNode
  title: string
  onClick?: (display: boolean) => void
  className?: string
}) => {
  const [display, setDisplay] = useState(false)

  return (
    <li className={classNames(styles.faq, className)}>
      <button
        className={styles.title}
        aria-expanded={display}
        aria-controls={`dropdown-${title}-content`}
        onClick={() => {
          if (onClick) {
            onClick(display)
          }
          setDisplay(!display)
        }}>
        <h3>{title}</h3>
        <span className={classNames(styles.button, { [styles.openButton]: display })}>
          <PlusIcon />
        </span>
      </button>
      {display && (
        <div className={styles.content} id={`dropdown-${title}-content`}>
          {children}
        </div>
      )}
    </li>
  )
}

export default Dropdown
