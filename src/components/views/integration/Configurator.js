import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import Select from 'components/base/Select'
import Code from './configurator/Code'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  margin-right: 2rem;
  padding: 1.5rem;
  width: 24rem;

  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    width: 100%;
  }
`
const Title = styled.h1`
  font-size: 2rem;
`
export default function Configurator(props) {
  return (
    <Wrapper>
      <Title>
        Configurez
        <br />
        votre iframe
      </Title>
      <Select
        onChange={(e) => props.setSlug(e.value)}
        value={
          props.type === 'category'
            ? 'numerique'
            : props.type === 'equivalent'
            ? 'abricot'
            : 'tuiles'
        }
        label={`1) Choisissez le type d'iframe que vous souhaitez intégrer.`}
        name='type'
      >
        <option value='tuiles'>Tuiles</option>
        <option value='numerique'>Categorie</option>
        <option value='abricot'>Equivalent</option>
      </Select>
      {props.type === 'category' && (
        <Select
          onChange={(e) => props.setSlug(e.value)}
          value={props.slug}
          name='type'
        >
          {props.categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </Select>
      )}
      {props.type === 'equivalent' && (
        <Select
          onChange={(e) => props.setSlug(e.value)}
          value={props.slug}
          name='type'
        >
          {props.equivalents
            .sort((a, b) => (a.slug > b.slug ? 1 : -1))
            .map((equivalent) => (
              <option key={equivalent.slug} value={equivalent.slug}>
                {formatName(equivalent.name, 1, true).replace(
                  '(ou trottinette)',
                  ''
                )}
              </option>
            ))}
        </Select>
      )}
      <Select
        onChange={({ value }) => props.setTheme(value)}
        label={`2) Choisissez la palette de couleurs de votre iframe.`}
        name='theme'
      >
        <option value='default'>Clair</option>
        <option value='night'>Sombre</option>
      </Select>
      <Code type={props.path} theme={props.theme} />
    </Wrapper>
  )
}
