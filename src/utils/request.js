import { fetch } from 'whatwg-fetch'
import 'es6-promise'
import Cookies from 'js-cookie'
import history from './history'
import '../mock'

const DOMAIN = process.env.DOMAIN

function request(url, options, method) {
  const token = Cookies.get('token') || ''
  url = DOMAIN + url
  method = !method ? 'GET' : method.toUpperCase()
  let newOptions = {}
  if (method === 'POST') {
    newOptions = {
      headers: {
        'content-type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(options),
      method,
    }
  } else {
    newOptions = {
      headers: {
        token,
      },
    }
    if (!!options) {
      let params = []
      Object.keys(options).forEach(key => {
        params.push(key + '=' + options[key])
        if (newUrl.search(/\?/) === -1) {
          url += '?' + params.join('&')
        } else {
          url += '&' + params.join('&')
        }
      })
    }
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, newOptions)
      const res = newOptions.method === 'DELETE' ? response.text() : response.json()
      if (res.status === '02') {
        history.replace('/')
        return
      }
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

export default request