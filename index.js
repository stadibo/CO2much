const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const { startCronUpdater } = require('./utils/dataUpdate')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('./client/build'))

// Routes for API
const populationRouter = require('./controllers/population')
const emissionsRouter = require('./controllers/emissions')

const apiUrl = '/api'
app.use(`${apiUrl}/population`, populationRouter)
app.use(`${apiUrl}/emissions`, emissionsRouter)

// Hello World!
app.get('/api/', (req, res) => {
  res.send('Hello from the API!')
})

const PORT = process.env.PORT || 4000

const server = http.createServer(app)

server.listen(PORT, () => {
  startCronUpdater()
  console.log(`Listening on port ${PORT}...`)
})