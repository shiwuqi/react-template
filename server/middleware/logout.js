const Router = require('koa-router')
const logout = new Router()
const { setToken } = require('../utils/token_verify')
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()
connectMongo.open()

logout
  .get('/', async (ctx, next) => {
    ctx.response.body = {
      code: 200,
      message: null,
      data: null
    }
    await next()
  })

module.exports = logout