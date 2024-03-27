import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Search from 'components/transport/Search'

export default function Itineraire({ category }: { category: Category }) {
  return (
    <Iframe noLogo>
      <Search initialType='itineraire' category={category} iframe />
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 4),
    },
  }
}
