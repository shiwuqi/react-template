import React from "react";
import { Route, withRouter } from 'react-router-dom';
import history from '../utils/history';
import PropTypes from 'prop-types';

@withRouter
class RouterBeforeEach extends React.PureComponent {
  static defaultProps = {
    routes: []
  }

  static propTypes = {
    routes: PropTypes.array
  }

  componentDidMount() {
    const { location } = this.props
    const token = localStorage.getItem("token") || "";
    if (!token && !/\/registry/.test(location.pathname)) {
      history.replace("/");
    }
  }

  render() {
    const { routes } = this.props;
    return (
      <div style={{width: "100%", height: "100%"}}>
        {
          routes.map(item => {
            return <Route exact={item.path === "/page" ? false : true} {...item} key={item.path} />
          })
        }
      </div>
    )
  }
}

export default RouterBeforeEach