import { computedEquivalents } from 'src/providers/equivalents'
import ImageInfography from 'components/outils/equivalents/infographies/ImageInfography'
import { imageInfographies } from 'components/outils/equivalents/infographies/list'

type Props = {
  params: Promise<{ index: number; equivalent: string }>
}

const page = async (props: Props) => {
  const params = await props.params

  const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === params.equivalent)
  const infographie = imageInfographies[params.equivalent][params.index]

  return equivalent && infographie ? (
    <ImageInfography equivalent={equivalent} image={infographie.image} alt={infographie.alt} index={params.index} />
  ) : null
}

export default page
