import React from 'react'
import styled from 'styled-components'

import Menu2 from './nav/Menu2'

const Wrapper = styled.div`
  margin-top: auto;
  max-width: 48rem;
`

export default function Nav2() {
  return (
    <Wrapper>
      <Menu2 />
    </Wrapper>
  )
}
