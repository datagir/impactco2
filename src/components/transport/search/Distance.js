import React, { useRef, useState } from 'react'
import { Range } from 'react-range'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import useTransportContext from 'components/transport/TransportProvider'
import NumberInput from './distance/NumberInput'
import PlusOrMinusButton from './distance/PlusOrMinusButton'
import ThumbContent from './distance/ThumbContent'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 2.5rem;
  margin: 0 auto;
  max-width: 30rem;
`

const Track = styled.div`
  flex: 1;
  height: 0.125rem;
  margin: 0 3.75rem;
  position: relative;

  &:before {
    background-color: var(--primary-10);
    bottom: 0;
    content: '';
    left: -2.75rem;
    position: absolute;
    right: -2.75rem;
    top: 0;
  }
`
const Thumb = styled.div`
  align-items: center;
  background-color: var(--primary-50);
  border-radius: 1.5rem;
  color: var(--neutral-00);
  display: flex;
  font-weight: 700;
  height: 2.5rem;
  justify-content: flex-end;
  padding: 0 0.6rem 0 0.1rem;
  text-align: center;
  width: 7rem;

  &:focus {
    box-shadow: 0 0 0 0.125rem var(--primary-10);
    outline: none;
  }
`
export default function Distance() {
  const { km, setKm } = useTransportContext()
  const tracked = useRef(false)

  const cleanRound = (x) => {
    return Number(x.toPrecision(1))
  }

  const getPositionFromKm = (km) => {
    const position = Math.round((Math.log(km * 10) / Math.log(10) - 1) * 1000) / 1000
    return position > 4 ? 4 : position
  }
  const getKmFromPosition = (position) => Math.round(Math.pow(10, position))

  const [openTextInput, setOpenTextInput] = useState(false)

  return (
    <Wrapper>
      {openTextInput ? (
        <NumberInput
          min={1}
          km={km}
          setKm={(km) => {
            if (km !== '') {
              setKm(km)
              setOpenTextInput(false)
              track('Transport distance', 'Distance manuel', km)
            }
          }}
        />
      ) : (
        <>
          <PlusOrMinusButton
            onClick={() => {
              let position = getPositionFromKm(km)
              position = position - 0.4 < 0 ? 0 : position - 0.4
              setKm(cleanRound(getKmFromPosition(position)))
            }}
          />
          <Range
            step={0.001}
            min={0}
            max={4}
            values={[getPositionFromKm(km)]}
            onChange={(values) => {
              if (!tracked.current) {
                tracked.current = true
                track('Transport distance', 'Distance slider', 'slider-distance')
              }
              setKm(getKmFromPosition(values[0]))
            }}
            renderTrack={({ props, children }) => <Track {...props}>{children}</Track>}
            renderThumb={({ props }) => (
              // Thumb can't be in his own component (don't know why)
              <Thumb {...props} aria-label='Distance'>
                <ThumbContent km={km} setOpenTextInput={setOpenTextInput} />
              </Thumb>
            )}
          />
          <PlusOrMinusButton
            onClick={() => {
              let position = getPositionFromKm(km)
              position = position + 0.4 > 4 ? 4 : position + 0.4
              setKm(cleanRound(getKmFromPosition(position)))
            }}
            plus
          />
        </>
      )}
    </Wrapper>
  )
}
