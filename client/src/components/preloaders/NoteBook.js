import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader, { Rect, Circle } from 'react-content-loader'

const NoteBookPreLoader = ({ limit = 10 }) => {
  const renderPreloader = () =>
    [...Array(limit).keys()].map(e =>
      <ContentLoader
        key={`notebook-preloader-${e}`}
        style={{ margin: '14px 15px' }}
        height={145}
        speed={1}>
        <Circle x={35} y={45} radius={35} />

        <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />

        <Rect x="0" y="95" rx="3" ry="3" width="350" height="10" />
        <Rect x="0" y="115" rx="3" ry="3" width="400" height="10" />
        <Rect x="0" y="135" rx="3" ry="3" width="360" height="10" />
      </ContentLoader>
    )

  return (
    <div>
      {renderPreloader()}
    </div>
  )
}

NoteBookPreLoader.propTypes = {
  limit: PropTypes.number
}

NoteBookPreLoader.defaultProps = {
  limit: 0
}

export default NoteBookPreLoader
