import { produce } from 'immer'

import { createReducer } from 'utils/createReducer'
import { AuthenticateAction, SetCurrentUserAction } from 'modules/actions/auth'
import { AUTHENTICATE, SET_CURRENT_USER } from 'constants/types'

type Actions = AuthenticateAction | SetCurrentUserAction
type Types = AUTHENTICATE | SET_CURRENT_USER

export interface UserInfo {
  email: string
  password: string
  name: string
}

export interface AuthState {
  readonly isAuthenticated: boolean
  readonly currentUser?: UserInfo
}

export default createReducer<AuthState, Types, Actions>(
  {
    isAuthenticated: false
  },
  {
    [AUTHENTICATE]: (state, action) =>
      produce(state, draft => {
        draft.isAuthenticated = action.payload
      }),
    [SET_CURRENT_USER]: (state, action) =>
      produce(state, draft => {
        draft.currentUser = action.payload
      })
  }
)
