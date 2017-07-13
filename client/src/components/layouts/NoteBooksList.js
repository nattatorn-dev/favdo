import React from 'react'
import PropTypes from 'prop-types'
import { Column } from 're-bulma'

const NoteBooksList = ({ children }) =>
  <Column size="is3">
    {children}
  </Column>

NoteBooksList.propTypes = {
  children: PropTypes.object.isRequired
}

export default NoteBooksList
