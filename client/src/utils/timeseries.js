// Pond
import { TimeSeries, Index } from "pondjs"

const createBaseEmissionsSeries = (data) => {
  console.log(data.co2EmissionsData)
  const series = new TimeSeries({
    name: data.countryOrArea,
    columns: ["index", "CO2_emissions"],
    points: data.co2EmissionsData.map((entry) => {
      // console.log(Index.getYearlyIndexString(new Date(entry.year)))
      let value = parseFloat(entry.co2EmissionsKT)
      if (!value) {
        value = 0
      }
      // console.log(value)
      return [
        Index.getYearlyIndexString(new Date(entry.year)),
        value
      ]
    }
    )
  })
  return series
}

const createPerCapitaEmissionsSeries = (data) => {
  console.log(data.co2PerCapita)
  const series = new TimeSeries({
    name: data.countryOrArea,
    columns: ["index", "CO2_perCapita"],
    points: data.co2PerCapita.map((entry) => {
      console.log(Index.getYearlyIndexString(new Date(entry.year)))
      let value = parseFloat(entry.perCapitaEmissionsT)
      if (!value) {
        value = 0
      }
      console.log(value)
      return [
        Index.getYearlyIndexString(new Date(entry.year)),
        value
      ]
    }
    )
  })
  return series
}

export {
  createBaseEmissionsSeries,
  createPerCapitaEmissionsSeries
}