const initialState = {
  message: '',
  error: false,
  timeoutID: null
}

const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case CLEAR_NOTIFICATION:
      return { ...initialState, error: state.error }
    default:
      return state
  }
}

export const setNotification = (message, error = false, seconds = 10) => {
  return (dispatch, getState) => {
    const currentTimeoutID = getState.timeoutID
    if (currentTimeoutID) {
      window.clearTimeout(currentTimeoutID)
    }
    const timeoutID = window.setTimeout(() => {
      dispatch({ type: CLEAR_NOTIFICATION })
    }, seconds * 1000)
    dispatch({
      type: SET_NOTIFICATION,
      data: { message, error, timeoutID }
    })
  }
}

export default notificationReducer
