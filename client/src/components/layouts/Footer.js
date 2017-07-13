import React from 'react'
import { Footer, Container, Content } from 're-bulma'

const FooterLayout = () =>
  <Footer>
    <Container>
      <Content>
        <p style={{ textAlign: 'center' }}>
          <strong>reBulma</strong> by{' '}
          <a href="https://github.com/bokuweb">bokuweb</a>. The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        <p style={{ textAlign: 'center' }}>
          <a className="icon" href="https://github.com/bokuweb/re-bulma">
            <i className="fa fa-github" />
          </a>
        </p>
      </Content>
    </Container>
  </Footer>

export default FooterLayout
