import { applyMiddleware, compose } from 'redux'

let devtools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export default function createMiddleware(clientMiddleware) {
  return compose(applyMiddleware(clientMiddleware), devtools)
}
