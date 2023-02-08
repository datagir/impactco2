import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Range } from 'react-range'

import TransportContext from 'components/transport/TransportProvider'
import NumberInput from './distance/NumberInput'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 2.5rem;
  margin: 0 auto;
  max-width: 30rem;
`
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    display: block;
    height: auto;
    width: 1.5rem;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
const Track = styled.div`
  flex: 1;
  height: 0.125rem;
  margin: 0 3.75rem;
  position: relative;

  &:before {
    background-color: ${(props) => props.theme.colors.mainLight};
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
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;
  color: ${(props) => props.theme.colors.background};
  display: flex;
  font-weight: 700;
  height: 2.5rem;
  justify-content: flex-end;
  padding: 0 0.6rem 0 0.1rem;
  text-align: center;
  width: 7rem;

  &:focus {
    box-shadow: 0 0 0 0.125rem ${(props) => props.theme.colors.mainLight};
    outline: none;
  }
`
const Kilometers = styled.div`
  flex: 1;
  text-align: center;
`
const Edit = styled.div`
  cursor: pointer;
  display: block;
  margin-bottom: 0.2rem;
  width: 1rem;

  svg {
    display: block;
    height: auto;
    width: 100%;

    path {
      fill: ${(props) => props.theme.colors.background};
    }
  }
`
export default function Distance() {
  const { km, setKm } = useContext(TransportContext)
  const convertSliderPositionToDistance = (pos) => {
    // Please don't ask
    return (
      Math.round(
        (Math.log((pos > 10000 ? 10000 : pos) * 10) / Math.log(10) - 1) * 1000
      ) / 1000
    )
  }

  const [position, setPosition] = useState(convertSliderPositionToDistance(km))

  useEffect(() => {
    setKm(Math.round(Math.pow(10, position)))
  }, [position, setKm])

  const [openTextInput, setOpenTextInput] = useState(false)

  return (
    <Wrapper>
      {openTextInput ? (
        <NumberInput
          min={0}
          km={km}
          setKm={(km) => {
            if (km !== '') {
              // Forces the user to enter a number and avoid the convertion of '' to -inf by JS.
              setPosition(convertSliderPositionToDistance(km))
              requestAnimationFrame(() => setKm(km > 10000 ? 10000 : km))
              setOpenTextInput(false)
            }
          }}
        />
      ) : (
        <>
          <Button
            aria-label='moins'
            onClick={() =>
              setPosition((prevPosition) =>
                prevPosition - 0.4 < 0 ? 0 : prevPosition - 0.4
              )
            }
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z'
                fill='#DE0244'
              />
            </svg>
          </Button>
          <Range
            step={0.001}
            min={0}
            max={4}
            values={[position]}
            onChange={(values) => {
              setPosition(values[0])
            }}
            renderTrack={({ props, children }) => (
              <Track {...props}>{children}</Track>
            )}
            renderThumb={({ props }) => (
              <Thumb {...props} aria-label='Distance'>
                <Kilometers>{km} km</Kilometers>
                <Edit
                  onClick={() => {
                    setOpenTextInput(true)
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 512 512'
                    height='512'
                    viewBox='0 0 512 512'
                    width='512'
                  >
                    <path d='m292.545 325.52c-4.92 4.917-11 8.674-17.589 10.871l-63.641 21.213c-4.593 1.532-9.383 2.31-14.229 2.31 0 0 0 0-.001 0-12.021 0-23.321-4.681-31.82-13.181-12.131-12.134-16.295-29.778-10.87-46.051l21.214-63.638c2.195-6.591 5.955-12.675 10.87-17.59l137.455-137.454h-268.934c-30.327 0-55 24.673-55 55v320c0 30.327 24.673 55 55 55h320c30.327 0 55-24.673 55-55v-268.934z' />
                    <path d='m207.693 240.668c-1.647 1.647-2.887 3.654-3.623 5.863l-21.214 63.639c-1.797 5.39-.394 11.332 3.623 15.35 4.018 4.018 9.96 5.421 15.35 3.623l63.64-21.213c2.21-.736 4.216-1.976 5.863-3.623l187.384-187.383-63.639-63.639z' />
                    <path d='m476.393 7.322c-9.763-9.763-25.592-9.763-35.355 0l-24.749 24.749 63.64 63.64 24.749-24.749c9.763-9.763 9.763-25.592 0-35.355z' />
                  </svg>
                </Edit>
              </Thumb>
            )}
          />
          <Button
            aria-label='plus'
            onClick={() =>
              setPosition((prevPosition) =>
                prevPosition + 0.4 > 4 ? 4 : prevPosition + 0.4
              )
            }
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z'
                fill='#DE0244'
              />
              <path
                d='M12 24C9.79086 24 8 22.2091 8 20L8 4C8 1.79086 9.79086 9.65645e-08 12 0C14.2091 -9.65645e-08 16 1.79086 16 4L16 20C16 22.2091 14.2091 24 12 24Z'
                fill='#DE0244'
              />
            </svg>
          </Button>
        </>
      )}
    </Wrapper>
  )
}
