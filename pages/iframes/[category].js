import categories from 'data/categories.json'
import React from 'react'

import Iframe from 'components/layout/Iframe'
import Category from 'components/misc/Category'

export default function CategoryIframe(props) {
  return (
    <Iframe url={props.category.slug}>
      <Category category={props.category} iframe />
    </Iframe>
  )
}

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => ![4, 9, 10].includes(category.id))
      .map((category) => ({
        params: { category: category.slug },
      })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  return {
    props: {
      category: categories?.find(
        (category) => category.slug === params.category
      ),
    },
  }
}
