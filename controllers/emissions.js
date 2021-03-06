const router = require('express').Router()
const { getEmissionsData, createPerCapitaData } = require('../utils/dataRead')

router.get('/', async (req, res) => {
  const data = await getEmissionsData()
  res.json(data)
})

router.get('/countryOrAreaKeys', async (req, res) => {
  const data = await getEmissionsData()
  const keys = data.map(entry => {
    return {
      key: entry.key,
      countryOrArea: entry.countryOrArea
    }
  })
  res.json(keys)
})

router.get('/:key', async (req, res) => {
  const key = req.params.key
  if (!key) {
    res.status(400).json({ error: 'Missing key' })
  }
  const data = await getEmissionsData()
  const entry = data.find(entry => entry.key === key)
  if (entry) {
    res.json(entry)
  } else {
    res.status(404).json({ error: 'No country or area matching key' })
  }
})

router.get('/perCapita/:key', async (req, res) => {
  try {
    const key = req.params.key
    if (!key) {
      res.status(400).json({ error: 'Missing key' })
    }
    const entry = await createPerCapitaData(key)
    if (entry) {
      res.json(entry)
    } else {
      res.status(404).json({ error: 'No country or area matching key' })
    }
  } catch (e) {
    res.status(500).json({ error: 'Could not complete request' })
  }
})

module.exports = router
