const Koa = require('koa')
const path = require('path')
const app = new Koa()
const cors = require('koa2-cors');
const _static = require('koa-static') // 加载静态资源 localhost:3009/images/men.png
const bodyParser = require('koa-bodyparser')  // 获取post请求参数
const jwt = require('koa-jwt')
const { router } = require('./routes')
const { secret } = require('./config')
const { verToken } = require('./utils/token_verify')

app.use(cors());

app.use(jwt({ secret }).unless({
  path: [/^\/rc\/serve\/registry/, /^\/rc\/serve\/login/]
}))

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '登录过期，请重新登录'
      }
    }
  })
})

app.use(async (ctx, next) => {
  const token = ctx.headers.authorization;
  if (!!token) {
    try {
      const data = await verToken(token)
      ctx.request.userInfo = data
    } catch (e) {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        message: '登录过期，请重新登录'
      }
    }
  }
  await next();
})

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

app.use(router.routes())

app.listen(3009, () => {
  console.log('Server starts at http://127.0.0.1:3009/')
})