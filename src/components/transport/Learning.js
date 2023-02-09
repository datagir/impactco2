import AnimatedNumber from 'animated-number-react'
import React, { useRef } from 'react'
import styled from 'styled-components'

import useOnScreen from 'hooks/useOnScreen'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'
import Section from 'components/base/Section'

const StyledSection = styled(Section)`
  margin-top: 5rem;
`
const Statistic = styled.div`
  font-size: 4.3rem;
  font-weight: bold;
  line-height: 0.9;
  margin-bottom: 1em;
  text-align: right;

  ${(props) => props.theme.mq.small} {
    font-size: 3.5rem;
    text-align: center;
  }
`
const FirstLine = styled.div``
const Number = styled.span`
  color: ${(props) => props.theme.colors.main};
  font-size: 14.5rem;
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  text-align: right;
  transition: opacity 1000ms;

  ${(props) => props.theme.mq.small} {
    display: block;
    font-size: 46.5vw;
  }
`
const BigText = styled.div``
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
const Strong = styled.p`
  font-size: 1.45rem;
  font-style: italic;
  font-weight: 700;

  ${(props) => props.theme.mq.small} {
    margin-left: 0;
  }
`
const Text = styled.p``
export default function Learning() {
  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px')

  return (
    <StyledSection>
      <Section.Content>
        <Statistic ref={ref}>
          <FirstLine>
            <Number isOnScreen={isOnScreen}>
              {isOnScreen ? (
                <AnimatedNumber
                  value={30}
                  formatValue={(value) => Math.round(value) + '%'}
                />
              ) : (
                '0%'
              )}
            </Number>
            des
          </FirstLine>
          <BigText>
            émissions de <Color>CO2</Color>
          </BigText>
        </Statistic>
        <Strong>
          &quot;Hors confinement&quot;, le secteur des transports est le 1er
          secteur émetteur de gaz à effet de serre.
        </Strong>
        <Text>
          Jusqu&apos;à peu, se déplacer faisait partie intégrante de notre vie
          sociale et professionnelle. À tel point que tout notre environnement
          est structuré autour des transports. Tout invite au voyage, qu&apos;il
          soit court ou long. Mais comment révolutionner nos trajets ? Découvrez
          des pistes de réflexion avec cette{' '}
          <MagicLink to='https://multimedia.ademe.fr/infographies/infographie-la-mobilite-ademe/'>
            infographie de l&apos;ADEME
          </MagicLink>
        </Text>

        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez
          calculer l&apos;ensemble de votre empreinte sur le climat grace à
          notre{' '}
          <MagicLink to={'https://nosgestesclimat.fr/'}>
            simulateur Nos Gestes Climat
          </MagicLink>
        </Text>
        <Button.Wrapper>
          <Button to={'https://nosgestesclimat.fr/'}>
            Découvrir Nos Gestes Climat
          </Button>
        </Button.Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
