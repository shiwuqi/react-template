import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterBeforeEach from './RouterBeforeEach';
import { Spin } from 'antd';
import './style.less';
const { lazy, Suspense } = React;

export interface routeType {
  path: string;
  component: React.ElementType;
  children?: routeType[];
}

const routes: routeType[] = [
  {
    path: '/login',
    component: lazy(() => import('../views/Login'))
  },
  {
    path: '/registry',
    component: lazy(() => import('../views/Registry'))
  },
  {
    path: '/page',
    component: lazy(() => import('../views/Layouts')),
    children: []
  },
  {
    path: '/404',
    component: lazy(() => import('../components/NotFoundPage'))
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