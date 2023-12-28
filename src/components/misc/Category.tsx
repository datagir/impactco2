import React, { useContext, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import DataContext from 'components/providers/DataProvider'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Bottom from './category/Bottom'
import CategoryLegend from './category/CategoryLegend'
import CategoryWrapper from './category/CategoryWrapper'
import Instruction from './category/Instruction'
import List from './category/List'
import { Checkboxes, Top } from './category/Top'

export default function CategoryList({ category, iframe }: { category: Category; iframe?: boolean }) {
  const { equivalents } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const equivalentsOfCategory = useMemo(
    () =>
      category &&
      equivalents
        .filter((equivalent) => equivalent.category === category.id)
        .filter((equivalent) => equivalent.default || displayAll)
        .map((equivalent) => ({
          ...equivalent,
          title: formatName(equivalent.name, 1, true),
          subtitle: displayAll ? formatName(equivalent.subtitle) : undefined,
          value: computeECV(equivalent),
          usage: formatUsage(equivalent),
          onClick: () => track(category.name, 'Navigation equivalent', equivalent.slug),
        })),
    [equivalents, category, displayAll]
  )

  return (
    <>
      <CategoryWrapper category={category} iframe={iframe}>
        <Top className='noscreenshot'>
          <Instruction title={category.equivalent} gender={category.gender} />
          <Checkboxes
            $visible={
              equivalents
                .filter((equivalent) => equivalent.category === category.id)
                .find((equivalent) => !equivalent.default) && !category.list
            }>
            <Checkbox
              name='displayAll'
              checked={displayAll}
              onChange={() => {
                setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                track(category.name, 'Voir tous', displayAll ? 'faux' : 'vrai')
              }}>
              Voir {category.gender === 'f' ? 'toutes' : 'tous'} les{' '}
              {formatName(category.equivalent, 2) || 'équivalents'}
            </Checkbox>
          </Checkboxes>
        </Top>
        {category.list ? (
          <List items={equivalentsOfCategory} max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value} />
        ) : (
          <>
            <BarChart equivalents={equivalentsOfCategory} category={category} />
            {![2, 3, 8].includes(category.id) && <CategoryLegend />}
          </>
        )}
        <Bottom category={category} />
      </CategoryWrapper>
    </>
  )
}
