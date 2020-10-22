import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterBeforeEach from "./RouterBeforeEach";
import { Spin } from "antd";
import "./style.less";
const { lazy, Suspense, memo } = React;

export interface routeType {
  path: string;
  component: React.ElementType;
  children?: routeType[];
}

const routes: routeType[] = [
  {
    path: "/page",
    component: lazy(() => import("../views/Layouts")),
    children: [
      {
        path: "/page/feed",
        component: lazy(() => import("../views/Feed")),
      },
      {
        path: "/page/user",
        component: lazy(() => import("../views/User")),
      },
      {
        path: "/page/hook",
        component: lazy(() => import("../views/Hook")),
      },
      {
        path: "/page/rich",
        component: lazy(() => import("../views/Rich")),
      },
    ],
  },
  {
    path: "/login",
    component: lazy(() => import("../views/Login")),
  },
  {
    path: "/registry",
    component: lazy(() => import("../views/Registry")),
  },
  {
    path: "/404",
    component: lazy(() => import("../components/NotFoundPage")),
  },
];

export default function Index() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loading">
            <Spin />
          </div>
        }
      >
        <RouterBeforeEach routes={routes} />
      </Suspense>
    </BrowserRouter>
  );
}
