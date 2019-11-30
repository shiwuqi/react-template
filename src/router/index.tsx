import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterBeforeEach from './RouterBeforeEach';
import { Spin } from 'antd';
import './style.less';

export interface routeType {
  path: string;
  component: React.ElementType;
  children?: routeType[];
}

const routes: routeType[] = [
  {
    path: '/login',
    component: React.lazy(() => import('../views/Login'))
  },
  {
    path: '/registry',
    component: React.lazy(() => import('../views/Registry'))
  },
  {
    path: '/page',
    component: React.lazy(() => import('../views/Layouts')),
    children: [
      {
        path: '/feed',
        component: React.lazy(() => import('../views/Feed'))
      },
      {
        path: '/user',
        component: React.lazy(() => import('../views/User'))
      },
      {
        path: '/hook',
        component: React.lazy(() => import('../views/Hook'))
      },
    ]
  },
  {
    path: '/404',
    component: React.lazy(() => import('../components/NotFoundPage'))
  }
]

export default function Index() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className='loading'>
        <Spin />
      </div>}>
        <RouterBeforeEach routes={routes} />
      </React.Suspense>
    </BrowserRouter>
  )
}