import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import history from '../utils/history'
import Loading from '../views/Loading'
import './index.css'

const Login = Loadable({
  loader: () => import('../views/Login'),
  loading: Loading
})

const Layouts = Loadable({
  loader: () => import('../views/Layouts'),
  loading: Loading
})

const NotFoundPage = Loadable({
  loader: () => import('../components/NotFoundPage'),
  loading: Loading
})

export default class Index extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path='/(login)?' component={Login} />
          <Route path='/home' component={Layouts} />
          <Route path='/404' component={NotFoundPage} />
        </div>
      </Router>
    )
  }
}