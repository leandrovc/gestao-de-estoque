import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.VUE_APP_SERVER_HOST_PORT
  })
}
