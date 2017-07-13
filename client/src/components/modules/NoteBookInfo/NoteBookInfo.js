import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure, setDisplayName, setPropTypes } from 'recompose'
import moment from 'moment'
import styled from 'styled-components'

const NoteBookInfo = ({ data: { post } }) =>
  <section>
    <h1>
      {post.title}
    </h1>
    <div>
      <span>
        ID: <b>{post.id}</b>
      </span>
      <span>&nbsp;|&nbsp;</span>
      <span>
        Created At: {' '}
        <b>{moment(new Date(post.createdAt)).format('DD.MM.YYYY kk:mm')}</b>
      </span>
    </div>
    <p>
      <a target="_blank" href={post.url} rel="noopener noreferrer nofollow">
        {post.url}
      </a>
    </p>
  </section>

export default compose(
  setDisplayName('NoteBookInfo'),
  setPropTypes({
    data: PropTypes.object.isRequired
  }),
  pure
)(styled(NoteBookInfo)`
  padding-bottom: 20px;

  > h1 {
    margin-top: 0;
  }

  > p {
    font-size: 17px;
  }
`)
