import axios from 'axios'

export default axios.create({
  baseURL: 'https://35.198.220.54/api/',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
