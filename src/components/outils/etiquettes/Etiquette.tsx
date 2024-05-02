'use client'

import React, { useMemo, useRef } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import EtiquetteContent from 'components/comparateur/Etiquette'
import Shareable from 'components/misc/shareable/Shareable'
import { overScreenEquivalentEtiquetteValues } from 'components/misc/shareable/overScreens/Values'

const Etiquette = ({ equivalent }: { equivalent: ComputedEquivalent }) => {
  const overScreens = useMemo(() => overScreenEquivalentEtiquetteValues(equivalent), [equivalent])
  const ref = useRef(null)
  return (
    <Shareable overScreens={overScreens} tracking={`${equivalent.name}-Etiquette`} secondary=''>
      <EtiquetteContent baseValue={(equivalent.value * 1000).toString()} comparisons={[equivalent.slug]} ref={ref} />
    </Shareable>
  )
}

export default Etiquette
