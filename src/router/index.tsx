import * as React from 'react'
import { Router } from 'react-router-dom'
import history from '../utils/history'
import RouterBeforeEach from './RouterBeforeEach'
import { Spin } from 'antd'

export interface routeType {
  path: string,
  component: React.ElementType
}

const routes: routeType[] = [
  {
    path: '/',
    component: React.lazy(() => import('../views/Login'))
  },
  {
    path: '/registry',
    component: React.lazy(() => import('../views/Registry'))
  },
  {
    path: '/page',
    component: React.lazy(() => import('../views/Layouts'))
  },
  {
    path: '/404',
    component: React.lazy(() => import('../components/NotFoundPage'))
  }
]

const styles = {
  loading: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignContent: 'center',
  }
}

export default class Index extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={<div style={styles.loading}>
          <Spin />
        </div>}>
          <RouterBeforeEach routes={routes} />
        </React.Suspense>
      </Router>
    )
  }
}