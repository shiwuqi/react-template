import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dropdown, Menu, message } from 'antd';
import './style.css';
import request from '../../utils/request';

function HeaderBar(props: RouteComponentProps): React.SFCElement<React.ElementType> {
  const [arrow, setArrow] = useState('arrows-alt');

  const logOut = async () => {
    const res = await request('/logOut')
    try {
      if (res.code === 200) {
        localStorage.removeItem('token')
        props.history.replace({ pathname: '/' })
      } else {
        message.error(res.message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key='1'>1 menu item</Menu.Item>
      <Menu.Item key='2'>2 menu item</Menu.Item>
      <Menu.Item key='3' onClick={logOut}>退出登录</Menu.Item>
    </Menu>
  )

  return (
    <div>
      <div style={{ float: 'right' }}>
        <ul className='header-ul'>
          <li>
            <Dropdown overlay={menu} trigger={['hover']}>
              <img src={require('./images/default_avatar.jpg')} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" />
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(HeaderBar)