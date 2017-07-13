import { pure, withState, withHandlers, compose } from 'recompose'

export default compose(
  withState('loading', 'setLoading', false),
  withState('formError', 'setError', ''),
  withState('data', 'setData', null),
  withHandlers({
    onRequest: ({ setLoading }) => data => {
      setLoading(true)
    },
    onSuccess: ({ setLoading, setData }) => data => {
      setLoading(false)
      setData(data)
    },
    onError: ({ setLoading, setError }) => err => {
      setLoading(false)
      setError('Username already exist')
    },
  }),
  pure
)
