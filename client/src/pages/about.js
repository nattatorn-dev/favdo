import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { authenticate } from 'services/AuthService'
import withData from 'libraries/withData'

import App from '@components/App'
import { Layout, Header } from '@components/layouts'

const Page = ({ user, url: { pathname } }) =>
  <App>
    <Helmet>
      <title>About :: RAN! Example</title>
    </Helmet>
    <Layout user={user} title="index">
      <Header pathname={pathname} />
      <article>
        <h1>The Idea Behind This Example</h1>
        <p>
          <a href="http://dev.apollodata.com">Apollo</a> is a GraphQL client
          that allows you to easily query the exact data you need from a GraphQL
          server. In addition to fetching and mutating data, Apollo analyzes
          your queries and their results to construct a client-side cache of
          your data, which is kept up to date as further queries and mutations
          are run, fetching more results from the server.
        </p>
        <p>
          In this simple example, we integrate Apollo seamlessly with{' '}
          <a href="https://github.com/zeit/next.js">Next</a> by wrapping our
          pages inside a{' '}
          <a href="https://facebook.github.io/react/docs/higher-order-components.html">
            higher-order component (HOC)
          </a>
        </p>
      </article>
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
