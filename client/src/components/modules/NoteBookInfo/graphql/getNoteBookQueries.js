import { gql } from 'react-apollo'

const GET_NOTEBOOK = gql`
  query post($postId: String!) {
    post(id: $postId) {
      title
      votes
      id
      url
      description
      createdAt
    }
  }
`

export default GET_NOTEBOOK
