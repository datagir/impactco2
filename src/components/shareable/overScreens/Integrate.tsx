'use client'

import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
import IntegratePreview from './IntegratePreview'
import styles from './Share.module.css'
import { buildCustomParamsUrl } from './customParamsUrl'

const Integrate = ({
  category,
  path,
  extraParams,
  tracking,
  noLanguage,
}: {
  path: string
  category?: Category
  extraParams?: string
  tracking: string
  noLanguage?: boolean
}) => {
  const allParams = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  // All
  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)

  // Chauffage
  const [m2, setM2] = useState(allParams.chauffage.m2)
  useEffect(() => {
    setM2(allParams.chauffage.m2)
  }, [allParams.chauffage.m2])

  // Fruits et légumes
  const [month, setMonth] = useState(allParams.fruitsetlegumes.month)
  useEffect(() => {
    setMonth(allParams.fruitsetlegumes.month)
  }, [allParams.fruitsetlegumes.month])

  // Usage numérique
  const [toDisplay, setToDisplay] = useState('')

  // Télétravail
  const [start, setStart] = useState(allParams.teletravail.start)
  useEffect(() => {
    setStart(allParams.teletravail.start)
  }, [allParams.teletravail.start])
  const [end, setEnd] = useState(allParams.teletravail.end)
  useEffect(() => {
    setEnd(allParams.teletravail.end)
  }, [allParams.teletravail.end])
  const [transport, setTransport] = useState(allParams.teletravail.transport)
  useEffect(() => {
    setTransport(allParams.teletravail.transport)
  }, [allParams.teletravail.transport])
  const [presentiel, setPresentiel] = useState(allParams.teletravail.presentiel)
  useEffect(() => {
    setPresentiel(allParams.teletravail.presentiel)
  }, [allParams.teletravail.presentiel])
  const [homeOffice, setHomeOffice] = useState(allParams.teletravail.homeOffice)
  useEffect(() => {
    setHomeOffice(allParams.teletravail.homeOffice)
  }, [allParams.teletravail.homeOffice])

  const params = useMemo(() => {
    if (category) {
      // Warning: Add values in CustomParamsValues.ts also
      if (category.slug === 'chauffage') {
        return { m2: { value: m2, setter: setM2 } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'chauffage') {
        return { m2: { value: m2, setter: setM2 } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'fruitsetlegumes') {
        return { month: { value: month, setter: setMonth } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'teletravail') {
        return {
          teletravail: {
            start: { value: start?.address || '', setter: setStart },
            end: { value: end?.address || '', setter: setEnd },
          },
          transport: { value: transport, setter: setTransport },
          presentiel: { value: presentiel, setter: setPresentiel },
          homeOffice: { value: homeOffice, setter: setHomeOffice },
        } as Record<string, CustomParamValue>
      }
      const params = getCustomParams(category.slug, allParams)
      if (category.slug === 'usagenumerique') {
        return { ...params, display: { value: toDisplay, setter: setToDisplay } } as Record<string, CustomParamValue>
      }
      return params
    } else if (path?.startsWith('comparateur')) {
      return getComparateurParams(allParams, path?.includes('etiquette'))
    }
    return {}
  }, [allParams, category, path, m2, month, transport, start, end, presentiel, homeOffice, toDisplay])

  useEffect(() => {
    if (params) {
      const values: Record<string, boolean> = {}
      Object.keys(params).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [params])

  const urlParams = `${buildCustomParamsUrl(params, visibility)}${extraParams ? `&${extraParams}` : ''}${noLanguage ? '' : `&language=${language}`}&theme=${theme}`

  return params && visibility ? (
    <>
      <form id={`${category?.slug}-integrate`}>
        <CustomParams
          integration
          tracking={tracking}
          trackingType='Intégrer'
          params={path.includes('etiquette') ? {} : params}
          visibility={visibility}
          setVisibility={setVisibility}
        />
        {!path.includes('etiquette') && Object.entries(params).length > 0 && <div className={styles.separator} />}
        <CustomParam
          tracking={tracking}
          slug='theme'
          param={{ value: theme, setter: setTheme } as CustomParamValue}
          visible
        />
        {!noLanguage && (
          <CustomParam
            tracking={tracking}
            slug='language'
            param={{ value: language, setter: setLanguage } as CustomParamValue}
            visible
          />
        )}
      </form>
      <ClipboardBox form={`${category?.slug}-integrate`} tracking={tracking}>{`<script name="impact-co2" src="${
        process.env.NEXT_PUBLIC_URL
      }/iframe.js" data-type="${path}" data-search="?${urlParams}"></script>`}</ClipboardBox>
      <IntegratePreview path={path} urlParams={urlParams} />
    </>
  ) : null
}

export default Integrate
