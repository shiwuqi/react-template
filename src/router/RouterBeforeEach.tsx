import * as React from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import path from "path";

interface RProps {
  routes: ReadonlyArray<any>;
}

const RouteItem = (props: { component: any; path: string; key: string }) => {
  const { path, component: Comp } = props;
  return (
    <Route
      exact
      key={path}
      // render={(router: any) => <Comp {...router} />}
      component={Comp}
      path={path}
    />
  );
};

function RouterBeforeEach(props: RProps & RouteComponentProps) {
  const { routes, location } = props;
  const token = localStorage.getItem("token") || "";

  return (
    <>
      {!token &&
      location.pathname !== "/login" &&
      location.pathname !== "/registry" ? (
        <Redirect to="/login" />
      ) : location.pathname === "/" || location.pathname === "/page" ? (
        <Redirect to="/page/feed" />
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
                    <RouteComponent key={path} {...props}>
                      <Switch>
                        {children.map((routeChild: any) => {
                          const {
                            path: childPath,
                            ...childOthers
                          } = routeChild;
                          return RouteItem({
                            key: childPath,
                            path: childPath && path.join(route.path, childPath),
                            ...childOthers,
                          });
                        })}
                      </Switch>
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
          <Redirect from="/*" to="/404" />
        </Switch>
      )}
    </>
  );
}

export default withRouter(RouterBeforeEach);
