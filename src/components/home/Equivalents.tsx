'use client'

import React, { useEffect, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { computedEquivalents } from 'components/providers/equivalents'
import { useSearchEquivalent } from 'components/providers/useSearchEquivalent'
import Button from 'components/base/buttons/Button'
import Card from 'components/cards/Card'
import { getRandomEquivalents } from 'components/comparateur/random'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import MagicWandIcon from 'components/osezchanger/icons/magic-wand'
import SearchIcon from 'components/osezchanger/icons/search'
import EquivalentCard from './EquivalentCard'
import styles from './Equivalents.module.css'

const generate = () => getRandomEquivalents('', 3).map((slug) => computedEquivalents.find((x) => x.slug === slug))

const Equivalents = () => {
  const [search, setSearch] = useState('')
  const [equivalents, setEquivalents] = useState<(ComputedEquivalent | undefined)[]>([])

  const results = useSearchEquivalent(search)

  useEffect(() => {
    setEquivalents(generate())
  }, [])

  return (
    <>
      <Card colored>
        <HiddenLabel htmlFor='input-search'>Rechercher</HiddenLabel>
        <Input
          id='search'
          placeholder='Rechercher'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<SearchIcon />}
          padding='lg'
        />
      </Card>
      <div className={styles.equivalents}>
        <EquivalentCard equivalent={search ? results[0] : equivalents[0]} />
        <EquivalentCard equivalent={search ? results[1] : equivalents[1]} />
        <EquivalentCard equivalent={search ? results[2] : equivalents[2]} />
      </div>
      <Button
        className={styles.button}
        icon={<MagicWandIcon />}
        onClick={() => {
          setSearch('')
          setEquivalents(generate())
        }}>
        Afficher d'autres fiches
      </Button>
    </>
  )
}

export default Equivalents
