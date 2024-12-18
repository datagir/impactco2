'use client'

import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react'
import useAllParams from 'src/providers/stores/useAllParams'
import { Category as CategoryType } from 'types/category'
import Shareable from 'components/shareable/Shareable'
import { overScreenCategoryValues } from 'components/shareable/overScreens/Values'
import CategorySimulator from './CategorySimulator'

const Category = ({
  category,
  simulator,
}: {
  category: CategoryType
  simulator?: ReactNode
  displayAll?: boolean
  setDisplayAll?: (value: boolean) => void
}) => {
  const allParams = useAllParams()

  const overScreens = useMemo(() => overScreenCategoryValues(category), [category])

  const params = useMemo<{ displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }>(() => {
    // @ts-expect-error: managed in hook
    return allParams[category.slug]
  }, [allParams, category])

  return (
    <Shareable slug={category.slug} tracking={category.name} overScreens={overScreens}>
      {simulator ||
        (category.equivalents && (
          <CategorySimulator
            tracking={category.name}
            equivalents={
              !params || params.displayAll
                ? category.equivalents
                : category.equivalents.filter((equivalent) => equivalent.default)
            }
            displayAll={params ? params.displayAll : undefined}
            setDisplayAll={params ? params.setDisplayAll : undefined}
            moreText={category.more}
          />
        ))}
    </Shareable>
  )
}

export default Category
