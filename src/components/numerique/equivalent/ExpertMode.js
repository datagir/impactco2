import { useContext, useState } from 'react'
import styled from 'styled-components'
import Button from 'components/base/buttons/Button'
import RulesContextNumerique from '../RulesProviderNumerique'
import Question from './expertMode/Question'

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3rem;
  justify-content: center;
  margin-top: 1rem;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
const StyledButtonLink = styled(Button)`
  font-size: 0.75rem;
  margin-bottom: 2rem;
`
export default function ExpertMode(props) {
  const { engine, setSituation } = useContext(RulesContextNumerique)

  const [open, setOpen] = useState(false)
  return (
    <>
      <StyledButtonLink asLink onClick={() => setOpen((prevOpen) => !prevOpen)} className='noscreenshot'>
        Voir plus d'options
      </StyledButtonLink>
      {open && (
        <Wrapper>
          {props.questions.map((question) => (
            <Question
              key={question.dottedName}
              rule={question}
              evaluation={engine.evaluate(question.dottedName)}
              value={engine.evaluate(question.dottedName).nodeValue}
              onChange={setSituation}
            />
          ))}
        </Wrapper>
      )}
    </>
  )
}
