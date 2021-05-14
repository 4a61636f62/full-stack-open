import loginService from '../services/login'

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.data
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch({
      type: LOGIN_USER,
      data: user
    })
    window.localStorage.setItem(
      'User', JSON.stringify(user)
    )
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: LOGOUT_USER
    })
  }
}

export const loadUser = () => {
  return (dispatch) => {
    const userJSON = window.localStorage.getItem('User')
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON)
        dispatch({
          type: LOGIN_USER,
          data: user
        })
      } catch (error) {
        dispatch({
          type: LOGOUT_USER
        })
      }
    }
  }
}

export default userReducer
