import { graphql } from 'react-apollo'
import {
  branch,
  compose,
  lifecycle,
  renderNothing,
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
  withState('enableFetchOg', 'setEnableFetchOg', true),
  withHandlers({
    disableFetchOg: ({ enableFetchOg, setEnableFetchOg }) => () => {
      setEnableFetchOg(!enableFetchOg)
    }
  }),
  withProps({
    isUrl: string.isUrl
  }),
  withMutatable(),
  lifecycle({
    componentDidMount() {
      const { disableFetchOg, isUrl, submit, url } = this.props
      if (isUrl(url)) {
        submit(null, { url })
        disableFetchOg()
      }
    },
    componentWillReceiveProps(nextProps) {
      const { disableFetchOg, enableFetchOg, isUrl, submit, url } = this.props
      if (nextProps.url !== url && enableFetchOg && isUrl(nextProps.url)) {
        submit(null, { url })
        disableFetchOg()
      }
    }
  }),
  branch(({ data }) => !data && !data.openGraph && renderNothing),
  pure
)(OpenGraph)
