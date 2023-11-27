import formatName from './formatName'

export function formatNumber(value, noformat) {
  if (!value) {
    return 0
  }
  let tempTotal = value > 0.0000001 ? Math.round(value * 10000000) / 10000000 : value
  tempTotal = tempTotal > 0.000001 ? Math.round(tempTotal * 1000000) / 1000000 : tempTotal
  tempTotal = tempTotal > 0.00001 ? Math.round(tempTotal * 100000) / 100000 : tempTotal
  tempTotal = tempTotal > 0.0001 ? Math.round(tempTotal * 10000) / 10000 : tempTotal
  tempTotal = tempTotal > 0.001 ? Math.round(tempTotal * 1000) / 1000 : tempTotal
  tempTotal = tempTotal > 0.01 ? Math.round(tempTotal * 100) / 100 : tempTotal
  tempTotal = tempTotal > 0.1 ? Math.round(tempTotal * 10) / 10 : tempTotal
  tempTotal = tempTotal > 5 ? Math.round(tempTotal * 1) / 1 : tempTotal
  return noformat ? tempTotal : tempTotal.toLocaleString('fr-fr', { maximumFractionDigits: 11 })
}

export function formatTotal(equivalent, years, end) {
  let total =
    equivalent.total || equivalent.total === 0
      ? equivalent.total
      : equivalent.ecv.reduce((acc, cur) => acc + cur.value, 0)

  if (years !== 0 && equivalent.usage) {
    total += (years || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }

  if (end) {
    total += equivalent.end
  }
  return total
}
export function formatTotalByMultiplier(equivalent) {
  let total =
    equivalent.total || equivalent.total === 0
      ? equivalent.total
      : equivalent.ecv.reduce((acc, cur) => acc + cur.value, 0)

  if (equivalent.usage) {
    total += equivalent.usage.defaultyears * equivalent.usage.peryear
  }

  return equivalent.multiplier ? total * equivalent.multiplier : total
}
export function formatTotalByKm(equivalent, km) {
  return (
    (equivalent.total || equivalent.total === 0
      ? equivalent.total
      : (equivalent?.ecvs?.find((ecv) => ecv.max > km)?.ecv || equivalent.ecv).reduce(
          (acc, cur) => acc + cur.value,
          0
        )) * km
  )
}
export function formatConstruction(equivalent) {
  return equivalent.total || equivalent.total === 0
    ? equivalent.total
    : equivalent.ecv.reduce((acc, cur) => acc + ([1, 2, 3, 4, 5].includes(cur.id) ? cur.value : 0), 0)
}
export function formatUsage(equivalent, years) {
  if (equivalent.usage) {
    return (years || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }
  if (equivalent?.ecv?.find((ecv) => [6, 7, 8].includes(ecv.id))) {
    const usage = equivalent.ecv.reduce((acc, cur) => acc + ([6, 7, 8].includes(cur.id) ? cur.value : 0), 0)
    return usage
  }
  return 0
}

export function fullSentenceFormat(obj) {
  return (
    formatNumber(obj.weight / formatTotalByMultiplier(obj.equivalent)) +
    ' ' +
    formatName(
      (obj.equivalent.prefix || '') + obj.equivalent.name,
      obj.weight / formatTotalByMultiplier(obj.equivalent)
    )
  )
}
