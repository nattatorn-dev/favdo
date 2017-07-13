import { graphql } from 'react-apollo'
import { compose, pure, withHandlers, withProps, withState } from 'recompose'
import { logout } from 'services/AuthService'
import GET_LIBARIES from './graphql'

import Layout from './LayoutAuth'

export default compose(
  graphql(GET_LIBARIES, {
    props: ({ data }) => ({
      data
    })
  }),
  withState('toggleNav', 'setToggleNav', false),
  withHandlers({
    handleToggleNav: ({ toggleNav, setToggleNav }) => () => {
      setToggleNav(!toggleNav)
    }
  }),
  withProps({
    logout
  }),
  pure
)(Layout)
