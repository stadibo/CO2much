import axios from 'axios'

const url = '/api'

const getApi = async () => {
  const response = await axios.get(`${url}/`)
  return response.data
}

export { getApi }