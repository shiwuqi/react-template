import { fetch } from 'whatwg-fetch'
import 'es6-promise'
import Cookies from 'js-cookie'
import history from './history'
import '../mock'

const DOMAIN = process.env.DOMAIN

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errorText = codeMessage[response.status] || response.statusText
  const error = new Error(errorText)
  error.name = response.status
  error.response = response
  throw error
}

function request(url, options, method) {
  options = { ...options, token: Cookies.get('token') || '' }
  let newUrl = DOMAIN + url
  method = !method ? 'get' : method.toUpperCase()
  let newOptions = {}
  if (method === 'POST') {
    let ret = ''
    for (var it in options) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(options[it]) + '&'
    }
    if (!(newOptions.body instanceof FormData)) {
      newOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: ret,
        method: method
      }
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...options
      };
    }
  } else {
    let params = []
    Object.keys(options).forEach(key => {
      params.push(key + '=' + options[key])
      if (newUrl.search(/\?/) === -1) {
        newUrl += '?' + params.join('&')
      } else {
        newUrl += '&' + params.join('&')
      }
    })
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(newUrl, newOptions)
      const data = checkStatus(response, method)
      if (newOptions.method === 'DELETE' || data.status === 204) {
        const res = data.text()
        if (res.status === '02') {
          history.replace('/')
          return
        }
        resolve(res)
      } else {
        const res = await data.json()
        if (res.status === '02') {
          history.replace('/')
          return
        }
        resolve(res)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default request