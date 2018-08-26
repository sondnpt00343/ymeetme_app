import axios from 'axios'
import ApiConstant from './apiConstant'

// Get all post
const getPosts = (page = 1) => {
  return getAPI(ApiConstant.MODULE_POST_URI + (page > 1 ? `?page=${page}` : ''))
}

// Get a post
const getPostDetail = (id) => {
  return getAPI(ApiConstant.MODULE_POST_URI + `/${id}`)
}

// ============== BASE METHOD ============

const errorHandle = response => {
  if (response.status !== 200) {
    return new Error(response)
  }
}

const getAPI = url => {
  return axios
    .get(url)
    .then(response => {
      errorHandle(response)
      return response.data
    })
}

export default {
  getPosts,
  getPostDetail,
}
