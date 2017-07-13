import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader, { Rect, Circle } from 'react-content-loader'

const OpenGraphPreLoader = ({ limit = 10 }) => {
  const renderPreloader = () =>
    [...Array(limit).keys()].map(() =>
      <ContentLoader height={60} speed={1}>
        <Circle x={35} y={30} radius={25} />
        <Rect x="80" y="7" rx="4" ry="4" width="250" height="7" />
        <Rect x="80" y="23" rx="3" ry="3" width="300" height="7" />
        <Rect x="80" y="33" rx="3" ry="3" width="300" height="7" />
      </ContentLoader>
    )

  return (
    <div>
      {renderPreloader()}
    </div>
  )
}

OpenGraphPreLoader.propTypes = {
  limit: PropTypes.number
}

OpenGraphPreLoader.defaultProps = {
  limit: 0
}

export default OpenGraphPreLoader
