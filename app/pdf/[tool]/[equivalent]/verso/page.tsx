import { notFound } from 'next/navigation'
import TranslationProvider from 'src/providers/TranslationProvider'
import { categories } from 'data/categories'
import Verso from 'components/outils/equivalents/pdf/Verso'
import 'components/outils/equivalents/pdf/pdf.css'

const EquivalentPage = async (props: { params: Promise<{ tool: string; equivalent: string }> }) => {
  const params = await props.params
  const category = categories.find((category) => category.slug === params.tool)
  if (!category || !category.equivalents) {
    return notFound()
  }
  const [slug] = decodeURIComponent(params.equivalent).split('+')
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return notFound()
  }
  return (
    <TranslationProvider>
      <Verso equivalent={equivalent} category={category} />
    </TranslationProvider>
  )
}

export default EquivalentPage
