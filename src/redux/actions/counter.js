import request from '../../utils/request'
import Cookies from 'js-cookie'
import { message } from 'antd'
import history from '../../utils/history'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


export function increment(val) {
  return {
    type: INCREMENT,
    val
  }
}

export function decrement(val) {
  return {
    type: DECREMENT,
    val
  }
}

export function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export function receivePosts(data, category) {
  return {
    type: RECEIVE_POSTS,
    data,
    category
  }
}

export function requestData(funcName, url, params, method) {
  console.log(funcName, url, params, method)
  return async dispatch => {
    dispatch(requestPosts(funcName))
    let res = await request(url, params, method)
    if (res.status === '00') {
      Cookies.set('token', res.data.token)
      history.replace({ pathname: '/home/feed', query: { id: 'login' } })
      dispatch(receivePosts())
    } else {
      message.error(res.log)
    }
  }
}