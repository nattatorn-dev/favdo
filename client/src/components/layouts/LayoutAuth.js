import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {
  Hero,
  HeroHead,
  HeroFoot,
  Section,
  Columns,
  Button,
  Menu,
  MenuList,
  Input
} from 're-bulma'

import { Nav, Footer, ColBody, ColLibrary, ColNoteBooks } from '../layouts'
import NoteBooksMediaList from './NoteBooksMediaList'
import FolderLibraryList from './FolderLibraryList'
import { NoteBookPreLoader } from '../preloaders'

const Layout = ({
  children,
  handleToggleNav,
  logout,
  title,
  toggleNav,
  user,
  data: { loading, allLibrary, allNotebooks, allNotebook }
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
    <Section style={{ display: 'flex', flex: '1', padding: '10px 20px' }}>
      <Columns>
        <ColLibrary>
          <Button color="isDark">Notebooks</Button>
          <Button>Tags</Button>
          <Button>Categories</Button>
          <Menu style={{ paddingTop: '30px' }}>
            {!loading &&
              <FolderLibraryList lable={'LIBRARY'} library={allLibrary} />}
            {!loading &&
              <FolderLibraryList lable={'NOTEBOOKS'} library={allNotebooks} />}
          </Menu>
        </ColLibrary>
        <ColNoteBooks>
          <Menu>
            <MenuList>
              <Input placeholder="Filter by keywprd, title or #tag" />
              {loading && <NoteBookPreLoader limit={10} />}
              {!loading && <NoteBooksMediaList notebooks={allNotebook} />}
            </MenuList>
          </Menu>
        </ColNoteBooks>
        <ColBody>
          {children}
        </ColBody>
      </Columns>
    </Section>
    <HeroFoot>
      <Footer />
    </HeroFoot>
  </Hero>

Layout.propTypes = {
  children: React.PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  data: PropTypes.object.isRequired,
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
