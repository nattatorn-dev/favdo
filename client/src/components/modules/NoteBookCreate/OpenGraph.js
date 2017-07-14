import React from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  defaultProps,
  lifecycle,
  pure,
  setDisplayName,
  setPropTypes,
  withProps,
  withHandlers,
  withState
} from 'recompose'
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

// const fetchOpenGraph = async url => {
//   console.log('url: ', url)
//   this.props.submit(null, { url })
// }

const OpenGraph = ({
  data: { ogTitle, ogDescription, ogUrl, ogImage },
  data,
  loading,
  submit
}) => {
  console.log(submit)
  if (loading) {
    return (
      <Box style={{ padding: '0 20px' }}>
        <OpenGraphPreLoader limit={1} />
      </Box>
    )
  }
  return (
    <Box>
      <Media>
        {ogImageUrl &&
          <MediaLeft>
            <ImageCircle src={ogImageUrl} size={'128px'} radius={'50%'} />
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

// const OpenGraph = props => {
//   console.log('props: ', props)

//   return <div />
// }

export default compose(
  setDisplayName('OpenGraph'),
  setPropTypes({
    data: PropTypes.object
  }),
  defaultProps({
    data: {}
  }),
  pure
)(OpenGraph)
