const cron = require('node-cron')
const {
  updateEmissionsData,
  updatePopulationData
} = require('./dataWrite')

const update = () => {
  getNewPopulationData()
  getNewEmissionsData()
}

// Fetch population data from API and convert to json file into /json
const getNewPopulationData = async () => {
  try {
    await updatePopulationData()
  } catch (e) {
    console.log(e)
  }
}

// Fetch emissions data from API and convert to json file into /json
const getNewEmissionsData = async () => {
  try {
    await updateEmissionsData()
  } catch (e) {
    console.log(e)
  }
}

// Cron job for keeping data up to date
const task = cron.schedule('23 0-23 * * *', () => {
  console.log('Running cron job')
  update()
}, { scheduled: false })

const startCronUpdater = () => {
  task.start()
}

const stopCronUpdater = () => {
  task.stop()
}

module.exports = {
  startCronUpdater,
  stopCronUpdater,
  getNewEmissionsData,
  getNewPopulationData
}