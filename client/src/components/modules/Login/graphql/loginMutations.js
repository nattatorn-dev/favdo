import { gql } from 'react-apollo'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        dispName
      }
    }
  }
`

export default LOGIN
