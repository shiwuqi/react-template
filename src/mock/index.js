import Mock from 'mockjs'
const Random = Mock.Random

function createList() {
  let list = []
  for(let i = 0; i < 10; i++) {
    list.push({
      id: Random.id(),
      name: Random.cname(),
      'age|10-100': 1,
      address: Random.city(true),
      data_time: Random.datetime(),
      email: Random.email()
    })
  }
  return list
}

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
  const tableList = {
    status: '00',
    log: '获取成功',
    data: {
      list: createList(),
      pageNum: 10
    }
  }
  Mock.mock(/\/login/, 'post', login)
  Mock.mock(/\/logOut/, 'get', logOut)
  Mock.mock(/\/list/, 'get', tableList)
}