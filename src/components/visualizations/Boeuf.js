import React from 'react'

import {
  CenterLink,
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  Small,
  Title,
} from 'components/misc/Visualization'

export default function Boeuf() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>🥩</Emojis>
          <Label>
            1 repas avec
            <br />
            du boeuf
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 6, 24]}>
          <Emojis>🍗🍗🍗🍗🍗</Emojis>
          <Label>
            5 repas avec
            <br />
            du poulet
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[20, 15, 30]}>
          <Emojis>🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗</Emojis>
          <Label>
            14 repas
            <br />
            végétariens
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />
        1 repas avec
        <br />
        du boeuf
        <br />=<br />
        5 repas avec
        <br />
        du poulet
        <br />=<br />
        14 repas
        <br />
        végétariens
        <br />
      </Small>
      <CenterLink to='/repas'>Voir tous les repas</CenterLink>
    </>
  )
}
