'use client'

import dynamic from 'next/dynamic'
import { FAQ as FAQType } from 'types/faq'
import { track } from 'utils/matomo'
import Dropdown from 'components/base/Dropdown'
import styles from './FAQ.module.css'

const DynamicNotion = dynamic(() => import('../Notion/DynamicNotion'))

const FAQ = ({ faq, page }: { faq: Pick<FAQType, 'title' | 'content'>; page?: string }) => {
  return faq.content ? (
    <Dropdown
      className={styles.faq}
      title={faq.title}
      onClick={(display) => {
        if (!display) {
          track(page === 'Guide utilisation' ? page : 'FAQ', faq.title, page || 'FAQ')
        }
      }}>
      <DynamicNotion recordMap={faq.content} />
    </Dropdown>
  ) : null
}

export default FAQ
