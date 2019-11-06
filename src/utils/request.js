import { fetch } from 'whatwg-fetch'
import 'es6-promise'
// import '../mock'

const DOMAIN = process.env.DOMAIN

function request(url, options, method) {
  const token = localStorage.getItem('token') || ''
  url = DOMAIN + url
  method = !method ? 'GET' : method.toUpperCase()
  let newOptions = {}
  if (method === 'POST') {
    newOptions = {
      headers: {
        'content-type': 'application/json',
        'authorization': !token ? '' : 'Bearer ' + token,
      },
      body: JSON.stringify(options),
      method,
    }
  } else {
    newOptions = {
      headers: {
        'authorization': !token ? '' : 'Bearer ' + token,
      },
    }
    if (!!options) {
      let params = []
      Object.keys(options).forEach(key => {
        params.push(key + '=' + options[key])
      })
      if (url.search(/\?/) === -1) {
        url += '?' + params.join('&')
      } else {
        url += '&' + params.join('&')
      }
    }
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, newOptions)
      if (response.status === 401) {
        localStorage.removeItem('token')
        return
      }
      const res = newOptions.method === 'DELETE' ? response.text() : response.json()
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

export default request