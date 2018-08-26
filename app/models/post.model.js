import Immutable from 'immutable'
import PropTypes from 'prop-types'

const PostRecord = Immutable.Record({
  origin_id: PropTypes.number,
  origin_url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  crawl_status: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
})

// class Post extends PostRecord {
//   constructor(props) {
//     super(props)
//   }
// }

export default PostRecord
