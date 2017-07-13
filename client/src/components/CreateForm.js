// import { gql, graphql } from 'react-apollo'
// import { connect } from 'react-redux'

// import { Button, Input } from 're-bulma'

// import {
//   reduxForm,
//   Field,
//   SubmissionError,
//   formValueSelector
// } from 'redux-form'

// const validate = values => {
//   const errors = {}
//   if (!values.title) {
//     errors.title = 'Required'
//   }
//   if (!values.url) {
//     errors.url = 'Required'
//   }
//   return errors
// }

// const submit = async (values, dispatch, props) => {
//   try {
//     let url = values.url
//     // prepend http if missing from url
//     if (!url.match(/^[a-zA-Z]+:\/\//)) {
//       url = `http://${url}`
//     }
//     props.createPost(values.title, url)
//   } catch (e) {
//     return Promise.reject(new SubmissionError({ _error: e.toString() }))
//   }
// }
// const renderOpenGraph = () => <span>has url</span>

// const renderField = ({
//   input,
//   input: { name },
//   label,
//   type,
//   placeholder,
//   meta: { touched, error, warning }
// }) => {
//   const config =
//     touched && error
//       ? {
//           color: 'isDanger',
//           text: `This ${name} is invalid`,
//           image: 'fa fa-warning'
//         }
//       : {
//           image: 'fa fa-check'
//         }

//   return (
//     <Input
//       color={config.color}
//       type={type}
//       placeholder={placeholder}
//       icon={config.image}
//       hasIconRight
//       help={{ color: config.color, text: config.text }}
//       {...input}
//     />
//   )
// }

// function Submit({ data, handleSubmit, resetForm, submitting, error, hasUrl }) {
//   return (
//     <form onSubmit={handleSubmit(submit)}>
//       <h1>Create Post</h1>
//       {error &&
//         <div className="alert alert-danger">
//           {error}
//         </div>}
//       <Field name="url" type="text" component={renderField} placeholder="url" />
//       <Field
//         name="title"
//         type="text"
//         component={renderField}
//         placeholder="title"
//       />
//       <Button buttonStyle="isOutlined" color="isPrimary" type="submit">
//         Submit
//       </Button>
//     </form>
//   )
// }

// const createPost = gql`
//   mutation createPost($title: String!, $url: String!) {
//     createPost(title: $title, url: $url) {
//       id
//       title
//       votes
//       url
//       createdAt
//     }
//   }
// `

// Submit = reduxForm({
//   form: 'postForm',
//   validate
// })(Submit)

// const selector = formValueSelector('postForm')
// Submit = connect(state => {
//   const hasUrl = selector(state, 'url')
//   return {
//     hasUrl
//   }
// })(Submit)

// export default graphql(createPost, {
//   props: ({ mutate }) => ({
//     createPost: (title, url) =>
//       mutate({
//         variables: { title, url },
//         optimisticResponse: {
//           createPost: {
//             id: new Date().getTime(),
//             title,
//             url,
//             votes: 0,
//             createdAt: new Date()
//           }
//         },
//         updateQueries: {
//           allPosts: (previousResult, { mutationResult }) => {
//             const newPost = mutationResult.data.createPost
//             return Object.assign({}, previousResult, {
//               // Append the new post
//               allPosts: [newPost, ...previousResult.allPosts]
//             })
//           }
//         }
//       })
//   })
// })(Submit)
