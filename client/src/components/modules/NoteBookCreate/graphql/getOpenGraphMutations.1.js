import { gql } from 'react-apollo'

const GET_OPENGRAPH = gql`
  mutation openGraph($url: String!) {
    openGraph(url: $url) {
      ogLocale
      ogUrl
      ogType
      ogTitle
      ogDescription
      ogImage {
        url
        width
        height
        type
      }
    }
  }
`

export default GET_OPENGRAPH
