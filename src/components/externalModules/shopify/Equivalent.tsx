import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import Equal from './Equal'
import styles from './Equivalent.module.css'

const Equivalent = ({
  className,
  baseValue,
  comparisons,
  title,
  animated,
  url,
  language,
}: {
  className?: string
  baseValue: string
  comparisons: string[]
  title?: (unit: string, roundedValue: string, intValue: number) => ReactNode
  animated?: boolean
  url?: string
  language?: Language
}) => {
  const [toDisplay, setToDisplay] = useState(0)
  const [progress, setProgress] = useState(0)

  const timeoutRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (progress === 99) {
      setToDisplay((value) => (value + 1) % comparisons.length)
    }
  }, [progress])

  useEffect(() => {
    if (animated && comparisons.length > 0) {
      setToDisplay(0)
      setProgress(0)

      const update = () => {
        setProgress((value) => (value + 1) % 100)
      }
      const updateWithTimeout = () => {
        update()
        timeoutRef.current = setTimeout(updateWithTimeout, 50)
      }
      timeoutRef.current = setTimeout(updateWithTimeout, 50)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [animated, comparisons])

  const intValue = Number(baseValue)
  const value = Number.isNaN(intValue) ? 100000 : intValue

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = (Math.round(unitValue * 100) / 100).toLocaleString()

  return (
    <div className={className}>
      {title && title(unit, roundedValue, intValue)}
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo value={value} url={url} />
          <div className={styles.leftContent}>
            <div className={styles.value} data-testid='etiquette-value'>
              {roundedValue}
            </div>
            <div className={styles.label}>
              {unit} CO<sub>2</sub>e
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {animated && (
            <div
              className={styles.progressBar}
              style={{
                background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(var(--primary-20) ${progress}%, transparent 0)`,
              }}>
              <progress value={progress} className={styles.progress}>
                {progress}%
              </progress>
            </div>
          )}
          <div className={styles.equal}>
            <Equal />
          </div>
          <div className={animated ? styles.animatedComparisons : styles.comparisons}>
            {comparisons.map((comparison, index) => (
              <div
                key={comparison}
                className={
                  animated
                    ? index === toDisplay
                      ? styles.visibleAnimatedComparison
                      : styles.animatedComparison
                    : styles.comparison
                }>
                <SimpleValue value={value} comparison={comparison} language={language} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equivalent
