import axios from 'axios'

export default () => {
  console.log('Api.js')
  return axios.create({
    baseURL: process.env.SERVER_HOST_PORT || `http://172.20.176.251:8080/`
  })
}
