import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../utils/history'
import Login from '../views/Login'
import LayOut from '../views/LayOut'
import './index.css'
import NotFoundPage from '../components/NotFoundPage';

export default class Index extends Component  {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={LayOut} />
          <Route path='/404' component={NotFoundPage} />
        </div>
      </Router>
    )
  }
}