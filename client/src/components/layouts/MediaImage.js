import React from 'react'
import PropTypes from 'prop-types'
import { MediaLeft } from 're-bulma'

import { ImageCircle } from 'shared'

const MediaImage = ({ url }) =>
  <MediaLeft>
    <ImageCircle src={url} size={'64px'} radius={'50%'} />
  </MediaLeft>

MediaImage.propTypes = {
  url: PropTypes.string
}

MediaImage.defaultProps = {
  url: ''
}

export default MediaImage
