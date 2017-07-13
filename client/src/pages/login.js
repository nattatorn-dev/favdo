import { Hero, HeroBody, Container, Columns } from 're-bulma'
import { Helmet } from 'react-helmet'
import withData from 'libraries/withData'

import App from '@components/App'
import Login from '@components/modules/Login/LoginContainer'

export default withData(() =>
  <App>
    <Hero size="isFullheight" color="isDark">
      <HeroBody>
        <Container>
          <Columns>
            <Helmet>
              <title>Login :: RAN! Example</title>
            </Helmet>
            <Login />
          </Columns>
        </Container>
      </HeroBody>
    </Hero>
  </App>
)
