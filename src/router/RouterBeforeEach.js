import React from "react";
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

@withRouter
class RouterBeforeEach extends React.PureComponent {
  static defaultProps = {
    routes: []
  }

  static propTypes = {
    routes: PropTypes.array
  }

  render() {
    const { routes, location } = this.props;
    const token = localStorage.getItem("token") || "";
    if (!token && location.pathname !== '/' && !/\/registry/.test(location.pathname)) {
      return (
        <Redirect to='/' />
      )
    } else {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {
            routes.map(item => {
              return <Route exact={item.path === "/page" ? false : true} {...item} key={item.path} />
            })
          }
        </div>
      )
    }
  }
}

export default RouterBeforeEach