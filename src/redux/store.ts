import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducers, { RootState } from './reducers'

// redux注入操作
const middleware = [thunk]

const store = createStore<RootState, any, any, any>(rootReducers, applyMiddleware(...middleware))

export default store