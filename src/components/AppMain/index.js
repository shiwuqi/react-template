import React from 'react'
import { Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PrivateRoute from '../PrivateRoute'
import Loading from '../../views/Loading'

const FeedBack = Loadable({
  loader: () => import('../../views/FeedBack'),
  loading: Loading
})

const User = Loadable({
  loader: () => import('../../views/User'),
  loading: Loading
})

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

