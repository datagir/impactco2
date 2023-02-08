import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0;
  text-align: center;
`
export default function Instruction() {
  return (
    <Wrapper className={'noscreenshot'}>
      Cliquez sur un équivalent pour voir le détail.
    </Wrapper>
  )
}
