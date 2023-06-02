import React, { useContext } from 'react'
import styled from 'styled-components'

import Flex from 'components/base/Flex'
import RulesContextLivraison from 'components/livraison/RulesProviderLivraison'

import Resultat from './Resultat'
import SelectFrequences from './SelectFrequences'
import SelectProduits from './SelectProduits'
import SelectRetraits from './SelectRetraits'

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-top: 0;
`

export default function CalculateurLivraison() {
  const { engine } = useContext(RulesContextLivraison)

  let result = engine.evaluate('livraison colis')
  console.log('result---------------------------')
  console.log(result)

  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Flex>
        <SelectProduits />
        <SelectRetraits />
        <SelectFrequences />
      </Flex>
      <Resultat />
    </>
  )
}
