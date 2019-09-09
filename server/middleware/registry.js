const Router = require('koa-router')
const registry = new Router()
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()

registry
  .post('/', async (ctx, next) => {
    await connectMongo.insert('user', ctx.request.body)
    ctx.response.body = {
      code: 200,
      message: "注册成功",
      data: null
    }
    await next()
  })
  .post('/username', async (ctx, next) => {
    const data = await connectMongo.find('user', ctx.request.body)
    let code = 201
    if (data.length === 0) {
      code = 200
    }
    ctx.response.body = {
      code,
      message: null,
      data: null
    }
    await next()
  })

module.exports = registry