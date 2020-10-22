export interface AsideMenuConfigType {
  name: string;
  icon?: string;
  path: string;
  key: string;
  meta: boolean;
  children?: AsideMenuConfigType[];
}

export const asideMenuConfig: AsideMenuConfigType[] = [
  {
    name: '用户反馈',
    path: '/feed',
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
  },
  {
    name: '富文本',
    icon: 'edit',
    path: '/page/rich',
    key: '/page/rich',
    meta: true
  }
]