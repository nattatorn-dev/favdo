import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button, NavGroup, NavItem } from 're-bulma'

const NavRight = ({ user, logout }) =>
  <NavGroup align="right" isMenu>
    <Link prefetch href="/posts">
      <NavItem>Posts</NavItem>
    </Link>
    <Link prefetch href="/about">
      <NavItem>About</NavItem>
    </Link>
    {!user &&
      <NavItem>
        <Link href="/login">
          <Button buttonStyle="isOutlined">Log in</Button>
        </Link>
      </NavItem>}
    {!user &&
      <NavItem>
        <Link href="/register">
          <Button state="isActive" color="isInfo">
            Sign up
          </Button>
        </Link>
      </NavItem>}
    {user &&
      <NavItem>
        Hi<strong style={{ marginLeft: '4px' }}>{user.dispName}</strong>
      </NavItem>}
    {user &&
      <NavItem onClick={() => logout()}>
        <Button state="isActive" color="isInfo">
          Log out
        </Button>
      </NavItem>}
  </NavGroup>

NavRight.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default NavRight
