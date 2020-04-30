import { produce } from 'immer'
import { SET_CURRENT_PROFILE } from 'constants/types'
import { createReducer } from 'utils/createReducer'
import { SetCurrentProfileAction } from 'modules/actions/profile'

type Types = SET_CURRENT_PROFILE
type Actions = SetCurrentProfileAction

export interface Profile {
  id: number
  name: string
  image: string
}

export interface ProfileState {
  currentProfile?: Profile
}

export default createReducer<ProfileState, Types, Actions>(
  {},
  {
    [SET_CURRENT_PROFILE]: (state, action) =>
      produce(state, draft => {
        draft.currentProfile = action.payload
      })
  }
)
