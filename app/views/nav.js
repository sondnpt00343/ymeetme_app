import { createStackNavigator } from 'react-navigation'

import PostsScreen from './Post/posts'
import PostDetailScreen from './Post/postDetail'

const routeConfiguration = {
  Posts: {
    screen: PostsScreen,
    navigationOptions: () => ({
      title: 'All Posts',
    }),
  },
  PostDetail: {
    screen: PostDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
}

const stackNavigatorConfiguration = {
  initialRouteName: 'Posts',
}

const AppNavigator = createStackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
)
export default AppNavigator
