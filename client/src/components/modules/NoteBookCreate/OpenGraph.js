import React from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  defaultProps,
  pure,
  setDisplayName,
  setPropTypes
} from 'recompose'
import { Field, SubmissionError } from 'redux-form'
import styled from 'styled-components'
import { Button } from 're-bulma'

import { FormField } from 'shared'

const submit = (createPost, onRequest, onSuccess, onError) => async values => {
  try {
    let url = values.url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`
    }
    onRequest()
    createPost(values.title, url)
      .then(({ data }) => {
        onSuccess(data)
      })
      .catch(err => {
        onError(err)
      })
  } catch (e) {
    return Promise.reject(new SubmissionError({ _error: e.toString() }))
  }
}

const NoteBookCreate = ({
  createPost,
  error,
  formError,
  handleSubmit,
  loading,
  onError,
  onRequest,
  onSuccess,
  url
}) =>
  <form
    onSubmit={handleSubmit(submit(createPost, onRequest, onSuccess, onError))}>
    <h1>Create Post</h1>
    {error &&
      <div className="alert alert-danger">
        {error}
      </div>}
    <Field name="url" type="text" component={FormField} placeholder="url" />
    {url && <OpenGraph url={url} />}
    <Field name="title" type="text" component={FormField} placeholder="title" />
    <pre>
      {formError}
    </pre>
    {!loading &&
      <Button buttonStyle="isOutlined" color="isPrimary" type="submit">
        Submit
      </Button>}
    {loading && <Button state="isLoading">Loading</Button>}
  </form>

export default compose(
  setDisplayName('NoteBookCreate'),
  setPropTypes({
    createPost: PropTypes.func.isRequired,
    error: PropTypes.string,
    formError: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onError: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  }),
  defaultProps({
    error: '',
    formError: ''
  }),
  pure
)(styled(NoteBookCreate)`
  border-bottom: 1px solid #ececec;
  padding-bottom: 20px;
  margin-bottom: 20px;

  > h1 {
    font-size: 20px;
  }

  >input {
    display: block;
    margin-bottom: 10px;
  }
`)
