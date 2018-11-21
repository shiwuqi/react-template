import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import todoApp from './reducers'

// redux注入操作
const middleware = [thunk]

let store = createStore(todoApp, applyMiddleware(...middleware))

export default store