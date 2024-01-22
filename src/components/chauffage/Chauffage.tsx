import React, { useMemo } from 'react'
import { Category } from 'types/category'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import useDataContext from 'components/providers/DataProvider'
import useParamContext from 'components/providers/ParamProvider'
import BarChart from 'components/charts/BarChart'
import Simulator from 'components/misc/Simulator'
import CategoryWrapper from 'components/misc/category/CategoryWrapper'
import SliderWithInput from 'components/misc/slider/SliderWithInput'

const Chauffage = ({ category, iframe }: { category: Category; iframe?: boolean }) => {
  const {
    chauffage: { m2, setM2 },
  } = useParamContext()
  const { equivalents } = useDataContext()

  const equivalentsOfCategory = useMemo(
    () =>
      equivalents
        .filter((equivalent) => equivalent.category === category.id)
        .map((equivalent) => ({
          ...equivalent,
          title: formatName(equivalent.name, 1, true),
          value: computeECV(equivalent) * m2,
          usage: 0,
          onClick: () => track('Chauffage', 'Navigation equivalent', equivalent.slug),
        })),
    [equivalents, category, m2]
  )

  return (
    <CategoryWrapper category={category} iframe={iframe} params={{ m2: m2.toString() }} withFooter>
      <Simulator
        text={
          <>
            Découvrez la quantité de CO<sub>2</sub>e que vous émettez pour chauffer cette surface par année
          </>
        }>
        <SliderWithInput
          value={m2}
          setValue={setM2}
          unit='m²'
          digit={3}
          tracking='Chauffage'
          aria-label='Surface à chauffer'
        />
      </Simulator>
      <BarChart equivalents={equivalentsOfCategory} category={category} />
    </CategoryWrapper>
  )
}

export default Chauffage
