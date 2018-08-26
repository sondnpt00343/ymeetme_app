/* @flow weak */

import React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'

const Loading = ({}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading
