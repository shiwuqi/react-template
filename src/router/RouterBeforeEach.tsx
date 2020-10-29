import * as React from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { Spin } from "antd";
// import path from "path";
const { Suspense } = React;

interface RProps {
  routes: ReadonlyArray<any>;
}

const RouteItem = (props: { component: any; path: string; key: string }) => {
  const { path, component } = props;
  return <Route exact key={path} component={component} path={path} />;
};

function RouterBeforeEach(props: RProps & RouteComponentProps) {
  const { routes, location } = props;
  const token = localStorage.getItem("token") || "";

  return (
    <>
      {!token ? (
        <Redirect to="/login" />
      ) : (
        <Switch>
          {routes.map((route) => {
            const { component: RouteComponent, children, ...others } = route;
            return (
              <Route
                exact={route.path === "/page" ? false : true}
                key={route.path}
                {...others}
                component={(props: any) => {
                  return children ? ( // 嵌套路由
                    <RouteComponent key={route.path} {...props}>
                      <Suspense
                        fallback={
                          <div className="loading">
                            <Spin />
                          </div>
                        }
                      >
                        <Switch>
                          {children.map((routeChild: any) => {
                            const {
                              path: childPath,
                              ...childOthers
                            } = routeChild;
                            return RouteItem({
                              key: childPath,
                              path: childPath,
                              ...childOthers,
                            });
                          })}
                          <Redirect exact from="/page" to="/page/feed" />
                          <Redirect from="/page/*" to="/404" />
                        </Switch>
                      </Suspense>
                    </RouteComponent>
                  ) : (
                    <>
                      {RouteItem({
                        key: route.path,
                        ...route,
                      })}
                    </>
                  );
                }}
              />
            );
          })}
          <Redirect exact from="/" to="/page/feed" />
          <Redirect from="/*" to="/404" />
        </Switch>
      )}
    </>
  );
}

export default withRouter(RouterBeforeEach);
