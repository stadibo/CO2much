import axios from 'axios'

const url = '/api/population'

const getAll = async () => {
  const response = await axios.get(`${url}/`)
  return response.data
}

const getPopulationKeys = async () => {
  const response = await axios.get(`${url}/countryOrAreaKeys`)
  return response.data
}

const getCountryPopulationData = async (key) => {
  const response = await axios.get(`${url}/${key}`)
  return response.data
}

export { getAll, getPopulationKeys, getCountryPopulationData }