import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import Loadable from 'react-loadable'
import history from '../utils/history'
import Loading from '../views/Loading'
import RouterBeforeEach from './RouterBeforeEach'

const routes = [
  {
    path: "/",
    component: Loadable({
      loader: () => import('../views/Login'),
      loading: Loading
    })
  },
  {
    path: "/page",
    component: Loadable({
      loader: () => import('../views/Layouts'),
      loading: Loading
    })
  },
  {
    path: "/404",
    component: Loadable({
      loader: () => import('../components/NotFoundPage'),
      loading: Loading
    })
  }
]

export default class Index extends Component {
  render() {
    return (
      <Router history={history}>
        <RouterBeforeEach routes={routes} />
      </Router>
    )
  }
}