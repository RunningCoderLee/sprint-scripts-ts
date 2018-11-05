import axios from 'axios'

const service = axios.create({
  baseURL: '//dp.qa.medlinker.com/api',
  timeout: 50000,
})

// Add a request interceptor
service.interceptors.request.use(config => config, error => Promise.reject(error))

// Add a response interceptor
service.interceptors.response.use(response => response, error => Promise.reject(error))

export default service
