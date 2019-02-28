import axios from 'axios'

const url = '/api/population'

const getAll = async () => {
  const response = await axios.get(`${url}/`)
  return response.data
}

const getKeys = async () => {
  const response = await axios.get(`${url}/countryOrAreaKeys`)
  return response.data
}

const getCountryData = async (key) => {
  const response = await axios.get(`${url}/${key}`)
  return response.data
}

export { getAll, getKeys, getCountryData }