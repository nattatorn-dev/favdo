import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavContainer, NavGroup, NavItem, NavToggle } from 're-bulma'

import { Svg } from 'shared'
import NavRight from './NavRight'

const NavLayout = ({ logout, handleToggleNav, toggleNav, user }) => {
  const svgStyle = { height: '20px', width: '20px', paddingRight: '2px' }

  return (
    <Nav hasShadow>
      <NavContainer isActive isTab>
        <NavGroup align="left">
          <NavItem>
            <Svg.Logo style={svgStyle} />
            <strong>
              {'pollo'}
            </strong>
          </NavItem>
        </NavGroup>
        <NavGroup align="center">
          <NavItem>Note</NavItem>
          <NavItem>Folder</NavItem>
        </NavGroup>
        <NavToggle isActive={toggleNav} onClick={handleToggleNav} />
        <NavRight
          logout={logout}
          handleToggleNav={handleToggleNav}
          user={user}
        />
      </NavContainer>
    </Nav>
  )
}

NavLayout.propTypes = {
  logout: PropTypes.func.isRequired,
  handleToggleNav: PropTypes.func.isRequired,
  toggleNav: PropTypes.bool.isRequired,
  user: PropTypes.object
}

NavLayout.defaultProps = {
  user: {}
}

export default NavLayout
