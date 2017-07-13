import { gql } from 'react-apollo'

const documentFields = gql`
  fragment documentFields on PostType {
    count
    fileName
    dispName
  }
`

export default documentFields
