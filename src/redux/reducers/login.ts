import { LOGIN_RESPONSE, LOGIN_RECEIVE, Login_ACTION } from '../constants'

export interface LoginState {
  count: number,
  data: object | null,
  isLogin: boolean
}

export const initialState = {
  count: 1,
  data: null,
  isLogin: false
}

export default function login(state: LoginState = initialState, action: Login_ACTION): LoginState {
  switch (action.type) {
    case LOGIN_RESPONSE:
      return state
    case LOGIN_RECEIVE:
      return {
        ...state,
        isLogin: true
      }
    default:
      return state
  }
}