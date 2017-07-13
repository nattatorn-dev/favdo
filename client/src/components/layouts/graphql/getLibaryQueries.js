import { gql } from 'react-apollo'
// import { documentFields } from './getLibaryFragments'

const GET_LIBARIES = gql`
  query getLibaries {
    allLibrary {
      count
      fileName
      dispName
    }
    allNotebooks {
      count
      fileName
      dispName
    }
    allNotebook {
      _id
      title
      excerpt
      description
      url
      tags {
        _id
        name
      }
      image {
        url
      }
      isFavorite
      createdAt
      updatedAt
    }
  }
`

export default GET_LIBARIES
