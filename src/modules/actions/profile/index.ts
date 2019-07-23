import { SET_CURRENT_PROFILE } from '../types'
import { Profile } from 'modules/reducers/profile'

export const setCurrentProfile = (profile: Profile | null) => {
  return {
    type: SET_CURRENT_PROFILE as typeof SET_CURRENT_PROFILE,
    payload: profile
  }
}

export const getCurrentProfile = (id: number) => dispatch =>
  new Promise(resolve => {
    setTimeout(() => {
      let profile: Profile

      if (id === 1) {
        profile = {
          id,
          name: 'Pekka Rinne',
          image: 'http://xxxxx.coms'
        }
      } else {
        profile = {
          id,
          name: 'Viktor Arvidsson',
          image: 'http://xxxxx.coms'
        }
      }

      dispatch(setCurrentProfile(profile))

      resolve(profile)
    }, 200)
  })

export const removeCurrentProfile = () => dispatch =>
  new Promise(resolve => {
    dispatch(setCurrentProfile(null))

    resolve({})
  })

export type UpdateCurrentProfileAction = ReturnType<typeof setCurrentProfile>
