'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'
import { useTransportStore } from 'src/providers/stores/transport'
import DistanceSimulator from './DistanceSimulator'
import ItineraireSimulator from './ItineraireSimulator'
import styles from './TransportSimulator.module.css'

const TransportSimulator = () => {
  const { selected, setSelected, mode, tabs } = useTransportStore()

  const distanceRef = useRef<HTMLButtonElement>(null)
  const itineraireRef = useRef<HTMLButtonElement>(null)
  const [forceFocus, setForceFocus] = useState(false)

  const t = useTranslations('transport.mode-selector')

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.code === 'ArrowRight') {
        e.preventDefault()
        setSelected('itineraire')
        itineraireRef.current?.focus()
        setForceFocus(true)
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault()
        setSelected('distance')
        distanceRef.current?.focus()
        setForceFocus(true)
      }
    },
    [distanceRef, itineraireRef]
  )

  return (
    <>
      {tabs && (
        <div className={styles.tabs} data-testid='transport-tabs' role='tablist'>
          <button
            ref={distanceRef}
            className={classNames(styles.tab, {
              [styles.selectedTab]: selected === 'distance',
              [styles.forceFocus]: forceFocus,
            })}
            onClick={() => setSelected('distance')}
            data-testid='transport-tab-distance'
            role='tab'
            id='tab-distance'
            aria-controls='tabpanel-distance'
            aria-selected={selected === 'distance'}
            tabIndex={selected === 'distance' ? 0 : -1}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (selected === 'distance') {
                setForceFocus(false)
              }
            }}>
            {t('distance')}
          </button>
          <button
            ref={itineraireRef}
            className={classNames(styles.tab, {
              [styles.selectedTab]: selected === 'itineraire',
              [styles.forceFocus]: forceFocus,
            })}
            onClick={() => setSelected('itineraire')}
            data-testid='transport-tab-itineraire'
            role='tab'
            id='tab-itineraire'
            aria-controls='tabpanel-itineraire'
            aria-selected={selected === 'itineraire'}
            tabIndex={selected === 'itineraire' ? 0 : -1}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (selected === 'itineraire') {
                setForceFocus(false)
              }
            }}>
            {t('itineraire')}
          </button>
        </div>
      )}
      <div
        id='tabpanel-distance'
        role='tabpanel'
        aria-labelledby='tab-distance'
        className={selected === 'itineraire' ? styles.hidden : undefined}>
        <DistanceSimulator withComparisonMode={!mode} />
      </div>
      <div
        id='tabpanel-itineraire'
        role='tabpanel'
        aria-labelledby='tab-itineraire'
        className={selected === 'distance' ? styles.hidden : undefined}>
        <ItineraireSimulator withComparisonMode={!mode} />
      </div>
    </>
  )
}

export default TransportSimulator
