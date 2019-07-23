import Cookies from 'js-cookie'
import { SET_CURRENT_USER, AUTHENTICATE } from 'modules/actions/types'
import { UserInfo } from 'modules/reducers/auth'

export const authenticateAction = (auth: boolean) => {
  return {
    type: AUTHENTICATE as typeof AUTHENTICATE,
    payload: auth
  }
}

export const setCurrentUserAction = (user: UserInfo | {}) => {
  return {
    type: SET_CURRENT_USER as typeof SET_CURRENT_USER,
    payload: user
  }
}

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
    dispatch(setCurrentUserAction({}))

    Cookies.remove('mywebsite')
    resolve({})
  })

export type UpdateAuthAction = ReturnType<typeof authenticateAction>
export type UpdateCurrentUserAction = ReturnType<typeof setCurrentUserAction>
