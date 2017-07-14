import { graphql } from 'react-apollo'
import {
  compose,
  lifecycle,
  pure,
  setDisplayName,
  withProps,
  withHandlers,
  withState
} from 'recompose'
import { withMutatable } from 'hocs'
import { string } from 'utils'
import { GET_OPENGRAPH } from './graphql'

import OpenGraph from './OpenGraph'

export default compose(
  setDisplayName('OpenGraphContainer'),
  graphql(GET_OPENGRAPH),
  withMutatable(),
  withState('enableFetchOg', 'setEnableFetchOg', true),
  withHandlers({
    onRequest: ({ enableFetchOg, setEnableFetchOg }) => () => {
      setEnableFetchOg(!enableFetchOg)
    }
  }),
  withProps({
    isUrl: string.isUrl
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      const { isUrl, url } = this.props
      if (nextProps.url !== url && isUrl(nextProps.url)) {
        console.log('------------------------------------')
        console.log('change')
        console.log('------------------------------------')
        return true
      }
      return false
    },
    componentDidUpdate() {
      this.props.submit(null, { url: this.props.url })
    }
  }),
  pure
)(OpenGraph)
