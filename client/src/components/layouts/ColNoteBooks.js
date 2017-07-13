import React from 'react'
import PropTypes from 'prop-types'
import { Column } from 're-bulma'

const style = {
  padding: '0px',
  borderLeft: '1px solid rgba(211,214,219,.5)',
  borderRight: '1px solid rgba(211,214,219,.5)'
}

const ColNoteBooks = ({ children }) =>
  <Column size="is3" style={style}>
    {children}
  </Column>

ColNoteBooks.propTypes = {
  children: React.PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired
}

export default ColNoteBooks
