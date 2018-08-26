import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { createStore, applyMiddleware } from 'redux'
import Immutable from 'immutable'

import rootReducer from './index'

const initialState = Immutable.Map()
const middleware = applyMiddleware(thunk, logger)

export default function configStore() {
  return createStore(rootReducer, initialState, middleware)
}
