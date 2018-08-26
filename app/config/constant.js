// Dimensions
import { Platform, Dimensions } from 'react-native'

export const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

const getNavPadding = () => {
  if (isIphoneX()) {
    return 40
  } else if (
    Platform.OS === 'ios' &&
    Dimensions.get('window').height / Dimensions.get('window').width > 1.75
  ) {
    return 20
  }
  return 0
}

const Constant = {
  layout: {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    navHeight: Platform.OS !== 'ios' ? 54 : 64,
    navPadding: getNavPadding(),
    contentHeight: Dimensions.get('window').height - 64,
    tabBarIconSize: Platform.OS !== 'ios' ? 24 : 30,
  },
  color: {
    theme: '#F9F9F9',
    border: '#ccc',
    white: '#fff',
    black: '#000',
    gray: 'gray',
    transparent: 'transparent',
  },
}

export default Constant
