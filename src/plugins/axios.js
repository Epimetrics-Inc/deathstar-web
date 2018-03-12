import axios from 'axios'

export default axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 600000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
