import { combineReducers } from 'redux'

import profileReducer from './profile'
import authReducer from './auth'

const rootReducers = combineReducers({
  profile: profileReducer,
  auth: authReducer,
})

export interface AppState extends ReturnType<typeof rootReducers> {}
export default rootReducers
