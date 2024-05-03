import Image from 'next/image'
import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { buildCurrentUrlFor } from 'utils/urls'

const EquivalentIcon = ({ equivalent, height }: { equivalent: Pick<ComputedEquivalent, 'slug'>; height?: number }) => {
  return (
    <Image
      src={buildCurrentUrlFor(`/icons/${equivalent.slug}.svg`)}
      width={(height || 1) * 16}
      height={(height || 1) * 16}
      alt=''
    />
  )
}

export default EquivalentIcon
