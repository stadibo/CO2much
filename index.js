const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
// const cron = require('node-cron')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api/', (req, res) => {
  res.send('Hello from the API!')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})