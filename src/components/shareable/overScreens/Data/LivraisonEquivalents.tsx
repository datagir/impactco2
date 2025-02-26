'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { livraisonData } from 'components/outils/livraison/LivraisonData'
import { LivraisonType } from 'components/outils/livraison/Type'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import styles from './LivraisonEquivalents.module.css'

const equivalents = computedEquivalents
  .filter((equivalent) => equivalent.category === 12)
  .sort((a, b) => a.value - b.value)

const deplacementECVs = [56, 57]

const LivraisonEquivalents = ({ slug }: { slug: LivraisonType }) => {
  const { language } = useParamContext()
  const t = useTranslations('livraison')
  const tEquivalent = useTranslations('equivalent')
  const values = useMemo(() => livraisonData[slug], [slug])
  const [displays, setDisplays] = useState(equivalents.map(() => false))
  return (
    <div className={styles.equivalents}>
      {equivalents.map((equivalent, index) => {
        const transport =
          'ecv' in equivalent && equivalent.ecv && equivalent.ecv.find((ecv) => deplacementECVs.includes(ecv.id))

        const total = values.ecv[equivalent.slug].reduce(
          (acc, current) => acc + current.value,
          (values.fabrication || 0) + (transport ? transport.value : 0)
        )
        return (
          <div key={equivalent.slug} className={styles.equivalent}>
            <button
              onClick={() => setDisplays(displays.map((display, i) => (i === index ? !display : display)))}
              className={styles.header}
              aria-expanded={displays[index]}
              aria-controls={`dropdown-${equivalent.slug}-${index}-content`}>
              <div className={styles.equivalentInfo}>
                <EquivalentIcon equivalent={equivalent} height={3} />
                <div>
                  <p>
                    <span>{getNameWithoutSuffix(language, equivalent)}</span>
                    {transport && <span className={styles.gray}> - {t('car')}</span>}
                    {equivalent.slug.includes('douce') && <span className={styles.green}> - {t('foot')}</span>}
                  </p>
                  <p className={styles.value}>
                    <span>{formatNumber(total)}</span> <span className={styles.kg}>kg CO₂e</span>
                  </p>
                </div>
              </div>
              <p className={styles.dropdown}>
                {displays[index] ? (
                  <>
                    {t('data.close')}
                    <DropdownArrowUpIcon />
                  </>
                ) : (
                  <>
                    {t('data.open')}
                    <DropdownArrowDownIcon />
                  </>
                )}
              </p>
            </button>
            {displays[index] && (
              <div className={styles.ecvs}>
                <p className={styles.ecv}>
                  <span>
                    {tEquivalent('fabrication')} ({t('data.optionnel')})
                  </span>
                  <span>{formatNumber(values.fabrication)} kg CO₂e</span>
                </p>
                {values.ecv[equivalent.slug].map((ecv) => (
                  <p className={styles.ecv} key={ecv.id}>
                    <span>{tEquivalent(`ecv.${ecv.id}`)}</span>
                    <span>{formatNumber(ecv.value)} kg CO₂e</span>
                  </p>
                ))}
                {transport && (
                  <p className={styles.ecv}>
                    <span>{tEquivalent(`ecv.${transport.id}`)}</span>
                    <span>{formatNumber(transport.value)} kg CO₂e</span>
                  </p>
                )}
                <p className={styles.total}>
                  <span>
                    <span className={styles.icon}>
                      <Image src='/images/icn-total.svg' width={24} height={24} alt='' />
                    </span>
                    {tEquivalent('total')}
                  </span>
                  <span>{formatNumber(total)} kg CO₂e</span>
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default LivraisonEquivalents
