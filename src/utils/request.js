import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import router from '../router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  withCredentials: true,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
/* global pt */
// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (res.code === 40001) {
        MessageBox.confirm(
          '你的登陆态已失效，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          router.push({ path: '/login' })
        })
      } else if (res.code === 40002) {
        MessageBox.confirm('抱歉您没有权限登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '换个账号',
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {
            pt.logout(() => {})
            router.push({ path: '/login' })
          })
      } else {
        Message({
          message: res.errmsg || res.data,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
