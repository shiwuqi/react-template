import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Spin } from 'antd'

const subRoutes: ReadonlyArray<any> = [
  {
    path: '/page/feed',
    component: React.lazy(() => import('../../views/Feed'))
  },
  {
    path: '/page/user',
    component: React.lazy(() => import('../../views/User'))
  },
  {
    path: '/page/power',
    component: React.lazy(() => import('../../views/Power'))
  }
]

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    widht: '100%',
    height: '100vh'
  }
}

const AppMain: React.FC = () => {
  return (
    <div style={{ padding: 16, position: 'relative' }}>
      <React.Suspense fallback={<div style={styles.loading}>
        <Spin />
      </div>}>
        <Switch>
          {
            subRoutes.map(item => {
              return <Route exact {...item} key={item.path} />
            })
          }
        </Switch>
      </React.Suspense>
    </div>
  )
}

export default AppMain;