import Mock from 'mockjs'
const Random = Mock.Random

if (process.env.NODE_ENV === 'development') {
  const login = {
    status: '00',
    log: '登录成功',
    data: {
      token: Random.guid()
    }
  }
  const logOut = {
    status: '00',
    log: '退出成功'
  }
  Mock.mock(/\/login/, 'post', login)
  Mock.mock(/\/logOut/, 'get', logOut)
}