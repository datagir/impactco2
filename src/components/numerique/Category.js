import React, { useState, useContext } from 'react'

import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Description from 'components/misc/category/Description'
import Search from './category/Search'
import Result from './category/Result'
import Hypothèses from './category/Hypothèses'

export default function Category(props) {
  const [numberEmails, setNumberEmails] = useState(50)
  const [construction, setConstruction] = useState(false)

  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={props.category.title || props.category.name}
          slug={props.category.slug}
        >
          <Description description={props.category.description} />
          <Search
            numberEmails={numberEmails}
            setNumberEmails={setNumberEmails}
          />
          <Hypothèses />
          <Result numberEmails={numberEmails} construction={construction} />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
