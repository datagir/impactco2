import { useContext, useMemo } from 'react'
import { Equivalent } from 'types/equivalent'
import { formatName, formatNumber, formatTotalByKm, formatUsage } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Carpool from 'components/transport/Carpool'
import TransportContext from 'components/transport/TransportProvider'

// C'est un peu austère, déso
export default function useTransportations(itineraries: Record<string, number> | undefined) {
  const { equivalents, categories } = useContext(DataContext)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TODO
  const { km, displayAll, carpool } = useContext<{ km: number; displayAll: boolean; carpool: number }>(TransportContext)

  const transportations = useMemo(
    () =>
      itineraries
        ? equivalents
            .filter((equivalent) => equivalent.category === 4)
            .filter((equivalent) => (equivalent.type ? itineraries[equivalent.type] : km))
            .filter((equivalent) => equivalent.default || displayAll)
            .reduce(
              (acc, cur) =>
                cur.carpool ? [...acc, cur, { ...cur, id: cur.slug + '_nocarpool', carpool: false }] : [...acc, cur],
              [] as Equivalent[]
            )
            .filter((equivalent) => carpool || !equivalent.carpool)
            .filter(
              (equivalent) =>
                // Display all transportations
                displayAll ||
                // No display indicator at all
                !equivalent.display ||
                // Empty display indicator
                (!equivalent.display.min && !equivalent.display.max) ||
                //Only max
                (!equivalent.display.min &&
                  equivalent.display.max >= (equivalent.type ? itineraries[equivalent.type] : km)) ||
                //Only min
                (!equivalent.display.max &&
                  equivalent.display.min <= (equivalent.type ? itineraries[equivalent.type] : km)) ||
                //Both min and max
                (equivalent.display.min <= (equivalent.type ? itineraries[equivalent.type] : km) &&
                  equivalent.display.max >= (equivalent.type ? itineraries[equivalent.type] : km))
            )
            .map((equivalent) => ({
              id: `${equivalent.id || equivalent.slug}`,
              title: `${formatName(equivalent.name, 1, true)}`,
              subtitle: formatName(
                equivalent?.ecvs
                  ? `(${equivalent?.ecvs?.find((ecv) => ecv.max > (equivalent.type ? itineraries[equivalent.type] : km))
                      ?.subtitle})`
                  : ((displayAll || equivalent.name === 'Voiture') && equivalent.subtitle
                      ? `(${equivalent.subtitle})`
                      : '') +
                      (itineraries ? ` - ${formatNumber(equivalent.type ? itineraries[equivalent.type] : km)} km` : '')
              ),
              emoji: equivalent.emoji,
              secondEmoji: equivalent.secondEmoji,
              value:
                formatTotalByKm(equivalent, equivalent.type ? itineraries[equivalent.type] : km) /
                (equivalent.carpool && carpool ? carpool : 1),
              usage:
                (formatUsage(equivalent) * (equivalent.type ? itineraries[equivalent.type] : km)) /
                (equivalent.carpool && carpool ? carpool : 1),
              component: equivalent.carpool && <Carpool />,
              to: `/${categories.find((category) => category.id === equivalent.category)?.slug}/${equivalent.slug}`,
              onClick: () =>
                window?.please?.track(['trackEvent', 'Interaction', 'Navigation via graph categorie', equivalent.slug]),
            }))
            .sort((a, b) => (a.value > b.value ? 1 : -1))
        : [],
    [categories, equivalents, km, displayAll, carpool, itineraries]
  )

  return transportations
}
