import { ApolloClient } from 'apollo-client'
import { createNetworkInterface } from 'apollo-upload-client'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'

const GRAPHQL_URL = 'http://localhost:4000/graphql'
const WS_URL = 'ws://localhost:4000/subscriptions'

const initNetworkInterface = getToken => {
  let networkInterface = createNetworkInterface({
    uri: GRAPHQL_URL,
    opts: {
      credentials: 'same-origin'
    }
  })

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}
        }

        ;(async () => {
          const token = getToken()
          req.options.headers.authorization = token ? `Bearer ${token}` : null
          next()
        })()
      }
    }
  ])

  if (process.browser) {
    const wsClient = new SubscriptionClient(WS_URL, {
      reconnect: true
    })

    networkInterface = addGraphQLSubscriptions(networkInterface, wsClient)
  }

  return networkInterface
}

let apolloClient = null

const createClient = (headers, { getToken }) =>
  new ApolloClient({
    ssrMode: !process.browser,
    ssrForceFetchDelay: 100,
    headers,
    networkInterface: initNetworkInterface(getToken)
  })

export default (headers, graphqlUrl) => {
  if (!process.browser) {
    return createClient(headers, graphqlUrl)
  }
  if (!apolloClient) {
    apolloClient = createClient(headers, graphqlUrl)
  }
  return apolloClient
}
