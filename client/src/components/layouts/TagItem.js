import React from 'react'
import PropTypes from 'prop-types'
import { Column } from 're-bulma'

const TagItem = ({ name }) =>
  <span>
    <Column
      style={{
        backgroundColor: '#ececec',
        borderRadius: '12px',
        padding: '0 5px',
        marginRight: '4px'
      }}>
      {name}
    </Column>
  </span>

TagItem.propTypes = {
  name: PropTypes.string.isRequired
}

export default TagItem
