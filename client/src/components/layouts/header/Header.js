import PropTypes from 'prop-types'
import styled from 'styled-components'
import LinkList from './LinkList'

const Header = ({ pathname }) =>
  <header>
    <LinkList pathname={pathname} />
  </header>

Header.propTypes = {
  pathname: PropTypes.string.isRequired
}

export default styled(Header)`
  margin-bottom: 25px;
`
