import classNames from 'classnames'
import React, { InputHTMLAttributes, ReactNode } from 'react'
import { ZodError } from 'zod'
import CheckIcon from 'components/base/icons/check'
import ErrorIcon from 'components/base/icons/error'
import styles from './CheckboxInput.module.css'
import inputStyles from './Input.module.css'
import useError from './errors'

const CheckboxInput = ({
  id,
  checked,
  setChecked,
  label,
  children,
  className,
  'data-testid': dataTestId,
  errors,
  ...inputProps
}: {
  id?: string
  checked: boolean
  className?: string
  setChecked: (checked: boolean) => void
  label: ReactNode
  children?: ReactNode
  ['data-testid']?: string
  errors?: ZodError | null
} & InputHTMLAttributes<HTMLInputElement>) => {
  const error = useError(id, errors)

  return (
    <>
      <div className={classNames(styles.container, className)} data-testid={dataTestId}>
        <label className={classNames(styles.legend, { [styles.checked]: checked })}>
          <input
            id={id}
            {...inputProps}
            type='checkbox'
            checked={checked}
            className={classNames(checked ? 'checked' : '', { [inputStyles.inputError]: error })}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <div>{label}</div>
          {checked && (
            <div className={styles.check}>
              <CheckIcon />
            </div>
          )}
        </label>
        {children}
      </div>
      {error && (
        <div className={classNames(inputStyles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </>
  )
}

export default CheckboxInput
