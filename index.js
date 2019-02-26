const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const cron = require('node-cron')
const XMLparser = require('./utils/parser')
const download = require('./utils/download').download

// File handling
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('./client/build'))


// Data fetching functions

const updatePopulationData = async () => {
  const xmlFile = './data/API_SP.POP.TOTL_DS2_en_xml_v2_10473997.xml'
  const data = await XMLparser.parsePopulationData(xmlFile)
  await writeFile('./json/populationData.json', JSON.stringify(data, null, 2), { flag: 'w' })
}

const updateEmissionsData = async () => {
  const xmlFile = './data/API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10474794.xml'
  const data = await XMLparser.parseEmmissionsData(xmlFile)
  await writeFile('./json/co2EmissionsData.json', JSON.stringify(data, null, 2), { flag: 'w' })
}

const fetchEmissionsData = async () => {
  const src = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=xml'
  const dir = './tmp'
  const fileName = 'emissionsData.zip'
  const outputDir = './data'
  await download(src, dir, fileName, outputDir)
}


// Routes for API

app.get('/api/', (req, res) => {
  res.send('Hello from the API!')
})

app.get('/api/population', async (req, res) => {
  let data
  try {
    data = await readFile('./json/populationData.json', 'utf8')
  } catch (error) {
    console.log(error)
    await updatePopulationData()
    data = await readFile('./json/populationData.json', 'utf8')
  }
  res.json(JSON.parse(data))
})

app.get('/api/emissions', async (req, res) => {
  fetchEmissionsData()
  let data
  try {
    data = await readFile('./json/co2EmissionsData.json', 'utf8')
  } catch (error) {
    console.log(error)
    await updateEmissionsData()
    data = await readFile('./json/co2EmissionsData.json', 'utf8')
  }
  res.json(JSON.parse(data))
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})