'use client'

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { ASTNode, PublicodesExpression } from 'publicodes'
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import { SiteLanguage } from 'types/languages'
import { TransportSimulateur } from 'types/transport'
import { deplacements } from 'data/categories/deplacement'
import { comparisons } from 'components/outils/TransportComparisonSimulator'
import { displayAddress } from 'utils/address'
import { slugs } from 'utils/months'
import { searchAddress } from 'hooks/useAddress'
import { Point } from 'hooks/useItineraries'
import { getRandomEquivalents } from 'components/comparateur/random'
import useTheme from 'components/layout/UseTheme'
import { computedEquivalents } from './equivalents'

const defaultEquivalents = ['voiturethermique', 'repasavecduboeuf', 'streamingvideo']

const usageNumeriqueDefaultValues = {
  ['email . appareil']: "'smartphone'",
  ['email . transmission . émetteur . réseau']: "'fixe FR'",
  ['email . taille']: 0.075,
  ['email . terminaux . temps écriture']: 3,
  ['email . destinataires']: 1,
  ['streaming . durée']: 420,
  ['streaming . appareil']: "'TV'",
  ['streaming . transmission . réseau']: "'fixe FR'",
  ['streaming . qualité']: "'HD'",
  ['visio . durée']: 180,
  ['visio . appareil']: "'ordinateur portable'",
  ['visio . emplacements']: 2,
  ['visio . transmission . réseau']: "'fixe FR'",
  ['visio . qualité']: "'SD'",
}

const livraisonDefaultValues = {
  produit: 'habillement',
  retrait: 'point de retrait',
  relay: 'voiture thermique',
  km: '7',
  traj: 'dom_tra',
}

const completeAddress = (setter: Dispatch<SetStateAction<Point | undefined>>, value?: string) => {
  if (value) {
    searchAddress(value, 1).then((result) => {
      if (result.length > 0) {
        const address = result[0]
        setter({
          latitude: address.geometry.coordinates[1],
          longitude: address.geometry.coordinates[0],
          city: address.properties.city,
          address: displayAddress(address),
        })
      }
    })
  }
}

const getInt = (query: ReadonlyURLSearchParams, key: string) => {
  const number = Number.parseInt(query.get(key) as string)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

const getFloat = (query: ReadonlyURLSearchParams, key: string) => {
  const number = Number.parseFloat(query.get(key) as string)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

type LivraisonValues = {
  produit: string
  retrait: string
  relay: string
  km: string
  traj: string
}

export type Params = {
  overscreen: Record<string, string>
  setOverscreen: (slug: string, value: string) => void
  reset: (slug: string) => void
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  language: SiteLanguage
  setLanguage: Dispatch<SetStateAction<SiteLanguage>>
  livraison: {
    values: LivraisonValues
    setValues: Dispatch<SetStateAction<LivraisonValues>>
    isHabit: boolean
    setIsHabit: Dispatch<SetStateAction<boolean>>
    isPlane: boolean
    setIsPlane: Dispatch<SetStateAction<boolean>>
    number: number
    setNumber: Dispatch<SetStateAction<number>>
    frequence: number
    setFrequence: Dispatch<SetStateAction<number>>
    equivalents: string[]
    setEquivalents: Dispatch<SetStateAction<string[]>>
  }
  comparateur: {
    weight: number
    baseValue: number
    setBaseValue: Dispatch<SetStateAction<number>>
    equivalents: string[]
    setEquivalents: (equivalents: string[]) => void
    tiles: Equivalent[]
    setTiles: Dispatch<SetStateAction<Equivalent[]>>
    comparedEquivalent: ComputedEquivalent | undefined
    setComparedEquivalent: (equivalent: ComputedEquivalent | undefined) => void
  }
  transport: {
    comparisonMode: 'list' | 'comparison'
    setComparisonMode: Dispatch<SetStateAction<'list' | 'comparison'>>
    comparison: string[]
    setComparison: Dispatch<SetStateAction<string[]>>
    modes: string[]
    setModes: Dispatch<SetStateAction<string[]>>
    selected: TransportSimulateur
    setSelected: Dispatch<SetStateAction<TransportSimulateur>>
  }
  distance: {
    km: number
    setKm: Dispatch<SetStateAction<number>>
    carpool: Record<string, number>
    setCarpool: Dispatch<SetStateAction<Record<string, number>>>
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
  }
  itineraire: {
    start?: Point
    setStart: Dispatch<SetStateAction<Point | undefined>>
    end?: Point
    setEnd: Dispatch<SetStateAction<Point | undefined>>
    carpool: Record<string, number>
    setCarpool: Dispatch<SetStateAction<Record<string, number>>>
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
    roundTrip: boolean
    setRoundTrip: Dispatch<SetStateAction<boolean>>
  }
  teletravail: {
    start?: Point
    setStart: Dispatch<SetStateAction<Point | undefined>>
    end?: Point
    setEnd: Dispatch<SetStateAction<Point | undefined>>
    carpool: Record<string, number>
    setCarpool: Dispatch<SetStateAction<Record<string, number>>>
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
    transport: string
    setTransport: Dispatch<SetStateAction<string>>
    presentiel: number
    setPresentiel: Dispatch<SetStateAction<number>>
    homeOffice: number
    setHomeOffice: Dispatch<SetStateAction<number>>
    equivalents: string[]
    setEquivalents: Dispatch<SetStateAction<string[]>>
  }
  chauffage: {
    m2: number
    setM2: Dispatch<SetStateAction<number>>
  }
  fruitsetlegumes: {
    month: number
    setMonth: Dispatch<SetStateAction<number>>
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    sorting: string
    setSorting: Dispatch<SetStateAction<string>>
  }
  visio: {
    withConstruction: boolean
    setWithConstruction: Dispatch<SetStateAction<boolean>>
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
  }
  email: {
    withConstruction: boolean
    setWithConstruction: Dispatch<SetStateAction<boolean>>
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
  }
  streaming: {
    withConstruction: boolean
    setWithConstruction: Dispatch<SetStateAction<boolean>>
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
  }
  usageNumerique: {
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
    numberEmails: number
    setNumberEmails: Dispatch<SetStateAction<number>>
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
    equivalents: string[]
    setEquivalents: Dispatch<SetStateAction<string[]>>
  }
  numerique: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
  habillement: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
}

const ParamContext = React.createContext<Params | null>(null)

export function ParamProvider({ children }: { children: ReactNode }) {
  const initialTheme = useTheme()
  const [theme, setTheme] = useState(initialTheme.theme)
  const [language, setLanguage] = useState<SiteLanguage>('fr')
  const [overscreen, setOverscreen] = useState<Record<string, string>>({})
  const overscreenTrigger = useRef<HTMLElement | null>(null)

  const setOverscreeInternal = (slug: string, value: string) => {
    if (value) {
      overscreenTrigger.current = document.activeElement as HTMLElement
      setOverscreen({ ...overscreen, [slug]: value })
    } else {
      setOverscreen({ ...overscreen, [slug]: '' })
      if (overscreenTrigger.current) {
        overscreenTrigger.current.focus()
      }
    }
  }
  // Livraison
  const [livraisonValues, setLivraisonValues] = useState(livraisonDefaultValues)
  const [livraisonEquivalents, setLivraisonEquivalents] = useState<string[]>(defaultEquivalents)
  const [isHabit, setIsHabit] = useState(false)
  const [isPlane, setIsPlane] = useState(false)
  const [number, setNumber] = useState(1)
  const [frequence, setFrequence] = useState<number>(12)

  // Comparateur
  const [baseValue, setBaseValue] = useState(100)
  const [equivalents, setEquivalents] = useState<string[]>([])
  const [tiles, setTiles] = useState<Equivalent[]>([])
  const [comparedEquivalent, setComparedEquivalent] = useState<ComputedEquivalent>()

  const internalComparedEquivalentSetter = (equivalent: ComputedEquivalent | undefined) => {
    const filteredEquivalent = equivalent ? equivalents.filter((slug) => slug !== equivalent.slug) : equivalents
    if (comparedEquivalent) {
      setEquivalents([...filteredEquivalent, comparedEquivalent.slug])
    } else {
      setEquivalents([...filteredEquivalent])
    }
    setBaseValue(100)
    setComparedEquivalent(equivalent)
  }

  // Chauffage
  const [m2, setM2] = useState(63)

  // Distance
  const [km, setKm] = useState(10)

  // Itinéraire
  const [roundTrip, setRoundTrip] = useState(false)

  // Transport
  const [modes, setModes] = useState<string[]>(
    deplacements.flatMap((transport) =>
      transport.withCarpool ? [`${transport.slug}+1`, transport.slug] : [transport.slug]
    )
  )
  const [comparisonMode, setComparisonMode] = useState<'list' | 'comparison'>('list')
  const [comparison, setComparison] = useState<string[]>(['voiturethermique', 'tgv'])
  const [selected, setSelected] = useState<TransportSimulateur>('distance')

  const [teletravailStart, setTeletravailStart] = useState<Point>()
  const [teletravailEnd, setTeletravailEnd] = useState<Point>()

  const [itineraireStart, setItineraireStart] = useState<Point>()
  const [itineraireEnd, setItineraireEnd] = useState<Point>()

  const [distanceCarpool, setDistanceCarpool] = useState<Record<string, number>>({})
  const [itineraireCarpool, setItineraireCarpool] = useState<Record<string, number>>({})
  const [teletravailCarpool, setTeletravailCarpool] = useState<Record<string, number>>({})

  const [distanceDisplayAll, setDistanceDisplayAll] = useState(false)
  const [itineraireDisplayAll, setItineraireDisplayAll] = useState(false)
  const [teletravailDisplayAll, settTletravailDisplayAll] = useState(false)

  // Teletravail
  const [teletravailEquivalents, setTeletravailEquivalents] = useState(defaultEquivalents)
  const [teletravailTransport, setTeletravailTransport] = useState('voiturethermique')
  const [presentiel, setPresentiel] = useState(4)
  const [homeOffice, setHomeOffice] = useState(1)

  // Fruits et legumes
  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [sorting, setSorting] = useState('alph_desc')
  const [search, setSearch] = useState('')

  // VisioConference
  const [visioConferenceSituation, setVisioConferenceSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [visioConferenceWithConstruction, setVisioConferenceWithConstruction] = useState(false)

  // Email
  const [emailSituation, setEmailSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [emailWithConstruction, setEmailWithConstruction] = useState(false)

  // Streaming
  const [streamingSituation, setStreamingSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [streamingWithConstruction, setStreamingWithConstruction] = useState(false)

  // Usage Numérique
  const [usageNumeriqueEquivalents, setUsageNumeriqueEquivalents] = useState(defaultEquivalents)
  const [usageNumeriqueDisplayAll, setUsageNumeriqueDisplayAll] = useState(false)
  const [numberEmails, setNumberEmails] = useState<number>(50)
  const [usageNumeriqueSituation, setUsageNumeriqueSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)

  // Numérique
  const [numeriqueDisplayAll, setNumeriqueDisplayAll] = useState(false)

  // Habillement
  const [habillementDisplayAll, setHabillementDisplayAll] = useState(false)

  const searchParams = useSearchParams()
  useEffect(() => {
    overscreenTrigger.current = null

    if (!searchParams) {
      return
    }

    const language = searchParams.get('language')
    if (language === 'en' || language === 'es') {
      setLanguage(language)
    } else {
      setLanguage('fr')
    }

    if (searchParams.get('value')) {
      const value = Number(searchParams.get('value') as string)
      if (!Number.isNaN(value)) {
        setBaseValue(value)
      }
    }
    if (searchParams.get('equivalent')) {
      const [slug, carpool] = (searchParams.get('equivalent') || '').split(' ')
      const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === slug)
      setComparedEquivalent(
        equivalent && equivalent.withCarpool
          ? {
              ...equivalent,
              carpool: Number(carpool),
              link: `${equivalent.link}+${carpool}`,
              slug: `${equivalent.slug}+${carpool}`,
              value: equivalent.value / (Number(carpool) + 1),
            }
          : equivalent
      )
    }

    if (searchParams.get('comparisons')) {
      setEquivalents((searchParams.get('comparisons') as string).replaceAll(' ', '+').split(','))
    } else {
      setEquivalents(getRandomEquivalents(searchParams.get('equivalent') as string, 3))
    }

    if (searchParams.get('m2')) {
      const m2 = Number.parseInt(searchParams.get('m2') as string)
      if (!Number.isNaN(m2)) {
        setM2(m2)
      }
    }

    if (searchParams.get('km')) {
      const km = Number.parseInt(searchParams.get('km') as string)
      if (!Number.isNaN(km)) {
        setKm(km)
      }
    }

    if (searchParams.get('roundTrip')) {
      setRoundTrip(searchParams.get('roundTrip') === 'true')
    }

    if (searchParams.get('modes')) {
      const modes = (searchParams.get('modes') as string).replace(/ /g, '+').split(',')
      if (modes.length > 0) {
        setModes(modes)
        if (!searchParams.get('comparison')) {
          if (modes.length === 2) {
            setComparison(modes)
          } else {
            const firstComparison = comparisons.find(([slug1, slug2]) => modes.includes(slug1) && modes.includes(slug2))
            if (firstComparison) {
              setComparison(firstComparison)
            }
          }
        }
      }
    }

    if (searchParams.get('defaultMode')) {
      setComparisonMode(searchParams.get('defaultMode') === 'list' ? 'list' : 'comparison')
    } else if (searchParams.get('mode')) {
      setComparisonMode(searchParams.get('mode') === 'list' ? 'list' : 'comparison')
    }

    if (searchParams.get('comparison')) {
      const comparison = searchParams.get('comparison')?.replace(/ /g, '+').split(',') as string[]
      setComparison(comparison)
    }
    if (searchParams.get('transport')) {
      setTeletravailTransport(searchParams.get('transport') as string)
    }
    if (searchParams.get('presentiel')) {
      setPresentiel(Number(searchParams.get('presentiel')))
    }
    if (searchParams.get('homeOffice')) {
      setHomeOffice(Number(searchParams.get('homeOffice')))
    }

    completeAddress(setItineraireStart, (searchParams.get('start') || searchParams.get('itineraireStart')) as string)
    completeAddress(setItineraireEnd, (searchParams.get('end') || searchParams.get('itineraireEnd')) as string)
    completeAddress(setTeletravailStart, (searchParams.get('start') || searchParams.get('teletravailStart')) as string)
    completeAddress(setTeletravailEnd, (searchParams.get('end') || searchParams.get('teletravailEnd')) as string)

    if (searchParams.get('month')) {
      const monthIndex = Number.parseInt(searchParams.get('month') as string)
      if (!Number.isNaN(monthIndex)) {
        setMonth(monthIndex)
      } else {
        setMonth(slugs.indexOf(searchParams.get('month') as string))
      }
    }

    if (searchParams.get('emails')) {
      setNumberEmails(getInt(searchParams, 'emails'))
    }

    const situation: Partial<Record<string, PublicodesExpression | ASTNode>> = { ...usageNumeriqueDefaultValues }
    if (searchParams.get('email . appareil')) {
      situation['email . appareil'] = searchParams.get('email . appareil') as string
    }
    if (searchParams.get('email . transmission . émetteur . réseau')) {
      situation['email . transmission . émetteur . réseau'] = searchParams.get(
        'email . transmission . émetteur . réseau'
      ) as string
    }

    if (searchParams.get('email . taille')) {
      situation['email . taille'] = getFloat(searchParams, 'email . taille')
    }

    if (searchParams.get('streaming . durée')) {
      situation['streaming . durée'] = getInt(searchParams, 'streaming . durée')
    }

    if (searchParams.get('streaming . appareil')) {
      situation['streaming . appareil'] = searchParams.get('streaming . appareil') as string
    }

    if (searchParams.get('streaming . transmission . réseau')) {
      situation['streaming . transmission . réseau'] = searchParams.get('streaming . transmission . réseau') as string
    }

    if (searchParams.get('streaming . qualité')) {
      situation['streaming . qualité'] = searchParams.get('streaming . qualité') as string
    }

    if (searchParams.get('visio . durée')) {
      situation['visio . durée'] = getInt(searchParams, 'visio . durée')
    }

    if (searchParams.get('visio . appareil')) {
      situation['visio . appareil'] = searchParams.get('visio . appareil') as string
    }

    if (searchParams.get('visio . emplacements')) {
      situation['visio . emplacements'] = getInt(searchParams, 'visio . emplacements')
    }

    if (searchParams.get('visio . transmission . réseau')) {
      situation['visio . transmission . réseau'] = searchParams.get('visio . transmission . réseau') as string
    }

    if (searchParams.get('visio . qualité')) {
      situation['visio . qualité'] = searchParams.get('visio . qualité') as string
    }

    setUsageNumeriqueSituation(situation)
  }, [searchParams])

  const reset = useCallback((slug: string) => {
    switch (slug) {
      case 'transport':
        setKm(10)
        setItineraireStart(undefined)
        setItineraireEnd(undefined)
        setComparison(['voiturethermique', 'tgv'])
        break
      case 'teletravail':
        setTeletravailStart(undefined)
        setTeletravailEnd(undefined)
        setTeletravailTransport('voiturethermique')
        setPresentiel(4)
        setHomeOffice(1)
        setTeletravailEquivalents(defaultEquivalents)
        break
      case 'usagenumerique':
        setNumberEmails(50)
        setUsageNumeriqueSituation(usageNumeriqueDefaultValues)
        setUsageNumeriqueEquivalents(defaultEquivalents)
        break
      case 'livraison':
        setLivraisonValues(livraisonDefaultValues)
        setNumber(1)
        setFrequence(12)
        setLivraisonEquivalents(defaultEquivalents)
        break
      case 'chauffage':
        setM2(63)
        break
      default:
        break
    }
  }, [])

  return (
    <ParamContext.Provider
      value={{
        overscreen,
        setOverscreen: setOverscreeInternal,
        reset,
        theme,
        setTheme,
        language,
        setLanguage,
        livraison: {
          values: livraisonValues,
          setValues: setLivraisonValues,
          equivalents: livraisonEquivalents,
          setEquivalents: setLivraisonEquivalents,
          isHabit,
          setIsHabit,
          isPlane,
          setIsPlane,
          number,
          setNumber,
          frequence,
          setFrequence,
        },
        comparateur: {
          weight: comparedEquivalent ? comparedEquivalent.value / (comparedEquivalent.percentage ? 100 : 1) : 1,
          baseValue,
          setBaseValue,
          equivalents,
          setEquivalents,
          tiles,
          setTiles,
          comparedEquivalent,
          setComparedEquivalent: internalComparedEquivalentSetter,
        },
        transport: {
          comparisonMode,
          setComparisonMode,
          comparison,
          setComparison,
          modes,
          setModes,
          selected,
          setSelected,
        },
        distance: {
          km,
          setKm,
          carpool: distanceCarpool,
          setCarpool: setDistanceCarpool,
          displayAll: distanceDisplayAll,
          setDisplayAll: setDistanceDisplayAll,
        },
        itineraire: {
          roundTrip,
          setRoundTrip,
          start: itineraireStart,
          setStart: setItineraireStart,
          end: itineraireEnd,
          setEnd: setItineraireEnd,
          carpool: itineraireCarpool,
          setCarpool: setItineraireCarpool,
          displayAll: itineraireDisplayAll,
          setDisplayAll: setItineraireDisplayAll,
        },
        teletravail: {
          start: teletravailStart,
          setStart: setTeletravailStart,
          end: teletravailEnd,
          setEnd: setTeletravailEnd,
          carpool: teletravailCarpool,
          setCarpool: setTeletravailCarpool,
          displayAll: teletravailDisplayAll,
          setDisplayAll: settTletravailDisplayAll,
          transport: teletravailTransport,
          setTransport: setTeletravailTransport,
          presentiel,
          setPresentiel,
          homeOffice,
          setHomeOffice,
          equivalents: teletravailEquivalents,
          setEquivalents: setTeletravailEquivalents,
        },
        chauffage: {
          m2,
          setM2,
        },
        fruitsetlegumes: {
          month,
          setMonth,
          sorting,
          setSorting,
          search,
          setSearch,
        },
        usageNumerique: {
          displayAll: usageNumeriqueDisplayAll,
          setDisplayAll: setUsageNumeriqueDisplayAll,
          numberEmails,
          setNumberEmails,
          situation: usageNumeriqueSituation,
          setSituation: setUsageNumeriqueSituation,
          equivalents: usageNumeriqueEquivalents,
          setEquivalents: setUsageNumeriqueEquivalents,
        },
        visio: {
          situation: visioConferenceSituation,
          setSituation: setVisioConferenceSituation,
          withConstruction: visioConferenceWithConstruction,
          setWithConstruction: setVisioConferenceWithConstruction,
        },
        email: {
          situation: emailSituation,
          setSituation: setEmailSituation,
          withConstruction: emailWithConstruction,
          setWithConstruction: setEmailWithConstruction,
        },
        streaming: {
          situation: streamingSituation,
          setSituation: setStreamingSituation,
          withConstruction: streamingWithConstruction,
          setWithConstruction: setStreamingWithConstruction,
        },
        numerique: {
          displayAll: numeriqueDisplayAll,
          setDisplayAll: setNumeriqueDisplayAll,
        },
        habillement: {
          displayAll: habillementDisplayAll,
          setDisplayAll: setHabillementDisplayAll,
        },
      }}>
      {children}
    </ParamContext.Provider>
  )
}

const useParamContext = () => {
  const context = useContext(ParamContext)

  if (!context) {
    throw new Error('useParamContext has to be used within <ParamProvider>')
  }

  return context
}

export default useParamContext
