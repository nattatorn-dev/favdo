import React from 'react'
import PropTypes from 'prop-types'
import { MenuLink } from 're-bulma'

const LibraryItem = ({ children, count, dispName }) =>
  <li>
    <MenuLink href="#" style={{ display: 'flex' }}>
      <span>
        {children}
      </span>
      <span
        style={{
          verticalAlign: 'middle',
          flex: '1'
        }}>
        {dispName}
      </span>
      <span
        style={{
          verticalAlign: 'middle'
        }}>
        {count}
      </span>
    </MenuLink>
  </li>

LibraryItem.propTypes = {
  children: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  dispName: PropTypes.string.isRequired
}

export default LibraryItem
