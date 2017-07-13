import React from 'react'
import PropTypes from 'prop-types'
import { MenuLabel, MenuList } from 're-bulma'

import FolderLibraryItem from './FolderLibraryItem'
import { LibraryCircle } from 'shared'

const FolderLibraryList = ({ lable, library }) =>
  <div>
    <MenuLabel>
      {lable}
    </MenuLabel>
    <MenuList>
      {library.map(e =>
        <FolderLibraryItem {...e} key={`$${e.dispName}`}>
          <LibraryCircle fileName={e.fileName} size={'16px'} />
        </FolderLibraryItem>
      )}
    </MenuList>
  </div>

FolderLibraryList.propTypes = {
  lable: PropTypes.string.isRequired,
  library: PropTypes.array.isRequired
}

export default FolderLibraryList
