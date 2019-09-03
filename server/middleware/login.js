const Router = require('koa-router')
const login = new Router()
const { setToken } = require('../utils/token_verify')
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()
connectMongo.open()

login
  .post('/', async (ctx, next) => {
    const data = await connectMongo.find('user', ctx.request.body)
    if (data.length === 0) {
      ctx.response.body = {
        code: 201,
        message: '用户名或密码错误，请重新输入',
        data: null
      }
      return
    }
    ctx.response.body = {
      code: 200,
      message: '登录成功',
      data: await setToken(data[0].account, data[0]._id)
    }
    await next()
  })

module.exports = login