const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const config = require('../config/config')
const { getNewEmissionsData, getNewPopulationData } = require('./dataUpdate')

const getPopulationData = async () => {
  const path = `${config.jsonDir}/${config.populationJSON}`
  try {
    if (!fs.existsSync(path)) {
      await getNewPopulationData()
    }
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return error
  }
}

const getEmissionsData = async () => {
  const path = `${config.jsonDir}/${config.emissionsJSON}`
  try {
    if (!fs.existsSync(path)) {
      await getNewEmissionsData()
    }
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return error
  }
}

const createPerCapitaData = async (key) => {
  const emiData = await getEmissionsData()
  const popData = await getPopulationData()
  const countryEmissions = emiData.find(entry => entry.key === key)
  const countryPopulation = popData.find(entry => entry.key === key)

  if (emiData.key === popData.key) {
    let key = countryEmissions.key
    let countryOrArea = countryEmissions.countryOrArea
    let co2EmissionsData = countryEmissions.co2EmissionsData
    let co2PerCapita = []
    co2EmissionsData.forEach((entry) => {
      let population = countryPopulation.populationData.find(p => p.year === entry.year)
      let perCapitaEmissions = population.populationSize ? entry.co2EmissionsKT / population.populationSize * 1000 : 0
      co2PerCapita.push({ year: entry.year, perCapitaEmissionsT: perCapitaEmissions })
    })

    return {
      key: key,
      countryOrArea: countryOrArea,
      co2PerCapita: co2PerCapita
    }

  } else {
    return
  }
}

module.exports = {
  getEmissionsData,
  getPopulationData,
  createPerCapitaData
}