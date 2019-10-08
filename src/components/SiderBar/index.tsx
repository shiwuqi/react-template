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
        key: '/page/feed',
        meta: true
      }
    ]
  },
  {
    name: '用户信息',
    icon: 'user',
    path: '/page/user',
    key: '/page/user',
    meta: true
  },
  {
    name: 'Hook',
    icon: 'code',
    path: '/page/hook',
    key: '/page/hook',
    meta: true
  }
]

const openKey: string[] = ['feed']

function SiderBar(): React.SFCElement<React.ElementType> {
  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <div style={{ height: '32px', background: 'rgba(255, 255, 255, .2)', margin: '16px' }}></div>
      <ContentMenu menus={menus} openKey={openKey} />
    </div>
  )
}

export default SiderBar