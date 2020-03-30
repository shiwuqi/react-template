import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterBeforeEach from './RouterBeforeEach';
import { Spin } from 'antd';
import './style.less';
const { lazy, Suspense, memo } = React;

export interface routeType {
  path: string;
  component: React.ElementType;
  children?: routeType[];
}

const routes: routeType[] = [
  {
    path: '/login',
    component: memo(lazy(() => import('../views/Login')))
  },
  {
    path: '/registry',
    component: memo(lazy(() => import('../views/Registry')))
  },
  {
    path: '/page',
    component: memo(lazy(() => import('../views/Layouts'))),
    children: [
      {
        path: '/page/feed',
        component: memo(lazy(() => import('../views/Feed')))
      },
      {
        path: '/page/user',
        component: memo(lazy(() => import('../views/User')))
      },
      {
        path: '/page/hook',
        component: memo(lazy(() => import('../views/Hook')))
      },
      {
        path: '/page/rich',
        component: memo(lazy(() => import('../views/Rich')))
      }
    ]
  },
  {
    path: '/404',
    component: memo(lazy(() => import('../components/NotFoundPage')))
  }
]

export default function Index() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='loading'>
        <Spin />
      </div>}>
        <RouterBeforeEach routes={routes} />
      </Suspense>
    </BrowserRouter>
  )
}