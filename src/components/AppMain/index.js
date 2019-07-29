import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../views/Loading'

const subRoutes = [
  {
    path: "/page/feed",
    component: Loadable({
      loader: () => import('../../views/Feed'),
      loading: Loading
    })
  },
  {
    path: "/page/user",
    component: Loadable({
      loader: () => import('../../views/User'),
      loading: Loading
    })
  },
  {
    path: "/page/power",
    component: Loadable({
      loader: () => import('../../views/Power'),
      loading: Loading
    })
  }
]

function AppMain() {
  return (
    <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          {
            subRoutes.map((item, index) => {
              return <Route exact {...item} key={index} />
            })
          }
        </Switch>
      </div>
  )
}

export default AppMain;