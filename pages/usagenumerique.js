import React from 'react'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import Category from 'components/numerique/Category'
import { RulesProvider } from 'components/numerique/RulesProvider'

export default function Numerique(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}>
      <RulesProvider>
        <Category category={props.category} />
        <Learning category={props.category} />
      </RulesProvider>
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  }
}
