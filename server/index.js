const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors');
const _static = require('koa-static') // 加载静态资源 localhost:3009/images/men.png
const bodyParser = require('koa-bodyparser')  // 获取post请求参数
const jwt = require('koa-jwt')
const { secret } = require('./config')
const { verToken } = require('./utils/token_verify')

app.use(cors());

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        msg: '登录过期，请重新登录'
      }
    }
  })
})

app.use(async (ctx, next) => {
  const token = ctx.headers.authorization;
  if (!!token) {
    const data = await verToken(token)
  }
  await next();
})

app.use(jwt({ secret }).unless({
  path: [/\/registry/, /\/login/]
}))

app.use(bodyParser())

app.use(_static(
  path.join(__dirname, './static')
))

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.status = 200
    ctx.response.body = 'Hello!'
  }
  await next()
})

let pages = fs.readdirSync(path.join(__dirname, './middleware'))

pages.forEach(item => {
  let module = require(path.join(__dirname, `./middleware/${item}`))
  router.use('/' + item.replace('.js', ''), module.routes(), module.allowedMethods())
})

app.use(router.routes())

app.listen(3009, () => {
  console.log('Server starts at http://127.0.0.1:3009/')
})