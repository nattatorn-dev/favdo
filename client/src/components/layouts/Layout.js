import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {
  Hero,
  HeroHead,
  HeroBody,
  HeroFoot,
  Container,
  Section,
  Columns,
  Column
} from 're-bulma'

import { Nav, Footer } from '../layouts'

const Layout = ({
  children,
  handleToggleNav,
  logout,
  title,
  toggleNav,
  user
}) =>
  <Hero size="isFullheight">
    <Head>
      <title>
        {title}
      </title>
    </Head>
    <HeroHead>
      <Nav
        user={user}
        title={title}
        handleToggleNav={handleToggleNav}
        logout={logout}
        toggleNav={toggleNav}
      />
    </HeroHead>
    <HeroBody>
      <Container hasTextCentered>
        <Section style={{ padding: '10px' }}>
          <Columns>
            <Column>
              {children}
            </Column>
          </Columns>
        </Section>
      </Container>
    </HeroBody>
    <HeroFoot>
      <Footer />
    </HeroFoot>
  </Hero>

Layout.propTypes = {
  children: React.PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  handleToggleNav: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleNav: PropTypes.bool.isRequired,
  user: PropTypes.object
}

Layout.defaultProps = {
  user: {}
}

export default Layout
