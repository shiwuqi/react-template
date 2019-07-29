import React from "react";
import { Route } from 'react-router-dom';
import history from '../utils/history';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export default class RouterBeforeEach extends React.PureComponent {
  static defaultProps = {
    routes: []
  }

  static propTypes = {
    routes: PropTypes.array
  }

  componentDidMount() {
    const token = Cookies.get("token") || "";
    if (!token) {
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