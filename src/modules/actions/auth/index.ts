import Cookies from 'js-cookie'
import { createAction } from '@reduxjs/toolkit'
import { SET_CURRENT_USER, AUTHENTICATE } from 'constants/types'
import { UserInfo } from 'modules/reducers/auth'

export const authenticateAction = createAction<boolean, AUTHENTICATE>(
  AUTHENTICATE
)

export const setCurrentUserAction = createAction<
  UserInfo | undefined,
  SET_CURRENT_USER
>(SET_CURRENT_USER)

export const establishCurrentUser = () => dispatch =>
  new Promise(resolve => {
    const userFromCookie = Cookies.getJSON('mywebsite')

    if (userFromCookie) {
      dispatch(setCurrentUserAction(userFromCookie))
      dispatch(authenticateAction(true))

      Cookies.set('mywebsite', userFromCookie)

      resolve(userFromCookie)
    } else {
      resolve({})
    }
  })

export const loginUser = (email: string, password: string) => dispatch =>
  new Promise(resolve => {
    const user = {
      email,
      password,
      name: 'Awesome User'
    }

    dispatch(setCurrentUserAction(user))
    dispatch(authenticateAction(true))
    Cookies.set('mywebsite', user)

    resolve(user)
  })

export const logoutUser = () => dispatch =>
  new Promise(resolve => {
    dispatch(authenticateAction(false))
    dispatch(setCurrentUserAction())

    Cookies.remove('mywebsite')
    resolve({})
  })

export type AuthenticateAction = ReturnType<typeof authenticateAction>
export type SetCurrentUserAction = ReturnType<typeof setCurrentUserAction>
