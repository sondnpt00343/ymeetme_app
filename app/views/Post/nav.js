import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'

import JobScreen from './jobs'
import JobDetailScreen from './jobDetail'

const JobNavigator = createStackNavigator(
  {
    Job: { screen: JobScreen },
    JobDetail: { screen: JobDetailScreen },
  },
  {
    initialRoute: "Job",
    headerMode: "none"
  }
)

class JobNavigation extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <JobNavigator />
  }
}

export default JobNavigator
