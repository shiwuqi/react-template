import React from 'react'
import { Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PrivateRoute from '../PrivateRoute'
import Loading from '../../views/Loading'

const Feed = Loadable({
  loader: () => import('../../views/Feed'),
  loading: Loading
})

const User = Loadable({
  loader: () => import('../../views/User'),
  loading: Loading
})

const Power = Loadable({
  loader: () => import('../../views/Power'),
  loading: Loading
})

export default class AppMain extends React.Component {
  render () {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          <PrivateRoute exact path='/home/feed' component={Feed} />
          <PrivateRoute exact path='/home/user' component={User} />
          <PrivateRoute exact path='/home/power' component={Power} />
        </Switch>
      </div>
    )
  }
}

