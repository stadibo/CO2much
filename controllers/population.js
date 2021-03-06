const router = require('express').Router()
const { getPopulationData } = require('../utils/dataRead')

router.get('/', async (req, res) => {
  const data = await getPopulationData()
  res.json(data)
})

router.get('/countryOrAreaKeys', async (req, res) => {
  const data = await getPopulationData()
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
  const data = await getPopulationData()
  const entry = data.find(entry => entry.key === key)
  if (entry) {
    res.json(entry)
  } else {
    res.status(404).json({ error: 'No country or area matching key' })
  }
})

module.exports = router