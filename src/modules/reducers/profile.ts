import { produce } from 'immer'
import { SET_CURRENT_PROFILE } from 'modules/actions/types'
import { createReducer } from 'utils/createReducer'
import { UpdateCurrentProfileAction } from 'modules/actions/profile'

export interface Profile {
  id: number
  name: string
  image: string
}

export interface ProfileState {
  currentProfile: Profile | null
}

type Types = typeof SET_CURRENT_PROFILE

type Actions = UpdateCurrentProfileAction

export default createReducer<ProfileState, Types, Actions>(
  {
    currentProfile: null,
  },
  {
    [SET_CURRENT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.currentProfile = action.payload
      }),
  }
)
