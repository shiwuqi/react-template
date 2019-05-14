import React from 'react';
import ContentMenu from '../ContentMenu'

const menus = [
  {
    name: '用户反馈',
    icon: 'file-done',
    path: '/home/feed',
    key: 'feed',
    meta: true
  },
  {
    name: '用户信息',
    icon: 'user',
    path: '/home/user',
    key: 'user',
    meta: true
  },
  {
    name: '权限设置',
    icon: 'poweroff',
    key: 'power',
    meta: true
  }
]

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default class SiderBar extends React.Component {
  render () {
    return (
      <div style={{height: '100vh', overflowY: 'scroll'}}>
        <div style={styles.logo}></div>
        <ContentMenu menus={menus} />
      </div>
    )
  }
}