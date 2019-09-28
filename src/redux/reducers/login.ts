import { LOGIN_RESPONSE, LOGIN_RECEIVE, Login_ACTION } from '../constants'

export const initialState = {
  count: 1,
  data: null,
  isLogin: false
}

export interface LoginState {
  count: number,
  data: object | null,
  isLogin: boolean
}

export default function login(state = initialState, action: Login_ACTION): any {
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