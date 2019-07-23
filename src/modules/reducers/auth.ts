import { produce } from 'immer'

import { createReducer } from 'utils/createReducer'
import { UpdateAuthAction, UpdateCurrentUserAction } from 'modules/actions/auth'
import { AUTHENTICATE, SET_CURRENT_USER } from 'modules/actions/types'

type Actions = UpdateAuthAction & UpdateCurrentUserAction

type Types = typeof AUTHENTICATE | typeof SET_CURRENT_USER

export interface UserInfo {
  email: string
  password: string
  name: string
}

export interface AuthState {
  readonly isAuthenticated: boolean
  readonly currentUser: UserInfo | {}
}

export default createReducer<AuthState, Types, Actions>(
  {
    isAuthenticated: false,
    currentUser: {}
  },
  {
    [AUTHENTICATE]: (state, action: UpdateAuthAction) =>
      produce(state, draft => {
        draft.isAuthenticated = action.payload
      }),
    [SET_CURRENT_USER]: (state, action: UpdateCurrentUserAction) =>
      produce(state, draft => {
        draft.currentUser = action.payload
      })
  }
)
