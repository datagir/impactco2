import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import ModalContext from 'components/providers/ModalProvider'
import RulesContext from './RulesProvider'
import Section from 'components/base/Section'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'
import Detail from 'components/views/equivalent/ecv/Detail'
import Wrapper from './Wrapper'
import Bar from './equivalent/Bar'
import ExpertMode from './equivalent/ExpertMode'
import DeviceInput from './equivalent/DeviceInput'
import VideoInput from './equivalent/VideoInput'
import EmailInput from './equivalent/EmailInput'

export const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
export const Title = styled.h1``
const Questions = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 1rem 0;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
export default function Simulateur(props) {
  const { ecv } = useContext(DataContext)

  const { setEcv } = useContext(ModalContext)

  const { engine, situation } = useContext(RulesContext)

  const ecvToDisplay = useMemo(
    () =>
      engine && ecv
        ? engine
            .evaluate(props.name)
            .traversedVariables.filter((variable) =>
              ecv.find((item) => props.name + item.id === variable)
            )
            .map((variable) => {
              const step = ecv.find((item) => props.name + item.id === variable)
              return {
                color: step.color,
                label: step.name,
                value: engine.evaluate(variable).nodeValue,
                onClick: () => setEcv(step.id),
              }
            })
        : [],
    [ecv, engine, situation, props.formatNumber]
  )

  const questions = useMemo(
    () =>
      engine
        ? engine &&
          engine
            .evaluate(props.name)
            .traversedVariables.map((variable) => engine.getRule(variable))
            .filter((rule) => rule.rawNode.question !== undefined)
        : [],
    [engine, situation, props.name]
  )

  return engine ? (
    <StyledSection>
      <Section.Content>
        <Wrapper
          name={formatName(props.equivalent.name, 1, true)}
          slug={props.equivalent.slug}
        >
          <Bar
            equivalent={props.equivalent}
            category={props.category}
            name={props.name}
          />
          <StackedChart
            items={ecvToDisplay}
            total={engine.evaluate(props.name).nodeValue}
          />
          <Legend items={ecvToDisplay} />
          <Detail
            ecv={ecvToDisplay.map((ecv) => ({
              ...ecv,
              value: ecv.value / 1000,
            }))}
            total={engine.evaluate(props.name).nodeValue / 1000}
          />
          <Questions>
            {props.name === 'streaming' && (
              <>
                <DeviceInput name={props.name} />
                <VideoInput name={props.name} />
              </>
            )}
            {props.name === 'visio' && (
              <>
                <DeviceInput name={props.name} />
                <VideoInput name={props.name} />
              </>
            )}
            {props.name === 'email' && (
              <>
                <DeviceInput name={props.name} />
                <EmailInput name={props.name} />
              </>
            )}
            {props.name === 'recherche web' && (
              <>
                <DeviceInput name={props.name} />
              </>
            )}
          </Questions>
          <ExpertMode questions={questions} />
        </Wrapper>
      </Section.Content>
    </StyledSection>
  ) : null
}
