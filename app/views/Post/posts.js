/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { ImmutableVirtualizedList } from 'react-native-immutable-list-view'
import PostItem from '../../components/Post/postItem'
import Loading from '../../components/Loading/loading'

import {
  fetchPosts,
  pullToFetchPosts,
} from '../../modules/post.module'
import Constant from '../../config/constant'

class Posts extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  _onPressItem = data => {
    this.props.navigation.navigate('PostDetail', {
      title: data.get('title'),
      data,
    })
  }

  _renderItem = ({ item, index }) => (
    <PostItem
      key={index}
      data={item}
      onPress={this._onPressItem.bind(this, item)}
    />
  )

  _onEndReached() {
    const page = this.props.post.get('page')
    const nextPage = page + 1
    this.props.fetchPosts(nextPage, nextPage == 1)
  }

  _keyExtractor = item => String(item.get('id'))

  _onRefresh() {
    this.props.pullToFetchPosts()
  }

  render() {
    const { posts, isFetchingPosts, isPulling } = this.props.post
    return (
      <View style={styles.container}>
        <ImmutableVirtualizedList
          immutableData={posts}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={1}
          renderEmptyInList={null}
          refreshControl={
            <RefreshControl
              refreshing={isPulling}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          removeClippedSubviews={true}
        />

        {isFetchingPosts && <Loading />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.white,
  },
})

const mapStateToProps = state => ({
  post: state.get('post'),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPosts,
      pullToFetchPosts,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
