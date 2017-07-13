import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { compose, pure, setDisplayName } from 'recompose'
import { withForm } from 'hocs'
import CREATE_NOTEBOOK from './graphql'
import validate from './validate'

import NoteBookCreate from './NoteBookCreate'

export default compose(
  setDisplayName('NoteBookCreateContainer'),
  graphql(CREATE_NOTEBOOK, {
    props: ({ ownProps, mutate }) => ({
      createPost: (title, url) =>
        mutate({
          variables: { title, url },
          optimisticResponse: {
            __typename: 'Mutation',
            createPost: {
              __typename: 'Post',
              id: ownProps.id,
              title,
              url,
              votes: 0,
              createdAt: new Date()
            }
          },
          updateQueries: {
            allPosts: (previousResult, { mutationResult }) => {
              const newPost = mutationResult.data.createPost
              return Object.assign({}, previousResult, {
                allPosts: [newPost, ...previousResult.allPosts]
              })
            }
          }
        })
    })
  }),
  reduxForm({
    form: 'createNoteBookForm',
    validate
  }),
  connect(state =>
    formValueSelector('createNoteBookForm')(state, 'title', 'url')
  ),
  withForm,
  pure
)(NoteBookCreate)
