import React, { Component, Suspense, lazy } from 'react'
import { Router } from 'react-router-dom'
import history from '../utils/history'
import RouterBeforeEach from './RouterBeforeEach'
import { Spin } from 'antd'

const routes = [
  {
    path: '/',
    component: lazy(() => import('../views/Login'))
  },
  {
    path: '/registry',
    component: lazy(() => import('../views/Registry'))
  },
  {
    path: '/page',
    component: lazy(() => import('../views/Layouts'))
  },
  {
    path: '/404',
    component: lazy(() => import('../components/NotFoundPage'))
  }
]

const styles = {
  loading: {
    width: '100%',
    height: '100vh',
    textAlign: 'center',
    lineHeight: '100vh'
  }
}

export default class Index extends Component {
  render() {
    return (
      <Router history={history}>
        <Suspense fallback={<div style={styles.loading}>
          <Spin />
        </div>}>
          <RouterBeforeEach routes={routes} />
        </Suspense>
      </Router>
    )
  }
}