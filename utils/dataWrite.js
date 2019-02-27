const XMLparser = require('./parser')
const download = require('./download').download
const config = require('../config/config')

// File handling
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

const fetchPopulationData = async () => {
  const src = config.populationSource
  const tempDir = config.populationTempDir
  const zipName = config.populationZipName
  const outputDir = config.populationDataDir

  await download(src, tempDir, zipName, outputDir)
  console.log('population download finished')
}

const fetchEmissionsData = async () => {
  const src = config.emissionsSource
  const tempDir = config.emissionsTempDir
  const zipName = config.emissionsZipName
  const outputDir = config.emissionsDataDir

  await download(src, tempDir, zipName, outputDir)
  console.log('emissions download finished')
}

const updatePopulationData = async () => {
  await fetchPopulationData()

  const xmlFile = `${config.populationDataDir}/${config.populationXML}`
  if (fs.existsSync(xmlFile)) {
    const data = await XMLparser.parsePopulationData(xmlFile)
    const outputDir = config.jsonDir
    const jsonFileName = config.populationJSON

    if (!fs.existsSync(outputDir)) {
      await fs.mkdirSync(outputDir)
    }
    await writeFile(`${outputDir}/${jsonFileName}`, JSON.stringify(data), { flag: 'w' })
    cleanupPopulationDirectories()
  }
}

const updateEmissionsData = async () => {
  await fetchEmissionsData()

  const xmlFile = `${config.emissionsDataDir}/${config.emissionsXML}`
  if (fs.existsSync(xmlFile)) {
    const data = await XMLparser.parseEmmissionsData(xmlFile)
    const outputDir = config.jsonDir
    const jsonFileName = config.emissionsJSON

    if (!fs.existsSync(outputDir)) {
      await fs.mkdirSync(outputDir)
    }

    await writeFile(`${outputDir}/${jsonFileName}`, JSON.stringify(data), { flag: 'w' })
    cleanupEmissionsDirectories()
  }
}

const cleanupPopulationDirectories = () => {
  console.log('clean up population')
  // Remove temp dir and contents
  fs.unlinkSync(`${config.populationTempDir}/${config.populationZipName}`)
  fs.rmdirSync(config.populationTempDir)

  // Remove data dir and contents
  fs.unlinkSync(`${config.populationDataDir}/${config.populationXML}`)
  fs.rmdirSync(config.populationDataDir)
}

const cleanupEmissionsDirectories = () => {
  console.log('clean up emissions')
  // Remove temp dir and contents
  fs.unlinkSync(`${config.emissionsTempDir}/${config.emissionsZipName}`)
  fs.rmdirSync(config.emissionsTempDir)

  // Remove data dir and contents
  fs.unlinkSync(`${config.emissionsDataDir}/${config.emissionsXML}`)
  fs.rmdirSync(config.emissionsDataDir)
}

module.exports = {
  updatePopulationData,
  updateEmissionsData,
  fetchPopulationData,
  fetchEmissionsData
}