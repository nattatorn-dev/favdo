import React from 'react'
import PropTypes from 'prop-types'

import NoteBooksMediaItem from './NoteBooksMediaItem'

const NoteBooksMediaList = ({ notebooks }) =>
  <div>
    {notebooks.map(e => <NoteBooksMediaItem key={`${e._id}`} {...e} />)}
  </div>

NoteBooksMediaList.propTypes = {
  notebooks: PropTypes.array.isRequired
}

export default NoteBooksMediaList
