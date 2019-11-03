import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterBeforeEach from './RouterBeforeEach';
import { Spin } from 'antd';
import './style.less';

export interface routeType {
  path: string;
  component: React.ElementType;
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
    component: React.lazy(() => import('../views/Layouts'))
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