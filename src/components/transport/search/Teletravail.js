import React, { useContext } from 'react'
import styled from 'styled-components'

import TransportContext from 'components/transport/TransportProvider'
import Address from './itinerary/Address'
import Transportations from './teletravail/Transportations'
import Days from './teletravail/Days'

const Wrapper = styled.div``
const Details = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  display: block;
  font-size: 0.875rem;
  margin: 0 auto;
  padding: 0;
  text-decoration: underline;
`
export default function Teletravail() {
  const {
    start,
    setStart,
    end,
    setEnd,
    teletravailTransportation,
    setTeletravailModal,
  } = useContext(TransportContext)

  return (
    <Wrapper>
      <Address
        placeholder='Domicile'
        address={start?.address}
        setPlace={setStart}
      />
      <Address placeholder='Travail' address={end?.address} setPlace={setEnd} />
      <Transportations />
      <Days />
      {start && end && teletravailTransportation && (
        <Details onClick={() => setTeletravailModal(true)}>
          Voir et ajuster les détails du calcul
        </Details>
      )}
    </Wrapper>
  )
}
