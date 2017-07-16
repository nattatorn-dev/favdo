import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure, setDisplayName, setPropTypes } from 'recompose'
import {
  Box,
  Media,
  MediaLeft,
  MediaContent,
  Content,
  MediaRight,
  Button
} from 're-bulma'

import { OpenGraphPreLoader } from '../../preloaders'
import { ImageCircle } from 'shared'

const OpenGraph = ({ data, loading }) => {
  const renderOg = () => {
    const {
      openGraph: { ogTitle, ogDescription, ogUrl, ogImage: { url } }
    } = data
    return (
      <Box>
        <Media>
          {url &&
            <MediaLeft>
              <ImageCircle src={url} size={'128px'} radius={'50%'} />
            </MediaLeft>}
          <MediaContent>
            <Content>
              <p>
                <strong style={{ color: 'black' }}>
                  {ogTitle}
                </strong>
                <br />
                {ogDescription}
              </p>
              <p>
                <strong>
                  {ogUrl}
                </strong>
              </p>
            </Content>
          </MediaContent>
          <MediaRight>
            <Button delete />
          </MediaRight>
        </Media>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box style={{ padding: '0 20px' }}>
        <OpenGraphPreLoader limit={1} />
      </Box>
    )
  } else if (Object.keys(data).length === 0) {
    return <dev />
  }
  return renderOg()
}

export default compose(
  setDisplayName('OpenGraph'),
  setPropTypes({
    data: PropTypes.object
  }),
  pure
)(OpenGraph)
