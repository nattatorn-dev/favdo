import { Helmet } from 'react-helmet'
import withData from 'libraries/withData'

import App from '@components/App'
import { Header } from '@components/layouts'
import CreatePost from '@components/CreateForm'

export default withData(props =>
  <App>
    <Helmet>
      <title>Create Post :: RAN! Example</title>
    </Helmet>
    <Header pathname={props.url.pathname} />
    <CreatePost />
  </App>
)
