import React from 'react'
import PropTypes from 'prop-types'
import { Field, SubmissionError } from 'redux-form'
import { Button } from 're-bulma'
import { FormField } from 'shared'

const submit = (onRequest, onSuccess, onError) => async (
  values,
  dispatch,
  props
) => {
  try {
    onRequest()
    props
      .register(values.username, values.password, values.dispName)
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

const Register = ({
  handleSubmit,
  error,
  onRequest,
  onSuccess,
  onError,
  formError,
  loading
}) =>
  <form onSubmit={handleSubmit(submit(onRequest, onSuccess, onError))}>
    <h1>Register</h1>
    {error &&
      <div className="alert alert-danger">
        {error}
      </div>}
    <Field
      name="username"
      type="text"
      component={FormField}
      placeholder="usernanme"
    />
    <Field
      name="password"
      type="password"
      component={FormField}
      placeholder="password"
    />
    <Field
      name="dispName"
      type="text"
      component={FormField}
      placeholder="display name"
    />
    <pre>
      {formError}
    </pre>
    {!loading &&
      <Button buttonStyle="isOutlined" color="isPrimary" type="submit">
        Submit
      </Button>}
    {loading && <Button state="isLoading">Loading</Button>}
  </form>

Register.propTypes = {
  error: PropTypes.string,
  formError: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onError: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
}

Register.defaultProps = {
  error: '',
  formError: ''
}

export default Register
