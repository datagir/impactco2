import React from 'react'
import { Category } from 'types/category'
import { Equivalent as EquivalentType } from 'types/equivalent'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import useDataContext from 'components/providers/DataProvider'
import {
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  LinkWrapper,
  Small,
  StyledLink,
  Title,
} from './Visualization.styles'

export const categoryLinks: Record<string, { to: string; label: string }> = {
  boisson: {
    to: '/boissons',
    label: "Comparez avec d'autres boissons",
  },
  transport: {
    to: '/transport',
    label: "Comparez avec d'autres modes de transport",
  },
  quotidien: {
    to: '/convertisseur',
    label: "Comparez à d'autres objets du quotidien",
  },
  habillement: {
    to: '/habillement',
    label: "Comparez à d'autres vêtements",
  },
  repas: {
    to: '/repas',
    label: "Comparez à d'autres repas",
  },
  chauffage: {
    to: '/chauffage',
    label: "Comparez avec d'autres modes de chauffage",
  },
  numerique: {
    to: '/numerique',
    label: "Comparez avec d'autres objets numériques",
  },
}

const CenterLink = ({ category }: { category?: Category }) => {
  if (!category) {
    return null
  }

  const config = categoryLinks[category.slug]
  return (
    <LinkWrapper>
      <StyledLink href={config.to} className='noscreenshot'>
        {config.label}
      </StyledLink>
    </LinkWrapper>
  )
}

const getSize = (value: number) => {
  if (value > 2000) {
    return { xsmall: true }
  }

  if (value > 50) {
    return { small: true }
  }

  return {}
}

const Visualization = ({ types, base }: { types: string[]; base?: number }) => {
  const { equivalents, categories } = useDataContext()

  const values = types.map(
    (slug) => equivalents.find((equivalent: EquivalentType) => equivalent.slug === slug) as EquivalentType
  )

  const factor = computeECV(values[0]) * (base || 1)
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        {values
          .flatMap((equivalent) => {
            const value = Math.round(factor / computeECV(equivalent))
            return [
              <Equivalent key={equivalent.slug}>
                <Emojis {...getSize(value)}>{[...Array(value)].map(() => equivalent.emoji).join('')}</Emojis>
                <Label>
                  {value} {equivalent.prefix && formatName(equivalent.prefix, value)}{' '}
                  {equivalent.prefixEquivalent && formatName(equivalent.prefixEquivalent, value)}
                  {formatName(equivalent.name, value)} {equivalent.subtitle && formatName(equivalent.subtitle, 1)}
                </Label>
              </Equivalent>,
              <div key={`${equivalent.slug}-eq`}>
                <Equals>=</Equals>
                <span />
              </div>,
            ]
          })
          .slice(0, values.length * 2 - 1)}
      </Equivalents>
      <Small>
        {values
          .flatMap((equivalent) => {
            const value = Math.round(factor / computeECV(equivalent))
            return [
              <div key={equivalent.slug}>
                {value} {equivalent.prefix && formatName(equivalent.prefix, value)}
                {formatName(equivalent.name, value)} {equivalent.subtitle && formatName(equivalent.subtitle, 1)}
              </div>,
              <div key={`${equivalent.slug}-eq`}>=</div>,
            ]
          })
          .slice(0, values.length * 2 - 1)}
        <br />
      </Small>
      <CenterLink category={categories.find((category) => category.id === values[0].category)} />
    </>
  )
}

export default Visualization
