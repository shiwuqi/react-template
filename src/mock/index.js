import Mock from 'mockjs'

if (process.env.NODE_ENV === 'development') {
  const login = {
    status: '00',
    log: '登录成功',
    data: {
      token: '000000'
    }
  }
  const logOut = {
    status: '00',
    log: '退出成功'
  }
  Mock.mock(/\/login/, 'post', login)
  Mock.mock(/\/logOut/, 'get', logOut)
}