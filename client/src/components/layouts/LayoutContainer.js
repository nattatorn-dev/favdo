import { compose, pure, withHandlers, withProps, withState } from 'recompose'
import { logout } from 'services/AuthService'

import Layout from './Layout'

export default compose(
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
