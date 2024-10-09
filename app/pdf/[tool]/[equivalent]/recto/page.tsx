import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Recto from 'components/outils/equivalents/pdf/Recto'
import 'components/outils/equivalents/pdf/pdf.css'

const EquivalentPage = ({ params }: { params: { tool: string; equivalent: string } }) => {
  const category = categories.find((category) => category.slug === params.tool)
  if (!category || !category.equivalents) {
    return notFound()
  }
  const [slug] = decodeURIComponent(params.equivalent).split('+')
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return notFound()
  }
  return <Recto equivalent={equivalent} />
}

export default EquivalentPage
