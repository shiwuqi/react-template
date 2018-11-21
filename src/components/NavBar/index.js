import React from 'react'
import { withRouter } from 'react-router-dom'
import screenfull from 'screenfull'
import { Button, Icon, Dropdown, Menu, message } from 'antd'
import './style.css'
import request from '../../utils/request'
import Cookies from 'js-cookie'

@withRouter
class HeaderBar extends React.Component {
  state = {
    arrow: 'arrows-alt'
  }

  componentWillMount() {
    console.log('props', this.props)
    screenfull.onchange(() => {
      this.setState({
        arrow: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
      })
    })
  }

  toggle = () => {
    this.props.onToggle()
  }

  screenFullToggle = () => {
    if (screenfull.enabled) {
      screenfull.toggle()
    }
  }

  logOut = async () => {
    const res = await request('/logOut')
    try {
      if (res.status === '00') {
        Cookies.remove('token')
        this.props.history.replace({pathname: '/'})
      } else {
        message.error(res.log)
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key='1'>1 menu item</Menu.Item>
        <Menu.Item key='2'>2 menu item</Menu.Item>
        <Menu.Item key='3' onClick={this.logOut}>退出登录</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <Button type='primary' onClick={this.toggle}>
          <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <div style={{float: 'right'}}>
          <ul className='header-ul'>
            <li><Icon type={this.state.arrow} onClick={this.screenFullToggle}></Icon></li>
            <li>
              <Dropdown overlay={menu} trigger={['hover']}>
                <img src={require('./images/default_avatar.jpg')} style={{width: '40px', height: '40px', borderRadius: '50%'}} alt="" />
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HeaderBar