import { gql } from 'react-apollo'

const REGISTER = gql`
  mutation register(
    $username: String!
    $password: String!
    $dispName: String!
  ) {
    register(username: $username, password: $password, dispName: $dispName) {
      id
      username
      dispName
    }
  }
`

export default REGISTER
