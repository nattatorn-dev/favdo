import { gql } from 'react-apollo'

const CREATE_NOTEBOOK = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url) {
      id
      __typename
      title
      votes
      url
      createdAt
    }
  }
`

export default CREATE_NOTEBOOK
