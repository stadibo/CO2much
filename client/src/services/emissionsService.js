import axios from 'axios'

const url = '/api/emissions'

const getAll = async () => {
  const response = await axios.get(`${url}/`)
  return response.data
}

const getEmissionsKeys = async () => {
  const response = await axios.get(`${url}/countryOrAreaKeys`)
  return response.data
}

const getCountryEmissionsData = async (key) => {
  const response = await axios.get(`${url}/${key}`)
  return response.data
}

const getPerCapitaEmissionsData = async (key) => {
  const response = await axios.get(`${url}/perCapita/${key}`)
  return response.data
}

export { getAll, getEmissionsKeys, getCountryEmissionsData, getPerCapitaEmissionsData }