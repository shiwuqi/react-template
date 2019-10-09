import { combineReducers } from 'redux'
import login, { LoginState } from './login'
import { Login_ACTION } from '../constants'

export interface RootState extends LoginState {}

const rootReducers = combineReducers<RootState, Login_ACTION>({ login } as any)

export default rootReducers