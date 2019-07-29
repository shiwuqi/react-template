import { LOGIN_RESPONSE, LOGIN_RECEIVE } from '../constants'

const initialState = {
  count: 1,
  data: '',
  isLogin: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_RESPONSE':
      return state
    case 'LOGIN_RECEIVE':
      return {
        ...state,
        isLogin: true
      }
    default:
      return state
  }
}