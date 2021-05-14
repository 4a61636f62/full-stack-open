import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const [message, color] = useSelector(state => [state.notification.message, state.notification.color])

  if (message === '') {
    return null
  }

  const style = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div id='notification' style={style}>
      {message}
    </div>
  )
}

export default Notification
