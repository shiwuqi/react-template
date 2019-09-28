import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'

// redux注入操作
const middleware = [thunk]

let store = createStore<any, any, any, any>(rootReducers, applyMiddleware(...middleware))

export default store