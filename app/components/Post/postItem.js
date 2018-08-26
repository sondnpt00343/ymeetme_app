/* @flow weak */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import FastImage from 'react-native-fast-image'

import Constant from '../../config/constant'
import StringHelper from '../../helpers/string.helper'

const PostItem = props => {
  const { data, onPress } = props
  const { sub_string, from_now } = StringHelper

  return(
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Constant.color.transparent}
    >
      <View style={styles.container}>
        <View style={styles.thumbnailBox}>
          <FastImage
            style={styles.thumbnail}
            source={{ uri: data.get('image') }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.title}>{sub_string(data.get('title'), 50)}</Text>
          <Text style={styles.description}>{sub_string(data.get('description'), 50)}</Text>
          <Text style={styles.createdDate}>{from_now(data.get('created_at'))}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const thumbnailHeight = Constant.layout.screenWidth * 0.25
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: Constant.color.border,
  },
  thumbnailBox: {
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: thumbnailHeight,
  },
  contentBox: {
    flex: 2,
    paddingLeft: 12,
  },
  title: {
    color: Constant.color.black,
    fontWeight: '600',
    fontSize: 14,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
  },
  createdDate: {
    fontSize: 14,
    marginTop: 8,
    color: Constant.color.gray,
  },
})

export default PostItem
