import { graphql } from 'react-apollo'
import { reduxForm } from 'redux-form'
import { compose, pure } from 'recompose'
import { withForm } from 'hocs'
import { REGISTER } from './graphql'
import validate from './validate'

import Register from './Register'

export default compose(
  graphql(REGISTER, {
    props: ({ mutate }) => ({
      register: (username, password, dispName) =>
        mutate({
          variables: { username, password, dispName }
        })
    })
  }),
  reduxForm({
    form: 'registerForm',
    validate
  }),
  withForm,
  pure
)(Register)
