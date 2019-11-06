import * as React from "react";
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

interface RProps {
  routes: ReadonlyArray<any>;
}

function RouterBeforeEach(props: RProps & RouteComponentProps) {
  const { routes, location } = props;
  const token = localStorage.getItem("token") || "";
  if (location.pathname === '/' || (!token && location.pathname !== '/login' && !/\/registry/.test(location.pathname))) {
    return (
      <Redirect to='/login' />
    )
  } else if (location.pathname === '/page') {
    return (
      <Redirect to='/page/feed' />
    )
  } {
    return (
      <Switch>
        {
          routes.map((item) => {
            return <Route exact={item.path !== '/page'} {...item} key={item.path} />
          })
        }
        <Redirect from='/*' to='/404' />
      </Switch>
    )
  }
}


export default withRouter(RouterBeforeEach);