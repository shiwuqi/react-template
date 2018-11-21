import { INCREMENT, DECREMENT, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/counter'

const initialState = {
  count: 1,
  data: '',
  isLogin: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.val
      }
    case 'DECREMENT':
      return {
        count: state.count - action.val
      }
    case 'REQUEST_POSTS':
      return state
    case 'RECEIVE_POSTS':
      return {
        ...state,
        isLogin: true
      }
    default:
      return state
  }
}