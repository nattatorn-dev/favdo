import React from 'react'
import PropTypes from 'prop-types'
import { Field, SubmissionError } from 'redux-form'
import { Button, Column, Box } from 're-bulma'

import { FormField } from 'shared'

const submit = async (values, dispatch, { login, loginService }) => {
  try {
    const result = await login(values.username, values.password)
    loginService(result.data.login.token, result.data.login.user)
  } catch (e) {
    return Promise.reject(new SubmissionError({ _error: e.toString() }))
  }
}

const Login = ({ handleSubmit, error }) =>
  <Column offset="isOffset4" size="is4">
    <h1>Login</h1>
    <Box>
      <form onSubmit={handleSubmit(submit)}>
        {error &&
          <div className="alert alert-danger">
            {error}
          </div>}
        <Field
          name="username"
          type="text"
          component={FormField}
          placeholder="username"
        />
        <Field
          name="password"
          type="password"
          component={FormField}
          placeholder="password"
        />
        <Button buttonStyle="isOutlined" color="isPrimary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  </Column>

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
}

Login.defaultProps = {
  error: ''
}

export default Login
