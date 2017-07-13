import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import reducers from './reducers'

export default function getReducer(client) {
  return combineReducers({
    ...reducers,
    apollo: client.reducer(),
    form: formReducer
  })
}
