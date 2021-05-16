import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Collapsible
} from 'grommet'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <Collapsible open={notification.message !== ''}>
      <Box
        background={notification.error ? 'status-error' : 'status-ok'}
        height='xxsmall'
        align='center'
      >
        <h3>{notification.message}</h3>
      </Box>
    </Collapsible>
  )
}

export default Notification
