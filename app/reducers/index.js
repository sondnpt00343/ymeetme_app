import { combineReducers } from 'redux-immutable'
import AppReducer from '../actions/app.action'
import PostReducer from '../modules/post.module'

const rootReducer = combineReducers({
  app: AppReducer,
  post: PostReducer,
})

export default rootReducer
