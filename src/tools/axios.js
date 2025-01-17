import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  timeout: 1000,
})

instance.interceptors.request.use(function (config) {
  config.validateStatus = function (status) {
    return status < 400 // Do not throw on 3xx
  }

  return config
}, null, { synchronous: true }) // Tell axios to run function synchronously to avoid async execution delay


export default instance
