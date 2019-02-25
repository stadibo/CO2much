import axios from 'axios'

const url = 'http://localhost:3001/api'

const getApi = async () => {
  const response = await axios.get(`${url}/`)
  return response.data
}

export { getApi }