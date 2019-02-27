// ### Fetching ###

// Population
const populationSource = 'http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=xml'
const populationTempDir = './tmpPopulation'
const populationZipName = 'population.zip'
const populationDataDir = './dataPopulation'

// Emissions
const emissionsSource = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=xml'
const emissionsTempDir = './tmpEmissions'
const emissionsZipName = 'emissions.zip'
const emissionsDataDir = './dataEmissions'


// ### Writing ###
const populationXML = `API_SP.POP.TOTL_DS2_en_xml_v2_10473997.xml`
const emissionsXML = `API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10474794.xml`
const populationJSON = 'population.json'
const emissionsJSON = 'co2Emissions.json'
const jsonDir = './json'

module.exports = {
  populationSource,
  populationTempDir,
  populationZipName,
  populationDataDir,
  emissionsSource,
  emissionsTempDir,
  emissionsZipName,
  emissionsDataDir,
  populationXML,
  emissionsXML,
  populationJSON,
  emissionsJSON,
  jsonDir
}