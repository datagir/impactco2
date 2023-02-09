import React, { useState } from 'react'
import styled from 'styled-components'

import useScreenshot from 'hooks/useScreenshot'

import Background from 'components/screenshot/Background'
import Buttons from 'components/screenshot/Buttons'
import Signature from 'components/screenshot/Signature'

const SizerWrapper = styled.div`
  ${(props) => props.theme.mq.medium} {
    overflow: hidden;
  }
`
const Sizer = styled.div`
  margin: -1.5rem;
  position: relative;

  ${(props) => props.theme.mq.medium} {
    margin: -0.75rem;
  }
`
const Content = styled.div`
  background-color: ${(props) =>
    props.hover ? props.theme.colors.background : 'transparent'};
`
const Header = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`
const Title = styled.h1``
const StyledButtons = styled(Buttons)`
  margin-top: 0.5rem;
`
export default function Wrapper(props) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(
    props.slug || 'impactco2'
  )

  return (
    <SizerWrapper>
      <Sizer className={props.className}>
        <Content ref={ref} hover={hover}>
          <Background hover={hover}>
            <Header>
              <Title>{props.name}</Title>
              <StyledButtons
                takeScreenshot={takeScreenshot}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
            </Header>
            {props.children}
          </Background>
          {isScreenshotting && <Signature />}
        </Content>
      </Sizer>
    </SizerWrapper>
  )
}
