import React from 'react'
import PropTypes from 'prop-types'
import { Column } from 're-bulma'

const ColNoteBooks = ({ children }) =>
  <Column size="is2">
    {children}
  </Column>

ColNoteBooks.propTypes = {
  children: React.PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired
}

export default ColNoteBooks
