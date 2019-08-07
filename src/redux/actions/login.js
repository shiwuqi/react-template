import request from '../../utils/request'
import Cookies from 'js-cookie'
import { message } from 'antd'
import history from '../../utils/history'
import { LOGIN_RESPONSE, LOGIN_RECEIVE } from '../constants'


export function loginIn(url, params, method) {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN_RESPONSE
      })
      const res = await request(url, params, method)
      if (res.status === '00') {
        Cookies.set('token', res.data.token)
        history.replace({ pathname: '/page/feed', query: { id: 'login' } })
        dispatch({
          type: LOGIN_RECEIVE,
          data: res
        })
      } else {
        message.error(res.log)
      }
    } catch (e) {
      message.error("登录失败")
    }
  }
}