const fs = require('fs')
const util = require('util')
const parser = require('xml2json')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const parseEmmissionsData = async (path) => {
  let rawData = await readFile(path, 'utf8')
  let json = JSON.parse(parser.toJson(rawData))
  let object = json.Root.data.record.map(obj => {
    let entry = obj.field
    let key = entry[0].key
    let name = entry[0].$t
    let year = entry[2].$t
    let co2Emissions = entry[3].$t
    return {
      key: key,
      countryOrArea: name,
      year: year,
      co2EmissionsKT: co2Emissions ? co2Emissions : ""
    }
  }).reduce((entries, value) => {
    const existingEntry = entries.find(e => e.key === value.key)
    if (!existingEntry) {
      const countryData = {
        key: value.key,
        countryOrArea: value.countryOrArea,
        co2EmissionsData: [
          {
            year: value.year,
            co2EmissionsKT: value.co2EmissionsKT
          }
        ]
      }
      return entries.concat(countryData)
    } else {
      existingEntry.co2EmissionsData.push({
        year: value.year,
        co2EmissionsKT: value.co2EmissionsKT
      })
    }
    return entries
  }, [])

  return object
}

const parsePopulationData = async (path) => {
  let rawData = await readFile(path, 'utf8')
  let json = JSON.parse(parser.toJson(rawData))
  let object = json.Root.data.record.map(obj => {
    let entry = obj.field
    let key = entry[0].key
    let name = entry[0].$t
    let year = entry[2].$t
    let populationSize = entry[3].$t
    return {
      key: key,
      countryOrArea: name,
      year: year,
      populationSize: populationSize ? populationSize : ""
    }
  }).reduce((entries, value) => {
    const existingEntry = entries.find(e => e.key === value.key)
    if (!existingEntry) {
      const countryData = {
        key: value.key,
        countryOrArea: value.countryOrArea,
        populationData: [
          {
            year: value.year,
            populationSize: value.populationSize
          }
        ]
      }
      return entries.concat(countryData)
    } else {
      existingEntry.populationData.push({
        year: value.year,
        populationSize: value.populationSize
      })
    }

    return entries
  }, [])

  return object
}

module.exports = {
  parseEmmissionsData,
  parsePopulationData
}