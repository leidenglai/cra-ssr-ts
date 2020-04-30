import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import profileReducer from './profile'
import authReducer from './auth'

const rootReducers = history =>
  combineReducers({
    router: connectRouter(history),
    profile: profileReducer,
    auth: authReducer
  })

export interface AppState extends ReturnType<ReturnType<typeof rootReducers>> {}
export default rootReducers
