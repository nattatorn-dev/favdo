import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import withData from 'libraries/withData'
import { authenticate } from 'services/AuthService'

import App from 'components/App'
import PostList from 'components/PostList'
import NoteBookCreate from 'components/modules/NoteBookCreate/NoteBookCreateContainer'
import { LayoutAuth as Layout, Header } from 'components/layouts'

const Page = ({ user, url: { pathname } }) =>
  <App>
    <Layout user={user} title="index">
      <Helmet>
        <title>RAN! Example</title>
      </Helmet>
      <Header pathname={pathname} />
      <NoteBookCreate />
      <PostList />
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

export default withData(Page)
