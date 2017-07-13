export default function validate(values) {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.url) {
    errors.url = 'Required'
  }
  return errors
}
