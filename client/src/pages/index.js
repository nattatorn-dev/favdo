import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import withData from 'libraries/withData'
import { authenticate } from 'services/AuthService'

import App from '@components/App'
import { LayoutAuth as Layout, Header } from '@components/layouts'

const Page = ({ user, url: { pathname } }) =>
  <App>
    <Helmet>
      <title>RAN! Example</title>
    </Helmet>
    <Layout user={user} title="index">
      <Header pathname={pathname} />
    </Layout>
  </App>

Page.getInitialProps = async ({ req, res }) => {
  const user = await authenticate(req, res)
  return { user }
}

Page.propTypes = {
  user: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

Page.defaultProps = {
  user: {}
}

export default withData(Page)
