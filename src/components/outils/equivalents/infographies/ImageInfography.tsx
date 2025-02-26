import { useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentImageInfographyValues } from 'components/shareable/overScreens/Values'
import styles from './ImageInfography.module.css'

const ImageInfography = ({
  image,
  alt,
  equivalent,
  index,
}: {
  image: string
  alt: string
  equivalent: ComputedEquivalent
  index: number
}) => {
  const overScreens = useMemo(() => overScreenEquivalentImageInfographyValues(equivalent, index), [equivalent, index])

  return (
    <Shareable
      slug={`image-infographie-${index}`}
      tracking={`${getName('fr', equivalent)} image infographie ${index}`}
      overScreens={overScreens}
      secondary=''
      smallPadding>
      <img src={`/images/${image}`} alt={alt} className={styles.image} />
    </Shareable>
  )
}

export default ImageInfography
