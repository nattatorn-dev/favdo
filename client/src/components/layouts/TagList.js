import React from 'react'
import PropTypes from 'prop-types'
import { Columns } from 're-bulma'

import TagItem from './TagItem'

const TagList = ({ tags }) =>
  <Columns isMultiline>
    {tags.map(e => <TagItem key={e._id} {...e} />)}
  </Columns>

TagList.propTypes = {
  tags: PropTypes.array
}

TagList.defaultProps = {
  tags: []
}

export default TagList
