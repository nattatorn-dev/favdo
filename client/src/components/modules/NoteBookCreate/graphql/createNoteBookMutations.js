import { gql } from 'react-apollo'

const CREATE_NOTEBOOK = gql`
  mutation createPost($title: String!, $url: String!, $description: String!) {
    createPost(title: $title, url: $url, description: $description) {
      id
      __typename
      title
      votes
      url
      description
      createdAt
    }
  }
`

export default CREATE_NOTEBOOK
