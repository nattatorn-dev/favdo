import { graphql } from 'react-apollo'
import { reduxForm } from 'redux-form'
import { compose, pure, setDisplayName, withProps } from 'recompose'
import { withForm } from 'hocs'
import { login } from 'services/AuthService'
import REGISTER from './graphql'
import validate from './validate'

import Login from './Login'

export default compose(
  setDisplayName('LoginContainer'),
  graphql(REGISTER, {
    props: ({ mutate }) => ({
      login: (username, password) =>
        mutate({
          variables: { username, password }
        })
    })
  }),
  withProps({
    loginService: login
  }),
  reduxForm({
    form: 'loginForm',
    validate
  }),
  withForm,
  pure
)(Login)
