import { Helmet } from 'react-helmet'
import withData from 'libraries/withData'

import App from '@components/App'
import Register from '@components/modules/Register/RegisterContainer'

export default withData(() =>
  <App>
    <Helmet>
      <title>Register :: RAN! Example</title>
    </Helmet>
    <Register />
  </App>
)
