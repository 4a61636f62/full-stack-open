const initialState = {
  message: '',
  color: '',
  timeoutID: null
}

const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case CLEAR_NOTIFICATION:
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, color, seconds) => {
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
      data: { message, color, timeoutID }
    })
  }
}

export default notificationReducer
