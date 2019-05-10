import React from 'react';
import ContentMenu from '../ContentMenu'

const menus = [
  {
    name: '用户反馈',
    icon: 'file-done',
    path: '/home/feedBack',
    key: 'feedback'
  },
  {
    name: '用户信息',
    icon: 'user',
    path: '/home/user',
    key: 'user'
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