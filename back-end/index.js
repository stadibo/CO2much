const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const cron = require('node-cron')

// Middleware
app.use(cors())
app.use(bodyParser.json())

app.get('/api/', (req, res) => {
  res.send('Hello from the API!')
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})