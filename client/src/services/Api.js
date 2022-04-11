import axios from 'axios'
const ck = require('ckey')

export default () => {
  return axios.create({
    baseURL: ck.SERVER_HOST_PORT || 'http://localhost:8080/'
  })
}
