import { SET_CURRENT_PROFILE } from 'constants/types'
import { createAction } from '@reduxjs/toolkit'
import { Profile } from 'modules/reducers/profile'

export const setCurrentProfileAction = createAction<
  Profile | undefined,
  SET_CURRENT_PROFILE
>(SET_CURRENT_PROFILE)

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

      dispatch(setCurrentProfileAction(profile))
      resolve(profile)
    }, 200)
  })

export const removeCurrentProfile = () => dispatch =>
  new Promise(resolve => {
    dispatch(setCurrentProfileAction())

    resolve({})
  })

export type SetCurrentProfileAction = ReturnType<typeof setCurrentProfileAction>
