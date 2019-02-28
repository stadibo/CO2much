// Pond
import { TimeSeries, Index } from "pondjs"

const createBaseEmissionsSeries = (data) => {
  // Create pond js compatible time series
  const series = new TimeSeries({
    name: data.countryOrArea,
    columns: ["index", "CO2_emissions"],
    points: data.co2EmissionsData.map((entry) => {
      let value = parseFloat(entry.co2EmissionsKT)
      if (!value) {
        value = 0
      }
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
  // Create pond js compatible time series
  const series = new TimeSeries({
    name: data.countryOrArea,
    columns: ["index", "CO2_perCapita"],
    points: data.co2PerCapita.map((entry) => {
      let value = parseFloat(entry.perCapitaEmissionsT)
      if (!value) {
        value = 0
      }
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