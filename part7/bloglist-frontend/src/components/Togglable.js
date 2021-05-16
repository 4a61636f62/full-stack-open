import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Collapsible
} from 'grommet'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Box
      align='center'
      pad='medium'
    >
      <Collapsible open={visible}>
        {props.children}
        <Button onClick={toggleVisibility} label='cancel' />
      </Collapsible>
      {!visible && (
        <Box width='small'>
          <Button onClick={toggleVisibility} label={props.buttonLabel}/>
        </Box>
      )}
    </Box>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
