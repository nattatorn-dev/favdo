import { graphql } from 'react-apollo'
import { compose, pure, setDisplayName } from 'recompose'
import { withPreloader } from 'hocs'
import GET_NOTEBOOK from './graphql'

import NoteBookInfo from './NoteBookInfo'

export default compose(
  setDisplayName('NoteBookInfoContainer'),
  graphql(GET_NOTEBOOK, {
    options: ({ postId }) => ({
      variables: {
        postId
      }
    }),
    props: ({ data, data: { loading } }) => ({
      data,
      loading
    })
  }),
  withPreloader,
  pure
)(NoteBookInfo)
