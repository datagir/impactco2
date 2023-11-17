import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import ClickableIcon from './components/Information'
import NumberInput from './components/NumberInput'
import { Content, Description, Header, QuestionCard, Tag, Title } from './Question.styles'

const Question = ({
  title,
  description,
  value,
  setValue,
  tag,
  customBorderRadius,
  source,
  children,
  'data-testid': dataTestId,
}: {
  title: string
  description: ReactNode
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  tag?: string | false
  customBorderRadius?: boolean
  source?: () => void
  children?: ReactNode
  ['data-testid']?: string
}) => {
  return (
    <>
      <QuestionCard $customBorderRadius={customBorderRadius} data-testid={dataTestId}>
        <Header>
          <Title>
            {title}
            {source && <ClickableIcon onClick={source} />}
          </Title>
          {tag && <Tag data-testid={`${dataTestId}-tag`}>{tag}</Tag>}
        </Header>
        <Content>
          <Description>{description}</Description>
          <NumberInput data-testid={dataTestId} value={value} setValue={setValue} />
        </Content>
        {children}
      </QuestionCard>
    </>
  )
}

export default Question
