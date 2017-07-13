import React from 'react'
import PropTypes from 'prop-types'
import { Column } from 're-bulma'

const ColBody = ({ children }) =>
  <Column size="is7">
    {children}
  </Column>

ColBody.propTypes = {
  children: React.PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired
}

export default ColBody
