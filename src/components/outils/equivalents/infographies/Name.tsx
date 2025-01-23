'use client'

import { useGlobalStore } from 'src/providers/stores/global'
import { ComputedEquivalent } from 'types/equivalent'
import { getName, getPrefix } from 'utils/Equivalent/equivalent'
import styles from './Name.module.css'

const Name = ({ equivalent, value }: { equivalent: ComputedEquivalent; value: number }) => {
  const { language } = useGlobalStore()
  return (
    <p>
      <span className={styles.equivalentValue}>
        {value} {getPrefix(language, equivalent, value)}
      </span>
      {getName(language, equivalent, false, value)}
    </p>
  )
}

export default Name
