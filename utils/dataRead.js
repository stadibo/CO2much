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

module.exports = {
  getEmissionsData,
  getPopulationData
}