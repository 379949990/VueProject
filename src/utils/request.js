import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: isDev ? '/api' : 'http://sh2007.wudaxun.top/api'
})

export default request
