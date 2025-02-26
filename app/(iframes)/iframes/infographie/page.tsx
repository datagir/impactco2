import { computedEquivalents } from 'src/providers/equivalents'
import Infography from 'components/outils/equivalents/infographies/Infography'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const page = async (props: Props) => {
  const searchParams = await props.searchParams
  const equivalents = ((searchParams['equivalents'] as string) || '').split(',')
  if (equivalents.length === 0) {
    return null
  }
  const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === equivalents[0])
  if (!equivalent) {
    return null
  }

  return <Infography equivalent={equivalent} equivalents={equivalents} />
}

export default page
