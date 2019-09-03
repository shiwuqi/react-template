const Router = require('koa-router')
const feed = new Router()
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()
connectMongo.open()

feed
  .get('/', async (ctx, next) => {
    ctx.response.body = {
      code: 200,
      message: "成功",
      data: {
        total: 0,
        list: []
      }
    }
    await next()
  })

module.exports = feed