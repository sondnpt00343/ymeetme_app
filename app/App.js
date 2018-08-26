import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Provider } from 'react-redux'

import createStore from './reducers/configStore'
import Constant from './config/constant'
import AppNavigator from './views/nav'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <AppNavigator />
    </View>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.white,
  },
})

export default App
