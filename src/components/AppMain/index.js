import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'

import FeedBack from '../../views/FeedBack'
import User from '../../views/User'

export default class AppMain extends React.Component {
  render () {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          <PrivateRoute exact path='/home/feedBack' component={FeedBack} />
          <PrivateRoute exact path='/home/user' component={User} />
        </Switch>
      </div>
    )
  }
}

