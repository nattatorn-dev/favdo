import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { MenuLink, Media, MediaContent, Content } from 're-bulma'

import MediaImage from './MediaImage'
import TagList from './TagList'
import { LiMedia, Svg } from 'shared'

const NoteBooksMediaItem = ({
  excerpt,
  image,
  isFavorite,
  tags,
  title,
  updatedAt,
  image: { url: urlImage }
}) => {
  const svgStyle = { height: '16px', width: '16px' }
  const renderMediaImage = () => urlImage && <MediaImage {...image} />
  const renderFoverite = () => isFavorite && <Svg.Favorite style={svgStyle} />
  // const renderLink = () => url && <Svg.Link style={svgStyle} />

  return (
    <LiMedia>
      <MenuLink href="#" style={{ padding: '10px 15px 18px 15px' }}>
        <Media>
          {renderMediaImage()}
          <MediaContent>
            <Content>
              <p>
                <strong style={{ fontWeight: 'bold' }}>{title}</strong> <br />
                {excerpt}
              </p>
            </Content>
          </MediaContent>
        </Media>
        <Content>
          <div style={{ fontSize: '12px' }}>
            <small>
              {moment(new Date(updatedAt)).format('MMM D, YYYY')}
            </small>{' '}
            <Svg.Tag style={{ height: '16px', width: '16px' }} />{' '}
            {renderFoverite()}
            <TagList tags={tags} />
          </div>
        </Content>
      </MenuLink>
    </LiMedia>
  )
}

NoteBooksMediaItem.propTypes = {
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default NoteBooksMediaItem
