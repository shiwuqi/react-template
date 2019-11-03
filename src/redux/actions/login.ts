import request from '../../utils/request'
import { message } from 'antd'
import { LOGIN_RESPONSE, LOGIN_RECEIVE, Login_ACTION } from '../constants'
import { Dispatch } from 'redux'

export interface LoginResponse {
  type: typeof LOGIN_RESPONSE;
}

export function LoginResponse(): LoginResponse {
  return {
    type: LOGIN_RESPONSE
  }
}

export interface LoginReceive {
  type: typeof LOGIN_RECEIVE;
  data: any;
}

export function LoginReceive(data: any): LoginReceive {
  return {
    type: LOGIN_RECEIVE,
    data
  }
}

export function loginIn(url: string, params: object, method: string) {
  return async (dispatch: Dispatch<Login_ACTION>) => {
    try {
      dispatch({
        type: LOGIN_RESPONSE
      })
      const res = await request(url, params, method)
      if (res.code === 200) {
        message.success(res.message)
        localStorage.setItem("token", res.data)
        dispatch({
          type: LOGIN_RECEIVE,
          data: res
        })
      } else {
        message.error(res.message)
      }
      return res;
    } catch (e) {
      message.error("登录失败")
    }
  }
}