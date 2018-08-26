import { Record, List, fromJS } from 'immutable'
import { handleActions, createAction } from 'redux-actions'
import api from '../utils/api/api'

import Post from '../models/post.model'

// post requests
const FETCH_POSTS_REQUEST = 'post/FETCH_POSTS_REQUEST'
const fetchPostsRequest = createAction(FETCH_POSTS_REQUEST)

const PULL_POSTS_REQUEST = 'post/PULL_POSTS_REQUEST'
const pullPostsRequest = createAction(PULL_POSTS_REQUEST)

const FETCH_POST_DETAIL_REQUEST = 'post/FETCH_POST_DETAIL_REQUEST'
const fetchPostDetailRequest = createAction(FETCH_POST_DETAIL_REQUEST)

// post responses
const FETCH_POSTS_RESPONSE = 'post/FETCH_POSTS_RESPONSE'
const fetchPostsResponse = createAction(FETCH_POSTS_RESPONSE)
const FETCH_POST_DETAIL_RESPONSE = 'post/FETCH_POST_DETAIL_RESPONSE'
const fetchPostDetailResponse = createAction(FETCH_POST_DETAIL_RESPONSE)

const postRecord = new Record({
  isFetchingPosts: true,
  isFetchingPostDetail: true,
  isPulling: false,
  posts: List(),
  postDetail: new Post(),
  page: 1,
})

const initialState = postRecord()

/**
 * Dispatch get all posts action
 */
export const fetchPosts = (page = 1, requestState = true) => dispatch => {
  if (requestState) {
    dispatch(fetchPostsRequest())
  }
  api.getPosts(page)
    .then(response => {
      dispatch(fetchPostsResponse({
        response,
        page,
      }))
    })
    .catch(err => dispatch(fetchPostsResponse(err)))
}

/**
 * Dispatch get all posts action
 */
export const pullToFetchPosts = (page = 1, requestState = true) => dispatch => {
  if (requestState) {
    dispatch(pullPostsRequest())
  }
  setTimeout(() => {
    api.getPosts(page)
      .then(response => {
        dispatch(fetchPostsResponse({
          response,
          page,
          reset: true,
        }))
      })
      .catch(err => dispatch(fetchPostsResponse(err)))
  }, 1000)
}

/**
 * Dispatch get a post action
 */
export const fetchPostDetail = id => dispatch => {
  dispatch(fetchPostDetailRequest())
  api.getPostDetail(id)
    .then(response => {
      dispatch(fetchPostDetailResponse(response))
    })
    .catch(err => dispatch(fetchPostDetailResponse(err)))
}

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [FETCH_POSTS_REQUEST]: state => state.set('isFetchingPosts', true),
  [PULL_POSTS_REQUEST]: state => state.set('isPulling', true),
  [FETCH_POSTS_RESPONSE]: (state, action) => {
    const { response, page, reset } = action.payload
    
    if (action.error) {
      return state.withMutations(s => s.set('isFetchingPosts', false)
        .set('isPulling', false)
      )
    } else {
      let postsData
      if (reset) {
        postsData = response
      } else {
        postsData = [...state.get('posts'), ...response]
      }
      return state.withMutations(
        s => s.set('isFetchingPosts', false)
          .set('posts', fromJS(postsData))
          .set('page', page)
          .set('isPulling', false)
      )
    }
  },
  [FETCH_POST_DETAIL_REQUEST]: state => state.set('isFetchingPostDetail', true),
  [FETCH_POST_DETAIL_RESPONSE]: (state, action) => {
    if (action.error) {
      return state.withMutations(s => s.set('isFetchingPostDetail', false))
    }
    else {
      return state.withMutations(
        s => s.set('isFetchingPostDetail', false)
          .set('postDetail', fromJS(action.payload))
      )
    }
  },
}

export default handleActions(actions, initialState)
