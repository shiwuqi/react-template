import * as React from "react";
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { message } from 'antd';

interface RProps {
  routes: ReadonlyArray<any>
}

class RouterBeforeEach extends React.PureComponent<RProps & RouteComponentProps, any> {
  static defaultProps = {
    routes: []
  }

  render() {
    const { routes, location } = this.props;
    const token = localStorage.getItem("token") || "";
    if (!token && location.pathname !== '/' && !/\/registry/.test(location.pathname)) {
      message.warning('请先登录');
      return (
        <Redirect to='/' />
      )
    } else {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {
            routes.map((item) => {
              return <Route exact={item.path === "/page" ? false : true} {...item} key={item.path} />
            })
          }
        </div>
      )
    }
  }
}

export default withRouter(RouterBeforeEach)