import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import history from '../utils/history'
import Loading from '../views/Loading'
// import Login from '../views/Login'
// import LayOut from '../views/LayOut'
import './index.css'
// import NotFoundPage from '../components/NotFoundPage';

const Login = Loadable({
  loader: () => import('../views/Login'),
  loading: Loading
})

const LayOut = Loadable({
  loader: () => import('../views/LayOut'),
  loading: Loading
})

const NotFoundPage = Loadable({
  loader: () => import('../components/NotFoundPage'),
  loading: Loading
})

export default class Index extends Component  {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={LayOut} />
          <Route path='/404' component={NotFoundPage} />
        </div>
      </Router>
    )
  }
}