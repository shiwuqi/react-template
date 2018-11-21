import { combineReducers } from 'redux'
import counter from './counter'

const todoApp = combineReducers({
  counter
})

export default todoApp