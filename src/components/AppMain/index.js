import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Spin } from 'antd'

const subRoutes = [
  {
    path: '/page/feed',
    component: lazy(() => import('../../views/Feed'))
  },
  {
    path: '/page/user',
    component: lazy(() => import('../../views/User'))
  },
  {
    path: '/page/power',
    component: lazy(() => import('../../views/Power'))
  }
]

const styles = {
  loading: {
    widht: '100%',
    height: '100vh',
    textAlign: 'center',
    lineHeight: '100vh'
  }
}

function AppMain() {
  return (
    <div style={{ padding: 16, position: 'relative' }}>
      <Suspense fallback={<div style={styles.loading}>
        <Spin />
      </div>}>
        <Switch>
          {
            subRoutes.map((item, index) => {
              return <Route exact {...item} key={index} />
            })
          }
        </Switch>
      </Suspense>
    </div>
  )
}

export default AppMain;