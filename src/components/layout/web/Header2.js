import React from 'react'
import styled from 'styled-components'

import Flex from 'components/base/Flex'
import Logo from 'components/base/Logo'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Section2 from 'components/base/Section2'
import Nav2 from 'components/layout/web/Nav2.js'

const Header = styled.header`
  border-bottom: 1px solid black;
`

const Logos = styled(MagicLink)``

export default function Header2() {
  return (
    <Section2>
      <Section2.WideContent>
        <Header>
          <Flex.Between>
            <Flex>
              <Logos to='/' aria-label='Accueil'>
                <Marianne />
              </Logos>
              <Logo />
            </Flex>
            <Nav2 />
          </Flex.Between>
        </Header>
      </Section2.WideContent>
    </Section2>
  )
}
