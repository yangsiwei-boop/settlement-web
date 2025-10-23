import axios from 'axios'
import { showToast } from 'vant'

// 创建axios实例
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，比如添加token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const res = response.data
        // 如果返回状态码不是200，判断为错误
        if (res.code !== 200) {
            showToast({
                message: res.msg || '请求错误',
                position: 'top'
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        }
        return res
    },
    (error) => {
        showToast({
            message: '网络错误，请检查网络连接',
            position: 'top'
        })
        return Promise.reject(error)
    }
)

export default request
