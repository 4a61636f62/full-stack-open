import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Anchor,
  Box,
  Button,
  Collapsible,
  Header,
  Nav,
  ResponsiveContext
} from 'grommet'

import { Menu as MenuIcon } from 'grommet-icons'

const Navbar = ({ name, handleLogout }) => {
  const size = React.useContext(ResponsiveContext)
  const history = useHistory()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    history.listen(() => {
      setToggle(false)
    })
  }, [history])

  return (
    <>
      <Header
        background='brand'
        pad={{
          top: 'xsmall',
          bottom: 'xsmall',
          right: 'small',
          left: 'small'
        }}
      >
        <Box direction='row'>
          <h1>Bloglist.</h1>
        </Box>
        {size !== 'small' && (
        <Box>
          <Nav direction='row'>
            <Anchor as={Link} to='/' label='blogs' size='xxlarge' />
            <Anchor as={Link} to='/users/' label='users' size='xxlarge' />
          </Nav>
        </Box>
        )}
        {size !== 'small'
          ? (
              <Box>
                <Button
                  label='log out'
                  onClick={handleLogout}
                />
              </Box>
            )
          : (
              <Button
                icon={<MenuIcon />}
                onClick={() => setToggle(!toggle)}
              />
            )}
      </Header>
      <Collapsible open={size === 'small' && toggle}>
        <Box
          background='light-1'
          align='center'
          pad='large'
          gap='large'
        >
          <Nav direction='column'>
            <Anchor as={Link} to='/' label='blogs' size='xxlarge' />
            <Anchor as={Link} to='/users/' label='users' size='xxlarge' />
          </Nav>
          <Button
            label='log out'
            onClick={handleLogout}
          />
        </Box>
      </Collapsible>
    </>
  )
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Navbar

// <ResponsiveContext.Consumer>
// {responsive =>
// responsive === 'small'
//   ? (
//     <p>small</p>
//   )
//   : (
//     <Box>
//       <Nav direction='row'>
//         <Anchor as={Link} to='/' label='blogs' />
//         <Anchor as={Link} to='/users/' label='users' />
//         <label>{name} logged in</label>
//         <Button onClick={handleLogout} label='Sign Out' />
//       </Nav>
//       <Box></Box>
//     </Box>
//   )}
// </ResponsiveContext.Consumer>

// <Box gap='xsmall'>
//   <label>signed in as {name} mcrootyson</label>
// <Button
//   size='small'
//   onClick={handleLogout}
//   label='Sign Out'
// />
// </Box>
