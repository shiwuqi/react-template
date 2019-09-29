import * as React from 'react';
import ContentMenu from '../ContentMenu'

export interface menusType {
  name: string,
  icon?: string,
  path?: string,
  key: string,
  meta: boolean,
  children?: menusType[]
}

const menus: menusType[] = [
  {
    name: '用户反馈',
    icon: 'file-done',
    key: 'feed',
    meta: true,
    children: [
      {
        name: '用户反馈',
        path: '/page/feed',
        key: 'feed',
        meta: true
      }
    ]
  },
  {
    name: '用户信息',
    icon: 'user',
    path: '/page/user',
    key: 'user',
    meta: true
  },
  {
    name: 'Hook',
    icon: 'code',
    path: '/page/hook',
    key: 'hook',
    meta: true
  }
]

const openKey: string[] = ['feed']

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
      <div style={{height: '100vh', overflowY: 'auto'}}>
        <div style={styles.logo}></div>
        <ContentMenu menus={menus} openKey={openKey} />
      </div>
    )
  }
}